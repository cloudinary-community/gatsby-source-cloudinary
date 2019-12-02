const cloudinary = require("cloudinary").v2;
const snakeCase = require("lodash.snakecase");

const DEFAULT_KEYS = ["resourceType", "prefix", "tags", "maxResults", "type", "context"];
const DEFAULT_TYPE = "upload";

const newCloudinary = (options) => {
  cloudinary.config({
    cloud_name: options.cloudName,
    api_key: options.apiKey,
    api_secret: options.apiSecret,
  });

  return cloudinary
};

const getResourceOptions = (options) => {
  let result = {};

  DEFAULT_KEYS.forEach(key => {
    if (typeof options[key] !== "undefined") {
      result[snakeCase(key)] = options[key]
    }
  });

  result.type = result.type || DEFAULT_TYPE;

  return result
};

module.exports = {
  newCloudinary,
  getResourceOptions,
};
