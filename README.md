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
    cloudName: 'xxxx',
    apiKey: 'xxxxxxxxxxxxxx',
    apiSecret: 'xxxxxxxxxxxxx',
    resourceType: 'image',
    type: `<type Value>`,
    maxResults: `<Max result>`,
    tags:`<fetch image tags?>`
    }
}
```

`cloudName`, `apiKey` and `apiSecret` are compulsory fields whereas the rest are optional query parameters to be included.

Here are details of each query parameter as culled from cloudinary.com.

* resource_type - Optional (String, default: image). The type of file. Possible values: image, raw, video. Relevant as a parameter only when using the SDKs (the resource type is included in the endpoint URL for direct calls to the HTTP API). Note: Use the video resource type for all video resources as well as for audio files, such as .mp3.
* type - Optional (String, default: all). The storage type: upload, private, authenticated, facebook, twitter, gplus, instagram_name, gravatar, youtube, hulu, vimeo, animoto, worldstarhiphop or dailymotion. Relevant as a parameter only when using the SDKs (the type is included in the endpoint URL for direct calls to the HTTP API).
* max_results - Optional. (Integer, default=10. maximum=500). Max number of resources to return.
* tags - Optional (Boolean, default: false). If true, include the list of tag names assigned each resource.

Obtain your cloudname, key and secret from your cloudinary console when you signup at https://cloudinary.com

Feel free to create feature requests.... and PRs :)