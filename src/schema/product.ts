import Joi from "joi";

/**
 * Validation scehema for Add Product Route using Joi
 */
export const addProduct = {
    payload: Joi.object(
        {
            name: Joi
                .string()
                .strip()
                .required()
                .description("Name of the Product"),
            price: Joi
                .number()
                .greater(0)
                .strip()
                .required()
                .description("Price in USD upto two decimal points"),
            description: Joi
                .string()
                .strip()
                .optional()
                .description("Description of product"),
        }
    )
};

/**
 * Validation scehema for Get Product Route using Joi
 */
export const getProduct = {
    params: Joi.object(
        {
            id: Joi
                .number()
                .strip()
                .required()
                .description("Name of the Product"),
            currency: Joi
                .string()
                .strip()
                .optional()
                .valid("USD","CAD","EUR","GBP")
                .description("Currency in which you want to see the product")
        }
    )
};

/**
 * Validation scehema for Get Most Viewed Products Route using Joi
 */
export const getMostViewedProducts = {
    params: Joi.object(
        {
            currency: Joi
                .string()
                .strip()
                .optional()
                .valid("USD","CAD","EUR","GBP")
                .description("Currency in which you want to see the product"),                    
            total: Joi
                .number()
                .strip()
                .optional()
                .default(5)
                .description("Number of products")
            
        }
    )
};

/**
 * Validation scehema for Delete Product Route using Joi
 */
export const deleteProduct = {
    payload: Joi.object(
        {
            id: Joi
                .number()
                .strip()
                .required()
                .description("Product Id"),
        }
    )
};