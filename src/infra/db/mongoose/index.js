'use strict';

/**
 * Import module
 */
const mongoose = require('mongoose');
/**
 * Import logger
 */
const {
    appLogger,
} = require('../../../../src/infra/logger');
const {
    gameMongoUrl,
} = require('../../../../src/infra/env');

const options = {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(gameMongoUrl, options).then(() => {
    appLogger.info(`Game mongodb database connection done`);
}).catch((err) => {
    appLogger.error(`Game mongodb database connection error :: `, err);
    process.exit(1)
});

module.exports = mongoose;