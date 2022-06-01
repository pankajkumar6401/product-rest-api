import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { exit } from "process";
import {routes} from "./routes";

export let server: Server;

/**
 * Function to initilize Hapi Server and adding routes to it.
 * @returns {Promise<Server>}
 */
export const init = async (): Promise<Server> => {
    server = Hapi.server({
        port: process.env.PORT || 7700,
        host: 'localhost'
    });
   
    server.route(routes); 

    return server;
};

/**
 * Function to start Hapi Server.
 * @returns {void}
 */
export const start = async (): Promise<void> => {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});