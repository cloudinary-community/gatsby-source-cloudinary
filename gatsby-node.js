const { newCloudinary, getResourceOptions } = require('./utils');

const REPORTER_PREFIX = `gatsby-source-cloudinary`;
const NODE_TYPE = `CloudinaryMedia`;

const getNodeData = (gatsby, media) => {
  return {
    ...media,
    id: gatsby.createNodeId(`cloudinary-media-${media.public_id}`),
    parent: null,
    internal: {
      type: NODE_TYPE,
      content: JSON.stringify(media),
      contentDigest: gatsby.createContentDigest(media),
    },
  };
};

const addTransformations = (resource, transformation, secure) => {
  const splitURL = secure
    ? resource.secure_url.split('/')
    : resource.url.split('/');
  splitURL.splice(6, 0, transformation);

  const transformedURL = splitURL.join('/');
  return transformedURL;
};

const createCloudinaryNodes = (gatsbyUtils, cloudinary, options) => {
  const { actions, reporter } = gatsbyUtils;

  return cloudinary.api.resources(options, (error, result) => {
    const hasResources = result && result.resources && result.resources.length;

    if (error) {
      reporter.error(
        `${REPORTER_PREFIX}: Error fetching Cloudinary resources - ${error.message}`,
      );
      return;
    }

    if (!hasResources) {
      reporter.warn(
        `${REPORTER_PREFIX}: No Cloudinary resources found. Try a different query?`,
      );
      return;
    }

    result.resources.forEach((resource) => {
      const transformations = 'q_auto,f_auto'; // Default CL transformations, todo: fetch base transformations from config maybe.

      resource.url = addTransformations(resource, transformations);
      resource.secure_url = addTransformations(resource, transformations, true);

      const nodeData = getNodeData(gatsbyUtils, resource);
      actions.createNode(nodeData);
    });

    reporter.info(
      `${REPORTER_PREFIX}: Added ${hasResources} ${NODE_TYPE} nodes(s)`,
    );
  });
};

exports.sourceNodes = (gatsby, options) => {
  const cloudinary = newCloudinary(options);
  const resourceOptions = getResourceOptions(options);

  return createCloudinaryNodes(gatsby, cloudinary, resourceOptions);
};
