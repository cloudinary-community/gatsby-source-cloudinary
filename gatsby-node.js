const {newCloudinary, getResourceOptions} = require('./utils');
const type = `CloudinaryMedia`;

const getNodeData = (gatsby, media) => {
  return {
    ...media,
    id: gatsby.createNodeId(`cloudinary-media-${media.public_id}`),
    parent: null,
    internal: {
      type,
      content: JSON.stringify(media),
      contentDigest: gatsby.createContentDigest(media)
    }
  };
};


const applyTransformation = (cloudinary, resource, transformation) => {
  return {
      url: cloudinary.url(`${resource.public_id}.${resource.format}`, {
      secure: false,
      transformation
    }),
    secure_url: cloudinary.url(`${resource.public_id}.${resource.format}`, {
        secure: true,
        transformation
    })
  }
}

const createCloudinaryNodes = (gatsby, cloudinary, options) => {
  
  const resourceOptions = getResourceOptions(options);

  return cloudinary.api.resources(resourceOptions, (error, result) => {
    const hasResources = (result && result.resources && result.resources.length);
    console.debug(`Cloudinary rate limit remaining: ${result.rate_limit_remaining}`)

    if (error) {
      console.error(error);
      return;
    }

    if (!hasResources) {
      console.warn('\n ~Yikes! No nodes created because no Cloudinary resources found. Try a different query?');
      return;
    }

    result.resources.forEach(resource => {
      Object.keys(options.transformations || []).forEach( (transformation) => {
        resource[transformation] = applyTransformation(cloudinary, resource, options.transformations[transformation]);
      })
      
      const nodeData = getNodeData(gatsby, resource);
      gatsby.actions.createNode(nodeData);
    });

    console.info(`Added ${hasResources} CloudinaryMedia ${hasResources > 1 ? 'nodes' : 'node'}`);
  });
};

exports.sourceNodes = (gatsby, options) => {
  const cloudinary = newCloudinary(options);
  return createCloudinaryNodes(gatsby, cloudinary, options );
};
