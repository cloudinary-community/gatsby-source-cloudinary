const cloudinary = require('cloudinary').v2;
const { snakeCase } = require('lodash');

const pluginPkg = require('../package.json');
const gatsbyPkg = require('gatsby/package.json');

const SDK_CODE = 'X';
const SDK_SEMVER = pluginPkg.version;
const TECH_VERSION = gatsbyPkg.version;

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

const generateCloudinaryUrl = (
  { cloud_name, public_id, resource_type },
  { secure },
) => {
  const url = cloudinary.url(public_id, {
    resource_type: resource_type,
    cloud_name: cloud_name,
    secure: secure,
    transformation: { quality: 'auto', fetch_format: 'auto' },
    urlAnalytics: true,
    sdkCode: SDK_CODE,
    sdkSemver: SDK_SEMVER,
    techVersion: TECH_VERSION,
  });

  return url;
};

module.exports = {
  newCloudinary,
  getResourceOptions,
  generateCloudinaryUrl,
};
