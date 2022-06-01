import {DataTypes, Model, Op, Sequelize} from "sequelize";
import sequelizeConnection from "./dbConnection"

/**
 * Model Class for products table
 */
export class Product extends Model {

    public static async getProduct(payload:{id:number}) {
        console.log(">>>>>>>> Inside Model/getProduct >>>>>>>>>>>>>>>>>>>>>", payload);
        
        try {
            return await Product.findOne({
                attributes:['name','price','description','productViewed'],
                where: {
                    id: payload.id, 
                    isDeleted:0
                },
                raw: true
            });    
        } catch (error) {
            console.log(">>>>>>>>>>>>>> models/product/getProduct: Error >>>>>>>>>>>>>>>>>>",error)
            throw error;
        }
        
    }

    /**
     * Function to get all mostly viewed products from the database
     * total will be used as limit
     * @param payload {total: number}
     */
    public static async findMostViewedProducts(payload:{total?:number}):Promise<any>{
        console.log(">>>>>>>> Inside Model/findMostViewedProducts >>>>>>>>>>>>>>>>>>>>>", payload);
        try {
            return await Product.findAll({
                attributes:['name','price','description','productViewed'],
                where: {
                    isDeleted:0, 
                    productViewed: {[Op.gt]: 0}
                }, 
                order:[
                    ['productViewed','DESC']
                ],
                limit: payload.total,
                raw: true
            });    
        } catch (error) {
            console.log(">>>>>>>>>>>>>> models/product/findMostViewedProducts: Error >>>>>>>>>>>>>>>>>>",error)
            throw error;
        }
    }

    /**
     * Function to mark delete on product
     * @param payload {id: number}
     */
    public static async markDelete(payload:{id:number}):Promise<any>{
        try {
            return await Product.update({isDeleted:1, deletedDate: Sequelize.literal('NOW()')},{where:{id: payload.id }});
        } catch (error) {
            console.log(">>>>>>>>>>>>>> models/product/markDelete: Error >>>>>>>>>>>>>>>>>>",error)
            throw error;
        }
        
    }
}

/**
 * initilization of Product Model
 */
Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    isDeleted:{
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    productViewed:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createdDate: {
        type: DataTypes.DATE,
    },
    updatedDate: {
        type: DataTypes.DATE,
    },
    deletedDate: {
        type: DataTypes.DATE,
    }
},{
    sequelize: sequelizeConnection,
    timestamps: true,
    createdAt: "createdDate",
    updatedAt: "updatedDate",
    deletedAt: "deletedDate",
    modelName: 'Product'
});

/**
 * Creating table if not exist
 */
(async () => {
    await Product.sync();
    // Code here
  })();


