'use strict';

/**
 * Import module
 */
const mongoose = require('mongoose');
/**
 * Import models
 */
const {
    productModel,
} = require('../../../src/infra/db/mongoose/models');

/**
 *  Import logger
 */
const {
    appLogger,
} = require('../../../src/infra/logger');

const ObjectId = mongoose.Types.ObjectId;

const findAllProducts = async (condition, projection = {}) => {
    return productModel.productDetailsSchema.find(condition);
};

const insertOneProduct = async (data) => {
    const productSchema = new productModel.productDetailsSchema(data);
    return productSchema.save();
};

const updateOneProduct = async (condition, updateData) => {
    return productModel.productDetailsSchema.findOneAndUpdate(condition, updateData, {new: true});
};

const removeOneProduct = async (condition) => {
    return productModel.productDetailsSchema.findOneAndRemove(condition);
};

module.exports = {
    ObjectId,
    findAllProducts,
    insertOneProduct,
    updateOneProduct,
    removeOneProduct
};