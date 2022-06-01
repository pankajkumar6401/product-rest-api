"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getMostViewedProducts = exports.getProduct = exports.addProduct = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * Validation scehema for Add Product Route using Joi
 */
exports.addProduct = {
    payload: joi_1.default.object({
        name: joi_1.default
            .string()
            .strip()
            .required()
            .description("Name of the Product"),
        price: joi_1.default
            .number()
            .greater(0)
            .strip()
            .required()
            .description("Price in USD upto two decimal points"),
        description: joi_1.default
            .string()
            .strip()
            .optional()
            .description("Description of product"),
    })
};
/**
 * Validation scehema for Get Product Route using Joi
 */
exports.getProduct = {
    params: joi_1.default.object({
        id: joi_1.default
            .number()
            .strip()
            .required()
            .description("Name of the Product"),
        currency: joi_1.default
            .string()
            .strip()
            .optional()
            .valid("USD", "CAD", "EUR", "GBP")
            .description("Currency in which you want to see the product")
    })
};
/**
 * Validation scehema for Get Most Viewed Products Route using Joi
 */
exports.getMostViewedProducts = {
    params: joi_1.default.object({
        currency: joi_1.default
            .string()
            .strip()
            .optional()
            .valid("USD", "CAD", "EUR", "GBP")
            .description("Currency in which you want to see the product"),
        total: joi_1.default
            .number()
            .strip()
            .optional()
            .default(5)
            .description("Number of products")
    })
};
/**
 * Validation scehema for Delete Product Route using Joi
 */
exports.deleteProduct = {
    payload: joi_1.default.object({
        id: joi_1.default
            .number()
            .strip()
            .required()
            .description("Product Id"),
    })
};
