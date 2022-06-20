const { result } = require('lodash');
const { newCloudinary, getResourceOptions } = require('./utils');

const REPORTER_PREFIX = `gatsby-source-cloudinary`;
const NODE_TYPE = `CloudinaryMedia`;

const getNodeData = (gatsbyUtils, media) => {
  const { createNodeId, createContentDigest } = gatsbyUtils;

  return {
    ...media,
    id: createNodeId(`cloudinary-media-${media.public_id}`),
    parent: null,
    internal: {
      type: NODE_TYPE,
      content: JSON.stringify(media),
      contentDigest: createContentDigest(media),
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

const createCloudinaryNodes = async (
  gatsbyUtils,
  cloudinary,
  resourceOptions,
  { limit },
) => {
  const { actions, reporter } = gatsbyUtils;

  let nextCursor = null;

  do {
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      max_results: limit < 10 ? limit : 10,
      next_cursor: nextCursor,
    });

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
    nextCursor = result.next_cursor;

    limit = limit - 10;
  } while (nextCursor && limit > 0);
};

exports.sourceNodes = (gatsbyUtils, pluginOptions) => {
  const cloudinary = newCloudinary(pluginOptions);
  const resourceOptions = getResourceOptions(pluginOptions);

  return createCloudinaryNodes(gatsbyUtils, cloudinary, resourceOptions, {
    limit: 27,
  });
};
