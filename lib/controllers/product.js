"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getMostViewedProducts = exports.getProduct = exports.addProduct = void 0;
const product_1 = require("../models/product");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Function to add Product
 * @param {{name: string, price: number, description: ?string}} req
 * @return {Promise<status:boolean, data:Object, message: string , Error>}
 */
const addProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>>>>>>> Inside addProduct <<<<<<<<<<<<<<<<<<<");
    let payload = req.orig.payload;
    try {
        console.log(">>>>>>>>> Inside addProduct: Payload before adding <<<<<<<<<<<<<<<<<<<", payload);
        yield product_1.Product.create(payload);
        //saveProduct(payload)
        return { status: true, data: {}, message: "Successfully created the product" };
    }
    catch (error) {
        console.log(">>>>>>>>>>>>>> Error while adding product", error);
        throw error;
    }
});
exports.addProduct = addProduct;
/**
 * Function to get Product based on
 * @param {{id:number, currency: ?string}} req
 * @return {Promise<status:boolean,data:Object, message: string , Error>}
 */
const getProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>>>>>>> Inside getProduct <<<<<<<<<<<<<<<<<<<");
    try {
        let params = req.orig.params;
        let currencyConversion = true;
        let product = yield product_1.Product.getProduct(params);
        if (product) {
            if (params.currency) {
                //Get the currency forex
                const { currencyApiKey, currencyConvertAPI, baseCurrency } = yield getCurrencyRateVariables();
                let requestOptions = {
                    headers: {
                        'apikey': currencyApiKey
                    }
                };
                /**
                 * Using Live Rate API to reduce
                 */
                try {
                    let currencyResponse = yield axios_1.default.get(`${currencyConvertAPI}?to=${params.currency}&from=${baseCurrency}&amount=${product.price}`, requestOptions);
                    let priceData = yield parseResponse(currencyResponse);
                    product = Object.assign(Object.assign({}, product), { displayPrice: `${params.currency} ${priceData.result}` });
                }
                catch (error) {
                    console.log(">>>>>>>>>>>>>> Error While getting Currency Rate >>>>>>>>>>>>>", error);
                    product = Object.assign(Object.assign({}, product), { displayPrice: `USD ${product.price}` });
                    currencyConversion = false;
                }
            }
            else {
                product = Object.assign(Object.assign({}, product), { displayPrice: `USD ${product.price}` });
            }
            yield product_1.Product.increment({ productViewed: 1 }, { where: { id: params.id } });
            return {
                status: true,
                data: product,
                message: !currencyConversion ? "Not able to convert" : ""
            };
        }
        else {
            return {
                status: true,
                data: {},
                message: "No matching product found"
            };
        }
    }
    catch (error) {
        console.log(">>>>>>>>>>>>>> Error while getting product", error);
        throw error;
    }
});
exports.getProduct = getProduct;
/**
 * Function to getMostViewedProducts and by default it will return 5 products.
 * @param {total: ?number,currency: ?string}} req
 * @return {Promise<status:boolean,data:Object , Error>}
 */
const getMostViewedProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>>>>>>> Inside getMostViewedProducts <<<<<<<<<<<<<<<<<<<");
    try {
        let params = req.orig.params;
        console.log(">>>>>>>>>>>> getMostViewedProducts <<<<<<<<<<<<<<<<<<<<<<<<", params);
        let products = yield product_1.Product.findMostViewedProducts({ total: (params === null || params === void 0 ? void 0 : params.total) ? parseInt(params.total) : 5 });
        //if currency is provided then we need to call API to convert each price into target currency
        if (params === null || params === void 0 ? void 0 : params.currency) {
            const { currencyApiKey, currencyLiveRatesApi, baseCurrency, currencies } = yield getCurrencyRateVariables();
            let requestOptions = {
                headers: {
                    'apikey': currencyApiKey
                }
            };
            try {
                let currencyResponse = yield axios_1.default.get(`${currencyLiveRatesApi}?symbols=${currencies}&base=${baseCurrency}`, requestOptions);
                let conversionRates = yield parseResponse(currencyResponse);
                products = products.map((product) => {
                    return Object.assign(Object.assign({}, product), { displayPrice: `${params.currency} ${product.price * conversionRates.rates[params.currency]}` });
                });
            }
            catch (error) {
                console.log(">>>>>>>>>>>>>> Error While getting Currency Rate >>>>>>>>>>>>>", error);
            }
        }
        else {
            products = products.map((product) => {
                return Object.assign(Object.assign({}, product), { displayPrice: `USD ${product.price}` });
            });
        }
        return {
            status: true,
            data: products
        };
    }
    catch (error) {
        console.log(">>>>>>>>>>>>>> Error while getting product", error);
        throw error;
    }
});
exports.getMostViewedProducts = getMostViewedProducts;
/**
 * Function to delete Product
 * @param {{id: number}} req
 * @return {Promise<status:boolean,data:Object , Error>}
 */
const deleteProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>>>>>>> Inside deleteProduct <<<<<<<<<<<<<<<<<<<");
    try {
        let payload = req.orig.payload;
        yield product_1.Product.markDelete(payload);
        return {
            status: true,
            data: {}
        };
    }
    catch (error) {
        console.log(">>>>>>>>>>>>>> Error while getting product", error);
        throw error;
    }
});
exports.deleteProduct = deleteProduct;
const getCurrencyRateVariables = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        currencyApiKey: process.env.CURRENCY_APIKEY,
        currencyConvertAPI: process.env.CURRENCY_CONVERT_API,
        currencyLiveRatesApi: process.env.CURRENCY_LIVE_RATES_API,
        currencies: process.env.CURRENCIES,
        baseCurrency: process.env.BASE_CURRENCY
    };
});
const parseResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
    switch (response.status) {
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
});
