'use strict';

/**
 * Import module
 */
const log4js = require('log4js');
/**
 * Import env
 */
const {
    logLevels,
} = require('../../../src/infra/env');

const appLogger = log4js.getLogger('[Spiralyze]');
appLogger.level = logLevels.app;

const HTTPLogger = log4js.getLogger('[Spiralyze-HTTP]');
HTTPLogger.level = logLevels.http;

const getCustomLogger = (label = '[Spiralyze-Misc]', LOG_LEVEL = 'debug') => {
    const customLogger = log4js.getLogger(label);
    customLogger.level = LOG_LEVEL;
    return customLogger;
};

module.exports = {
    appLogger,
    HTTPLogger,
    getCustomLogger
};