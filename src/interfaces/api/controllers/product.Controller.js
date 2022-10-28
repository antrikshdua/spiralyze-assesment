'use strict';

const {
    service,
} = require('../../../domain/Product');

/**
 * Product details API
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const listProducts = async (req, res, next) => {
    try {
        const data = await service.listProducts();

        return res.send({
            data,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Product create API
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const createProduct = async (req, res, next) => {
    try {
        const {
            body,
        } = req;

        const data = await service.createProduct(body);

        return res.send({
            data,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Product update API
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const updateProduct = async (req, res, next) => {
    try {
        const {body} = req;
        const data = await service.updateProduct(body);
        return res.send({
            data,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Product Delete Service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const deleteProduct = async (req, res, next) => {
    try {
        let {productId} = req.params;
        const data = await service.deleteProduct(productId);
        return res.send({
            data,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    listProducts,
    createProduct,
    deleteProduct,
    updateProduct
};