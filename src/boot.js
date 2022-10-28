'use strict';

/**
 * Import module
 */
const {
    startNodeServer,
} = require('../src/interfaces/api/application'); //js file for api boot
const {
    port,
    nodeEnv,
} = require('../src/infra/env');
const {
    appLogger,
} = require('../src/infra/logger');

/**
 * Initiate node server
 */
startNodeServer().then(app =>
    app.listen(port, () => {
        appLogger.info(`Spiralyze server listening on ${port} in ${nodeEnv} mode`);
    }),
    err => {
        appLogger.error('Error while starting up server :: ', err);
        process.exit(1);
    }
);