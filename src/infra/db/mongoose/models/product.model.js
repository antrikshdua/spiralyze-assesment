'use strict';

/**
 * Import module
 */
const mongoose = require('mongoose');
/**
 * Import env
 */
const {
    productDetailsTable,
    productDeleteLogTable
} = require('../../../../../src/infra/env');

const Schema = mongoose.Schema;

const ProductDetailsSchema = new Schema({
    productId: {
        type: String
    },
    price: {
        type: Number,
        default: 1
    },
    summary: {
        type: String,
    },
}, {
    timestamps: true
});
ProductDetailsSchema.index({productId:1})

const ProductDeleteSchema = new Schema({
    productId: {
        type: String
    },
    price: {
        type: Number,
        default: 1
    },
    summary: {
        type: String,
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {
    timestamps: true
});

const productDetailsSchema =  mongoose.model(productDetailsTable, ProductDetailsSchema);
const productDeleteSchema = mongoose.model(productDeleteLogTable, ProductDeleteSchema);

module.exports = {
    productDetailsSchema: productDetailsSchema,
    productDeleteSchema: productDeleteSchema
};

