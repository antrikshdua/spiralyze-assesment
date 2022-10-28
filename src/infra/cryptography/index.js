/**
 * Import
 */
const xxtea = require('xxtea-node');
/**
 * Import env
 */
const {
    crypto,
} = require('../../../src/infra/env');

const encrypt = (data) => {
    try {
        const encrypt_data = xxtea.encryptToString(JSON.stringify(data), crypto.key);
        return encrypt_data;
    } catch (error) {
        throw error;
    }
};

const decrypt = (data) => {
    try {
        const decrypt_data = xxtea.decryptToString(data, crypto.key);
        return JSON.parse(decrypt_data);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    encrypt,
    decrypt
};