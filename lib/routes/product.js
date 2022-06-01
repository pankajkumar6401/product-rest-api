"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getMostViewedProducts = exports.getMostViewedProductsWithTotal = exports.getProduct = exports.addProduct = void 0;
const payloadValidation = __importStar(require("./../schema/product"));
const productController = __importStar(require("./../controllers/product"));
/**
 * Add Product route
 */
exports.addProduct = {
    method: "POST",
    path: "/addProduct",
    config: {
        auth: false,
        handler: productController.addProduct,
        description: "Add Product",
        validate: payloadValidation.addProduct
    }
};
/**
 * Get Product route
 */
exports.getProduct = {
    method: "GET",
    path: "/getProduct/{id}/{currency?}",
    config: {
        auth: false,
        handler: productController.getProduct,
        description: "Get a Single Product",
        validate: payloadValidation.getProduct
    }
};
/**
 * Get Most Viewed Product route
 */
exports.getMostViewedProductsWithTotal = {
    method: "GET",
    path: "/getMostViewedProducts/{currency}/{total?}",
    config: {
        auth: false,
        handler: productController.getMostViewedProducts,
        description: "Get Most Viewed Products",
        validate: payloadValidation.getMostViewedProducts
    }
};
/**
 * Get Most Viewed Product route
 */
exports.getMostViewedProducts = {
    method: "GET",
    path: "/getMostViewedProducts",
    config: {
        auth: false,
        handler: productController.getMostViewedProducts,
        description: "Get Most Viewed Products",
    }
};
/**
 * Delete Product Route
 */
exports.deleteProduct = {
    method: "DELETE",
    path: "/deleteProduct",
    config: {
        auth: false,
        handler: productController.deleteProduct,
        description: "Delete Product",
        validate: payloadValidation.deleteProduct
    }
};
