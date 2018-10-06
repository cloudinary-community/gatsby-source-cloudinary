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
      const nodeId = createNodeId(`cloudinary-media-${media.id}`)
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

    return(
        cloudinary.v2.api.resources({resource_type:'video'},(error, result)=>{
        result.resources.forEach((mediaItem)=>{
            const nodeData =processMedia(mediaItem)
            createNode(nodeData)
        })
    })
    )

  }