# product-rest-api
Product Management Rest API

Requirement:

    We would like you to create a REST API for managing products. The API should allow the following actions:
        Create a new product
            When creating a new product, the name and price of the product need to be provided. Optionally, a description can also be provided. 
            The price is assumed to be in USD. The product should be saved to a SQL database.
        
        Get a single product
            When a single product is requested, all fields of that product are returned and the view-count for that product is incremented. 
            The request can optionally specify a currency, in which case the price should be converted to the requested currency before being returned. We need to support the following currencies:
                USD
                CAD
                EUR
                GBP
            
            The latest exchange rates can be retrieved from the public API https://currencylayer.com/ (or any similar API).
        
        List the most viewed products
            When a list of the most viewed products is requested, the API should return the products with the highest view-counts. By default, the top 5 products will be returned, but the request can also specify a custom number of products to return. Only products with at least 1 view should be included. 
            A specific currency can also be specified in which case all the prices should be returned in that currency.
        
        Delete a product
            When a product is deleted, it should no longer be included in any of the API responses but should remain in the database for audit purposes.

==============================================================
    
Create .env File and add Below configurations

    DB_NAME=catalog
    DB_USER=root
    DB_HOST=172.17.0.1
    DB_DRIVER=mysql
    DB_PASSWORD=rootnahihai
    DB_PORT=3307

    CURRENCY_APIKEY=ByR2N38kuKmOkPKzPBoQTw2NeleKpmu6
    CURRENCY_LIVE_RATES_API=https://api.apilayer.com/exchangerates_data/latest
    CURRENCY_CONVERT_API=https://api.apilayer.com/exchangerates_data/convert
    CURRENCIES=USD,CAD,EUR,GBP
    BASE_CURRENCY=USD

    #Docker Configuration
    MYSQLDB_USER=root
    MYSQLDB_ROOT_PASSWORD=rootnahihai
    MYSQLDB_DATABASE=catalog
    MYSQLDB_LOCAL_PORT=3307
    MYSQLDB_DOCKER_PORT=3306
    NODE_LOCAL_PORT=8080
    NODE_DOCKER_PORT=7700


====================== Docker Compose ========================================

docker-compose up -d

    Note: Need to change baseUrl to localhost:8080 in postman

====================== Manual Step up ========================================

To start the REST API
create a database "catalog"
- CREATE DATABASE catalog
- npm i
- npx tsc
- npm run start //To run the Server
- npm test //To check the test
- ./node_modules/.bin/esdoc //To create/update the esdocs

==============================================================

Development Environment Details
- IDE: VS Code
- MySQL: 5.7
- Node: 16.13.1
- NPM: 8.10.0
- Documentation Tool: esdoc
- Test: mocha and chai
