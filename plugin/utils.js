const cloudinary = require('cloudinary').v2;
const { snakeCase } = require('lodash');

const DEFAULT_KEYS = [
  'resourceType',
  'prefix',
  'tags',
  'maxResults',
  'type',
  'context',
  'resultsPerPage',
];
const DEFAULT_TYPE = 'upload';

const newCloudinary = (options) => {
  cloudinary.config({
    cloud_name: options.cloudName,
    api_key: options.apiKey,
    api_secret: options.apiSecret,
  });

  return cloudinary;
};

const getResourceOptions = (options) => {
  let result = {};

  DEFAULT_KEYS.forEach((key) => {
    if (typeof options[key] !== 'undefined') {
      result[snakeCase(key)] = options[key];
    }
  });

  result.type = result.type || DEFAULT_TYPE;
  if (!result.results_per_page) {
    result.results_per_page = result.max_results;
  }
  return result;
};

module.exports = {
  newCloudinary,
  getResourceOptions,
};
