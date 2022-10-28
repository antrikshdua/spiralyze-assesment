/**
 * Import module
 */
const Joi = require('joi');
const {
    get,
} = require('lodash');
/**
 * Import joi schemas
 */
const Schemas = require('../../../../src/interfaces/api/constants/joiSchemas.constants');
/**
 * Import env
 */
const {
    crypto,
} = require('../../../../src/infra/env');
/**
 * Import utils
 */
const cryptography = require('../../../../src/infra/cryptography');
/**
 * Import constants
 */
const {
    HTTP_STATUS_CODES,
} = require('../../../../src/interfaces/api/constants/statusCodes.constants');
const {
    BAD_REQUEST,
} = require('../../../../src/interfaces/api/constants/errorMessages.constants');

module.exports = (route) => {
    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };
    // return the validation middleware
    return async (req, res, next) => {
        const _schema = get(Schemas, route);
        if (crypto.enable) {
            req.body = await cryptography.decrypt(req.body.data);
        }
        if (_schema) {
            return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
                if (err) {
                    const apiResponse = {
                        error: true,
                        message: BAD_REQUEST,
                        data: {},
                    };
                    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(apiResponse);
                } else {
                    req.body = data;
                    next();
                }
            });
        }
        next();
    };
};