'use strict';

/**
 * Import JWT module
 */
const {
    decodeUserToken,
} = require('../../../../src/infra/jwt');
/**
 * Import constants
 */
const {
    HTTP_STATUS_CODES,
} = require('../constants/statusCodes.constants');
const {
    UNAUTHORIZED_CLIENT,
} = require('../constants/errorMessages.constants');
/**
 * Import services
 */
// const {
//     getUserProfile,
// } = require('../../../../src/domain/User/user.service');

/**
 * Api auth handler middleware function export
 */
const apiAuthHandler = async (req, res, next) => {
    try {
        const token = req.headers.authorization || false;
        if (token) {
            const decodedToken = await decodeUserToken(token);
            const userId = decodedToken._userId || false;
            if (userId) {
                const user = await getUserProfile(userId);
                if (user) {
                    req._userId = userId;
                    return next();
                }
            }
        }
        const apiResponse = {
            error: true,
            message: UNAUTHORIZED_CLIENT,
            data: {},
        };
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send(apiResponse);
    } catch (error) {
        const apiResponse = {
            error: true,
            message: UNAUTHORIZED_CLIENT,
            data: {},
        };
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send(apiResponse);
    }
};

module.exports = apiAuthHandler;