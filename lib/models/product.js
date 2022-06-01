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
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("./dbConnection"));
/**
 * Model Class for products table
 */
class Product extends sequelize_1.Model {
    static getProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>>>>>>> Inside Model/getProduct >>>>>>>>>>>>>>>>>>>>>", payload);
            try {
                return yield Product.findOne({
                    attributes: ['name', 'price', 'description', 'productViewed'],
                    where: {
                        id: payload.id,
                        isDeleted: 0
                    },
                    raw: true
                });
            }
            catch (error) {
                console.log(">>>>>>>>>>>>>> models/product/getProduct: Error >>>>>>>>>>>>>>>>>>", error);
                throw error;
            }
        });
    }
    /**
     * Function to get all mostly viewed products from the database
     * total will be used as limit
     * @param payload {total: number}
     */
    static findMostViewedProducts(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(">>>>>>>> Inside Model/findMostViewedProducts >>>>>>>>>>>>>>>>>>>>>", payload);
            try {
                return yield Product.findAll({
                    attributes: ['name', 'price', 'description', 'productViewed'],
                    where: {
                        isDeleted: 0,
                        productViewed: { [sequelize_1.Op.gt]: 0 }
                    },
                    order: [
                        ['productViewed', 'DESC']
                    ],
                    limit: payload.total,
                    raw: true
                });
            }
            catch (error) {
                console.log(">>>>>>>>>>>>>> models/product/findMostViewedProducts: Error >>>>>>>>>>>>>>>>>>", error);
                throw error;
            }
        });
    }
    /**
     * Function to mark delete on product
     * @param payload {id: number}
     */
    static markDelete(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product.update({ isDeleted: 1, deletedDate: sequelize_1.Sequelize.literal('NOW()') }, { where: { id: payload.id } });
            }
            catch (error) {
                console.log(">>>>>>>>>>>>>> models/product/markDelete: Error >>>>>>>>>>>>>>>>>>", error);
                throw error;
            }
        });
    }
}
exports.Product = Product;
/**
 * initilization of Product Model
 */
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    isDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    },
    productViewed: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    createdDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    deletedDate: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    sequelize: dbConnection_1.default,
    timestamps: true,
    createdAt: "createdDate",
    updatedAt: "updatedDate",
    deletedAt: "deletedDate",
    modelName: 'Product'
});
/**
 * Creating table if not exist
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Product.sync();
    // Code here
}))();
