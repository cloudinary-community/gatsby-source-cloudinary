const { newCloudinary, getResourceOptions } = require('./utils').default;

const getNodeData = (gatsby, media) => {
    const nodeId = gatsby.createNodeId(`cloudinary-media-${media.public_id}`)
    const nodeContent = JSON.stringify(media)

    const nodeData = Object.assign({}, media, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
            type: `CloudinaryMedia`,
            content: nodeContent,
            contentDigest: gatsby.createContentDigest(media),
        },
    })

    return nodeData
};

const createCloudinaryNodes = (gatsby, cloudinary, options) => {
    cloudinary.v2.api.resources(options, (error, result) => {
        const hasResources = (result && result.resources && result.resources.length);

        if (error) {
            console.error(error);
            return;
        }

        if (!hasResources) {
            console.log('\n ~Yikes! No nodes created because no Cloudinary resources found. Try a different query?')
            return;
        }

        result.resources.forEach(resource => {
            const nodeData = getNodeData(resource);
            gatsby.actions.createNode(nodeData);
            console.log(`Created CloudinaryMedia node: ${media.public_id}`)
        })
    });
};

exports.sourceNodes = (gatsby, options) => {
    delete options.plugins;

    const cloudinary = newCloudinary(options);
    const resourceOptions = getResourceOptions(options);

    createCloudinaryNodes(gatsby, cloudinary, resourceOptions);
};