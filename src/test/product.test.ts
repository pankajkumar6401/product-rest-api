import { beforeEach,afterEach,describe,it } from 'mocha';
import { init } from "../server";
import { Server } from "@hapi/hapi";
import { expect } from "chai"

/**
 * Test for Add Product API
 */
 describe('Add Products API Testing', ()=>{
    let server:Server;

    beforeEach(async ()=>{
        server = await init();
    });

    afterEach(async ()=>{
        await server.stop();
    });

    it('addProducts without description', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "Kawasaki Ninja 1000", price: 1.34 },
        });
        expect(res.statusCode).to.equal(200);
    });

    it('addProducts with description', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "Kawasaki Ninja 1000sx", price: 3.56, description: "1000 SX" },
        });
        expect(res.statusCode).to.equal(200);
    });

    it('addProducts price should be greater than 0', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "CBR 650F", price: 0 },
        });
        expect(res.statusCode).to.equal(400);
    });

    it('addProducts price is required', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { name: "CBR 650F" },
        });
        expect(res.statusCode).to.equal(400);
    });

    it('addProducts name is required', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/addProduct',
            payload: { price: 1 },
        });
        expect(res.statusCode).to.equal(400);
    });
});

/**
 * Test for Get Product API
 */
describe('Get Products API Testing', ()=>{
    let server:Server;

    beforeEach(async ()=>{
        server = await init();
    });

    afterEach(async ()=>{
        await server.stop();
    });

    it('getProducts Without Currency', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getProduct/1'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('getProducts With Valid Currency', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getProduct/1/GBP'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('getProducts With Wrong Currency', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getProduct/1/INR'
        });
        expect(res.statusCode).to.equal(400);
    });
});

/**
 * Test for Get Product API
 */
 describe('Get Most Viewed Products API Testing', ()=>{
    let server:Server;

    beforeEach(async ()=>{
        server = await init();
    });

    afterEach(async ()=>{
        await server.stop();
    });

    it('get most viewed Products Without Currency', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getMostViewedProducts'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('get most viewed Products With Valid Currency with default total', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getMostViewedProducts/GBP'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('get most viewed Products With Valid Currency with 1 total', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getMostViewedProducts/GBP/1'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('getMostViewedProducts With Wrong Currency', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/getMostViewedProducts/INR'
        });
        expect(res.statusCode).to.equal(400);
    });
});

/**
 * Test for Delete Product API
 */
 describe('Delete Product API Testing', ()=>{
    let server:Server;

    beforeEach(async ()=>{
        server = await init();
    });

    afterEach(async ()=>{
        await server.stop();
    });

    it('delete Products', async () => {
        const res = await server.inject({
            method: 'delete',
            url: '/deleteProduct',
            payload: { id: 4 }
        });
        expect(res.statusCode).to.equal(200);
    });
});