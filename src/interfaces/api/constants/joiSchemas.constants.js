'use strict';

/**
 * Import module
 */
const Joi = require('joi');

const productCreateSchema = Joi.object().keys({
    productId: Joi.string().trim().required(),
    price: Joi.number().required(),
    summary: Joi.string().trim().required()
});

const productDeleteSchema = Joi.object().keys({
    productId: Joi.string().trim().required()
});

const productUpdateSchema = Joi.object().keys({
    productId: Joi.string().trim().required(),
    summary: Joi.string().trim().required(),
    price: Joi.number().required()
});


module.exports = {
    productCreateSchema,
    productDeleteSchema,
    productUpdateSchema
};