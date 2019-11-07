const cloudinary = require('cloudinary').v2;

const DEFAULT_KEYS = ["resourceType", "prefix", "tags", "maxResults", "type", "context"];

const newCloudinary = (options) => {
    cloudinary.config({
        cloud_name: options.cloudName,
        api_key: options.apiKey,
        api_secret: options.apiSecret
    });
    return cloudinary;
}

const getResourceOptions = (options) => {
    let result = {};
    DEFAULT_KEYS.forEach(key => {
        if (typeof options[key] !== 'undefined') {
            result[key] = options[key];
        }
    });
};

module.exports = {
    newCloudinary,
    getResourceOptions
};
