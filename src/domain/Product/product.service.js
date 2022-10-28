'use strict';

/**
 *  Import logger
 */
const {
    appLogger,
} = require('../../../src/infra/logger');
const {
    ObjectId,
    findAllProducts,
    insertOneProduct,
    updateOneProduct,
    removeOneProduct
} = require('../../../src/domain/Product/product.repo');

/**
 * Create Product Service
 * @param {*} _userId 
 * @param {*} body 
 * @returns 
 */
 const createProduct = async (body) => {
    appLogger.debug(`productCreate :: service :: _userId :: ${body.productId} `);
    let productObj = {
        productId:body.productId,
        price:body.price,
        summary:body.summary
    }
    return await insertOneProduct(productObj);
};

/**
 * Product List service
 * @returns 
 */
 const listProducts = async () => {
    appLogger.debug(`productDetails :: service ::`);
    const tournament = await findAllProducts({});
    return tournament;
};

/**
 * Product Delete Service
 * @returns 
 */
 const deleteProduct = async (productId) => {
    appLogger.debug(`deleteProduct :: service :: productid:${productId}`);
    return await removeOneProduct(productId);
};

/**
 * Product Update Service
 * @param {*} _userId 
 * @param {*} body  
 * @returns 
 */
 const updateProduct = async (body) => {
   appLogger.debug(`updateProduct :: service ::`);
   let productObj = {
     price: body.price,
     summary: body.summary,
   };
    let updateProduct = await updateOneProduct({productId:body.productId}, productObj);
    return updateProduct;
};

module.exports = {
    listProducts,
    deleteProduct,
    updateProduct,
    createProduct,
};