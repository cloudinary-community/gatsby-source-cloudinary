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
    const {resourceType, prefix, tags, maxResults, type, context} = configOptions

    const queryParams = new Object;

    const search = cloudinary.v2.search
    const expression = []

    if(!!resourceType){expression.push('resource_type:' + resourceType)}
    if(!!type){expression.push('type:' + type)}
    if(!!prefix && !!type){expression.push('public_id:' + prefix + '*')}

    search.expression(expression.join(' AND '))

    if(!!tags){search.with_field('tags')}
    if(!!context){search.with_field('context')}

    if(!!maxResults){search.max_results(maxResults)}

    return (
        search.execute().then(result => {
            if(result.resources.length > 0){
                result.resources.forEach((mediaItem)=>{
                    const nodeData = processMedia(mediaItem)
                    createNode(nodeData)
                    console.log("Created Cloudinary file node")
                })
            }else{
                console.log('\n ~Yikes! No Cloudinary files found and nodes not created. Try a better query.')
            }
        }).catch(error => {
            console.log(error)
        })
    )
  }