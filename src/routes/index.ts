/**
 * This is the default file which will be imported for routes.
 * We can add multiple routes if required and exports using routes as array
 */

import { Route } from '../interfaces/route';
import * as route from "./product";

export const routes: Array<Route> = [
    route.addProduct,
    route.getProduct,
    route.getMostViewedProducts,
    route.deleteProduct,
    route.getMostViewedProductsWithTotal
];