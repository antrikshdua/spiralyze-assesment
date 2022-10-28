module.exports = {
    errorMiddleware: require('./error.middleware'),
    notfoundMiddleware: require('./notfound.middleware'),
    apiAuthMiddleware: require('./apiAuth.middleware'),
    apiResponseMiddleware: require('./apiResponse.middleware'),
    apiLoggerMiddleware: require('./apiLogger.middleware'),
    joiValidatorMiddleware: require('./joiValidator.middleware'),
};