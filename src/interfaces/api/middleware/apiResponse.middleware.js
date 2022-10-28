'use strict';

/**
 * Import module
 */
const mung = require('express-mung');
/**
 * Import constants
 */
const {
    API_SUCCESS,
} = require('../constants/successMessages.constants');
const {
    crypto,
} = require('../../../../src/infra/env');
const {
    encrypt,
} = require('../../../../src/infra/cryptography');

const apiResponse = (body, req, res) => {

    const data = body.data || {};

    const apiResponse = {
        error: false,
        message: body.message || API_SUCCESS,
        data: (crypto.enable) ? encrypt(data) : data,
    };

    return apiResponse;
};

module.exports = mung.json(apiResponse);