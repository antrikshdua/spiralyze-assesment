'use strict';

/**
 * Import module
 */
const log4js = require('log4js');
/**
 * Import logger
 */
const {
    HTTPLogger,
} = require('../../../../src/infra/logger');

const apiLoggerHandler = () => {
    return log4js.connectLogger(HTTPLogger, {
        level: 'auto',
        format: (req, res, format) => {
            const logData = {
                IP_ADDRESS: format(`:remote-addr`),
                method: format(`:method`),
                path: format(`:url`),
                body: req.body,
                status: format(`:status`)
            };
            return format(`${JSON.stringify(logData, null, 2)}`)
        }
    });
};

module.exports = apiLoggerHandler;