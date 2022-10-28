'use strict';

/**
 * Import constants
 */
const {
    HTTP_STATUS_CODES,
} = require('../constants/statusCodes.constants');
const {
    BAD_REQUEST,
} = require('../constants/errorMessages.constants');

/**
 * Error handler middleware function export
 */
const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || HTTP_STATUS_CODES.BAD_REQUEST;
    const message = err.message || BAD_REQUEST;

    const apiResponse = {
        error: true,
        message,
        data: {},
    };

    return res.status(statusCode).send(apiResponse);
};

module.exports = errorHandler;