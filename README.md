# Gatsby-Source-Cloudinary

This plugin is still in development, however you can try it out to query media files (videos) from your cloudinary account.

To use, in your Gatsby project run:

```bash
npm install --save gatsby-source-cloudinary
```

In your `gatsby-config.js` file, include the plugin like this:

```js
{
    resolve:`gatsby-source-cloudinary`,
    options:{
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    resourceType: `image`,
    type: `type Value`,
    maxResults: `Max result`,
    tags:`fetch image tags?`,
    prefix: `abc-xyz/`
    }
}
```

`cloudName`, `apiKey` and `apiSecret` are compulsory fields whereas the rest are optional query parameters to be included.

> Store your `cloudName`, `apiKey` and `apiSecret` as environment variables for security. Ensure to configure the environment variables on deployment as well.

Here are details of each query parameter as culled from [Cloudinary.com](https://cloudinary.com).

* `resourceType` - Optional (String, default: image). The type of file. Possible values: image, raw, video. Relevant as a parameter only when using the SDKs (the resource type is included in the endpoint URL for direct calls to the HTTP API). Note: Use the video resource type for all video resources as well as for audio files, such as .mp3.
* `type` - Optional (String, default: all). The storage type: upload, private, authenticated, facebook, twitter, gplus, instagram_name, gravatar, youtube, hulu, vimeo, animoto, worldstarhiphop or dailymotion. Relevant as a parameter only when using the SDKs (the type is included in the endpoint URL for direct calls to the HTTP API).
* `maxResults` - Optional. (Integer, default=10. maximum=500). Max number of resources to return.
* `tags` - Optional (Boolean, default: false). If true, include the list of tag names assigned each resource.
* `prefix` - Optional. (String). Find all resources with a public ID that starts with the given prefix. The resources are sorted by public ID in the response.

> With `prefix`, you can source only media files from a specific folder. However, you will need to specify `type` and `resourceType` in the config options.

An example `prefix` value is `gatsby-anime-videos/`. This will fetch only media files with public ids beginning with `gatsby-anime-videos/*`. Example: `gatsby-anime-videos/naruto.mp4`

Obtain your cloudname, key and secret from your cloudinary console when you signup at [Cloudinary.com](https://cloudinary.com)

Feel free to create feature requests.... and PRs :)
