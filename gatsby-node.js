const cloudinary = require('cloudinary')

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, configOptions) => {
    const { createNode } = actions
  
    delete configOptions.plugins
  
    // Configure Cloudinary
    cloudinary.config({
        cloud_name: configOptions.cloudName,
        api_key: configOptions.apiKey,
        api_secret: configOptions.apiSecret
    })

    const processMedia = media => {
        const nodeId = createNodeId(`cloudinary-media-${media.public_id}`)
        const nodeContent = JSON.stringify(media)

        const nodeData = Object.assign({}, media, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
            type: `CloudinaryMedia`,
            content: nodeContent,
            contentDigest: createContentDigest(media),
        },
        })

        return nodeData
    }
    const {resourceType, prefix, tags, maxResults, type} = configOptions
    const queryParams ={
        resource_type:resourceType ? resourceType: undefined, 
        tags: tags ? tags: undefined,
        max_results: maxResults? maxResults: undefined,
        type: type ? type: undefined
    }
    console.log(queryParams)

    return (
        cloudinary.v2.api.resources(queryParams,(error, result)=>{
            result.resources.forEach((mediaItem)=>{
                const nodeData = processMedia(mediaItem)
                createNode(nodeData)
                console.log("Created Cloudinary file node")
            })
        })
    )
  }