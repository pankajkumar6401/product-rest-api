/**
 * All Product related routes are exported from here
 */
import { Route } from "../interfaces/route";
import * as payloadValidation from "./../schema/product";
import * as productController from "./../controllers/product";

/**
 * Add Product route
 */
export const addProduct: Route = {
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
export const getProduct: Route = {
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
export const getMostViewedProductsWithTotal: Route = {
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
 export const getMostViewedProducts: Route = {
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
export const deleteProduct: Route = {
    method: "DELETE",
    path: "/deleteProduct",
    config: {
        auth: false,
        handler: productController.deleteProduct,
        description: "Delete Product",
        validate: payloadValidation.deleteProduct
    }
};
