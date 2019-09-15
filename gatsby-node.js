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

    /**
     * @param {*} media 
     * @param {Array} transformations 
     */
    function processMedia(media, transformations) {
        const nodeId = createNodeId(`cloudinary-media-${media.public_id}`)
    
        transformations.forEach(transformation => {
            media[`${transformation}_image`] = {
                url: cloudinary.url(media.public_id + '.jpg', {
                    secure: false,
                    transformation: [transformation]
                }),
                secure_url: cloudinary.url(media.public_id + '.jpg', {
                    secure: true,
                    transformation: [transformation]
                })
            }
        })

        media.thumb_dims = {
            w: media.width < 640 ? media.width : 640,
            h: media.width < 640 ? media.height : Math.floor((640 * media.height) / media.width)
        }
        
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

    const queryParams = new Object;

    if(!!resourceType){queryParams.resource_type = resourceType}
    if(!!tags){queryParams.tags = tags}
    if(!!maxResults){queryParams.max_results = maxResults}
    if(!!type){queryParams.type = type}
    if(!!prefix && !!type){queryParams.prefix = prefix}
    const transformations = configOptions.transformations || []

    return (
        cloudinary.v2.api.resources(queryParams,(error, result)=>{
            if(result.resources.length > 0){
                result.resources.forEach( mediaItem => {
                    const nodeData = processMedia(mediaItem, transformations)
                    createNode(nodeData)
                })  
            } else {
                console.log('\n ~Yikes! No Cloudinary files found and nodes not created. Try a better query.')
            }
            
            if (error) {
                console.log(error)
            }
            console.log(`Cloudinary rate limit remaining: ${result.rate_limit_remaining}`)
        })
    )
  }