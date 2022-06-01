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
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const server_1 = require("../server");
const chai_1 = require("chai");
/**
 * Test for Add Product API
 */
(0, mocha_1.describe)('Add Products API Testing', () => {
    let server;
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield (0, server_1.init)();
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    (0, mocha_1.it)('addProducts without description', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "Kawasaki Ninja 1000", price: 1.34 },
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('addProducts with description', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "Kawasaki Ninja 1000sx", price: 3.56, description: "1000 SX" },
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('addProducts price should be greater than 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "CBR 650F", price: 0 },
        });
        (0, chai_1.expect)(res.statusCode).to.equal(400);
    }));
    (0, mocha_1.it)('addProducts price is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "CBR 650F" },
        });
        (0, chai_1.expect)(res.statusCode).to.equal(400);
    }));
    (0, mocha_1.it)('addProducts name is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { price: 1 },
        });
        (0, chai_1.expect)(res.statusCode).to.equal(400);
    }));
});
/**
 * Test for Get Product API
 */
(0, mocha_1.describe)('Get Products API Testing', () => {
    let server;
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield (0, server_1.init)();
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    (0, mocha_1.it)('getProducts Without Currency', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getProduct/1'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('getProducts With Valid Currency', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getProduct/1/GBP'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('getProducts With Wrong Currency', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getProduct/1/INR'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(400);
    }));
});
/**
 * Test for Get Product API
 */
(0, mocha_1.describe)('Get Most Viewed Products API Testing', () => {
    let server;
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield (0, server_1.init)();
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    (0, mocha_1.it)('get most viewed Products Without Currency', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getMostViewedProducts'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('get most viewed Products With Valid Currency with default total', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getMostViewedProducts/GBP'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('get most viewed Products With Valid Currency with 1 total', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getMostViewedProducts/GBP/1'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
    (0, mocha_1.it)('getMostViewedProducts With Wrong Currency', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'get',
            url: '/getMostViewedProducts/INR'
        });
        (0, chai_1.expect)(res.statusCode).to.equal(400);
    }));
});
/**
 * Test for Delete Product API
 */
(0, mocha_1.describe)('Delete Product API Testing', () => {
    let server;
    (0, mocha_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield (0, server_1.init)();
    }));
    (0, mocha_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    (0, mocha_1.it)('delete Products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'delete',
            url: '/deleteProduct',
            payload: { id: 4 }
        });
        (0, chai_1.expect)(res.statusCode).to.equal(200);
    }));
});
