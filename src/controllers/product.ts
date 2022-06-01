import { Product } from "../models/product";
import axios, {AxiosResponse} from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Function to add Product
 * @param {{name: string, price: number, description: ?string}} req
 * @return {Promise<status:boolean, data:Object, message: string , Error>}
 */
export const addProduct = async (req:any) => {
    console.log(">>>>>>>>> Inside addProduct <<<<<<<<<<<<<<<<<<<");
    let payload = req.orig.payload;
    try{
        console.log(">>>>>>>>> Inside addProduct: Payload before adding <<<<<<<<<<<<<<<<<<<",payload);
        await Product.create(payload);
        //saveProduct(payload)
        return {status:true,data:{},message:"Successfully created the product"}
    }catch(error){
        console.log(">>>>>>>>>>>>>> Error while adding product", error);
        throw error;
    }
}; 

/**
 * Function to get Product based on 
 * @param {{id:number, currency: ?string}} req
 * @return {Promise<status:boolean,data:Object, message: string , Error>}
 */
 export const getProduct = async (req:any) => {
    console.log(">>>>>>>>> Inside getProduct <<<<<<<<<<<<<<<<<<<");
    try {
        let params = req.orig.params;
        let currencyConversion: boolean = true;
        let product: any = await Product.getProduct(params);
        
        if(product){
            if(params.currency){
                //Get the currency forex
                const {currencyApiKey,currencyConvertAPI,baseCurrency} = await getCurrencyRateVariables();
                
                let requestOptions = {
                    headers: {
                        'apikey': currencyApiKey
                    }
                }
                /**
                 * Using Live Rate API to reduce
                 */
                
                try {
                    let currencyResponse:AxiosResponse = await axios.get(`${currencyConvertAPI}?to=${params.currency}&from=${baseCurrency}&amount=${product.price}`,requestOptions);
                    let priceData:any = await parseResponse(currencyResponse);
                    product = {
                        ...product,
                        displayPrice: `${params.currency} ${priceData.result}`,
                    };
                    
                } catch (error) {
                    console.log(">>>>>>>>>>>>>> Error While getting Currency Rate >>>>>>>>>>>>>",error);
                    product = {
                        ...product,
                        displayPrice: `USD ${product.price}`
                    };
                    currencyConversion = false;
                }
            }else{
                product = {
                    ...product,
                    displayPrice: `USD ${product.price}`,
                };
                
            }
            await Product.increment({productViewed:1},{where:{id:params.id}});
            return {
                status: true,
                data: product,
                message: !currencyConversion?"Not able to convert":""
            }
        }else{
            return {
                status: true,
                data: {},
                message: "No matching product found"
            }
        }    
    } catch (error) {
        console.log(">>>>>>>>>>>>>> Error while getting product", error);
        throw error;
    }
};

/**
 * Function to getMostViewedProducts and by default it will return 5 products.
 * @param {total: ?number,currency: ?string}} req
 * @return {Promise<status:boolean,data:Object , Error>}
 */
 export const getMostViewedProducts = async (req:any) => {
    console.log(">>>>>>>>> Inside getMostViewedProducts <<<<<<<<<<<<<<<<<<<");
    
    try {
        let params = req.orig.params;
        console.log(">>>>>>>>>>>> getMostViewedProducts <<<<<<<<<<<<<<<<<<<<<<<<",params);
        let products = await Product.findMostViewedProducts({total:params?.total?parseInt(params.total):5});
        
        //if currency is provided then we need to call API to convert each price into target currency
        if(params?.currency){
            const {currencyApiKey,currencyLiveRatesApi,baseCurrency,currencies} = await getCurrencyRateVariables();
                
                let requestOptions = {
                    headers: {
                        'apikey': currencyApiKey
                    }
                }
                
                try {
                    let currencyResponse:AxiosResponse = await axios.get(`${currencyLiveRatesApi}?symbols=${currencies}&base=${baseCurrency}`,requestOptions);
                    let conversionRates:any = await parseResponse(currencyResponse);
                    products = products.map((product:any)=>{
                        return {
                            ...product,
                            displayPrice: `${params.currency} ${product.price * conversionRates.rates[params.currency]}`
                        };
                    });
                } catch (error) {
                    console.log(">>>>>>>>>>>>>> Error While getting Currency Rate >>>>>>>>>>>>>",error);
                }
        }else{
            products = products.map((product:any)=>{
                return {
                    ...product,
                    displayPrice: `USD ${product.price}`
                };
            });
        }
        return {
            status: true,
            data: products
        }
    } catch (error) {
        console.log(">>>>>>>>>>>>>> Error while getting product", error);
        throw error;
    }
};

/**
 * Function to delete Product
 * @param {{id: number}} req
 * @return {Promise<status:boolean,data:Object , Error>}
 */
 export const deleteProduct = async (req:any) => {
    console.log(">>>>>>>>> Inside deleteProduct <<<<<<<<<<<<<<<<<<<");
    try {
        let payload = req.orig.payload;
        await Product.markDelete(payload);
        return {
            status: true,
            data: {}
        }
    } catch (error) {
        console.log(">>>>>>>>>>>>>> Error while getting product", error);
        throw error;
    }
};

const getCurrencyRateVariables =async ():Promise<any> => {
    return {
        currencyApiKey: process.env.CURRENCY_APIKEY,
        currencyConvertAPI: process.env.CURRENCY_CONVERT_API,
        currencyLiveRatesApi: process.env.CURRENCY_LIVE_RATES_API,
        currencies: process.env.CURRENCIES,
        baseCurrency: process.env.BASE_CURRENCY
    }
    
}

const parseResponse =async (response:AxiosResponse):Promise<any> => {
    switch(response.status){
        case 200: 
            console.log(response.data);
            return response.data;
            break;
        case 429:
            throw new Error('Too Many Request');
        case 400:
            throw new Error('Bad Request please check API Call');
        case 401:
            throw new Error('API Key is not valid');
        case 404:
            throw new Error('Currency API not found');
        default:
            throw new Error('Currency API have failed to process our request');
    }
}