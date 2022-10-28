'use strict';

/**
 * Import module
 */
const jwt = require('jsonwebtoken');
/**
 * Import env
 */
const {
    jwtSecret,
} = require('../../../src/infra/env');

const decodeUserToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    decodeUserToken,
};