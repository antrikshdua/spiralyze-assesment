'use strict';

/**
 * Load env variable
 */
require('dotenv').config();

/**
 * Import module
 */
const Joi = require('joi');

/**
 * Env variable validation schema
 */
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().allow('local', 'dev', 'prod', 'test').default('local'),
    PORT: Joi.number().default(3000),
    GAME_MONGO_URL: Joi.string().default('mongodb://127.0.0.1:27017/node_mongo_boilerplater'),
    GAME_REDIS_PREFIX: Joi.string().default('LudoTowncity::'),
    GAME_USERS_TABLE_NAME: Joi.string().default('tbl_users'),
    REDIS_HOST: Joi.string().default('127.0.0.1'),
    REDIS_PORT: Joi.string().default('6379'),
    REDIS_PASSWORD: Joi.string().default(''),
    REDIS_MODE: Joi.string().default('ALONE'),
    REDIS_PUBLISHER_CHANNEL: Joi.string().default('publisher_channel'),
    REDIS_SUBSCRIBER_CHANNEL: Joi.string().default('subscriber_channel0'),
    TABLE_NAME: Joi.string().default('tbl_tablename'),
    JWT_SECRET: Joi.string().default('xyz'),
    CRYPTO_ENABLE: Joi.boolean().default(false),
    CRYPTO_KEY: Joi.string().default('xyz'),
    HTTP_LOG_LEVEL: Joi.string().default('debug'),
    APP_LOG_LEVEL: Joi.string().default('debug'),
    ROBOT_ENABLED: Joi.boolean().default(true),
    PRODUCT_DETAILS_TABLE_NAME: Joi.string().default('tbl_product_details'),
    PRODUCT_DELETE_LOG_TABLE_NAME: Joi.string().default('tbl_product_delete_log'),

}).unknown().required();

/**
 * Validate env variable
 */
const {
    error,
    value: envVars,
} = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Env variable validation error ${error.message}`);
}

/**
 * Env object
 */
const env = {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    gameMongoUrl: envVars.GAME_MONGO_URL,
    gameRedisPrefix: envVars.GAME_REDIS_PREFIX,
    gameUsersTableName: envVars.GAME_USERS_TABLE_NAME,
    productDetailsTable: envVars.PRODUCT_DETAILS_TABLE_NAME,
    productDeleteLogTable: envVars.PRODUCT_DELETE_LOG_TABLE_NAME,
    tournamentRedis: {
        host: envVars.REDIS_HOST,
        port: envVars.REDIS_PORT,
        password: envVars.REDIS_PASSWORD,
        mode: envVars.REDIS_MODE,
    },
    RedisPublisherChannel: envVars.REDIS_PUBLISHER_CHANNEL,
    RedisSubscriberChannel: envVars.REDIS_SUBSCRIBER_CHANNEL,
    TableName: envVars.TOURNAMENT_TABLE_NAME,
    jwtSecret: envVars.JWT_SECRET,
    crypto: {
        enable: envVars.CRYPTO_ENABLE,
        key: envVars.CRYPTO_KEY,
    },
    logLevels: {
        http: envVars.HTTP_LOG_LEVEL,
        app: envVars.APP_LOG_LEVEL,
    },
    robotEnabled: envVars.ROBOT_ENABLED,
};

switch (env.nodeEnv) {
    case 'dev':
        env.logLevels = {
            http: envVars.HTTP_LOG_LEVEL || 'debug',
            app: envVars.APP_LOG_LEVEL || 'debug',
        };
        break;
    case 'prod':
        env.logLevels = {
            http: envVars.HTTP_LOG_LEVEL || 'warn',
            app: envVars.APP_LOG_LEVEL || 'warn',
        };
        break;
    case 'staging':
        env.logLevels = {
            http: envVars.HTTP_LOG_LEVEL || 'warn',
            app: envVars.APP_LOG_LEVEL || 'warn',
        }
        break;
    case 'test':
        env.logLevels = {
            http: envVars.HTTP_LOG_LEVEL || 'debug',
            app: envVars.APP_LOG_LEVEL || 'debug',
        };
        break;
}

/**
 * Export env object
 */
module.exports = env;