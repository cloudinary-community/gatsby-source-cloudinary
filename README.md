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
    apiSecret: 'xxxxxxxxxxxxx'
    }
}
```
Obtain your cloudname, key and secret from your cloudinary console when you signup at http://cloudinary.com

Feel free to create feature requests.... and PRs :)