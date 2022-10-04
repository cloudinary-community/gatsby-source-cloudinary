# 🦄 Gatsby-Source-Cloudinary

🖼 Our source plugin queries media files from your Cloudinary account into `CloudinaryMedia` nodes in your Gatsby project.

🖼 Compatible with gatsby-plugin-image.

## 🐢 Are you wasting your user's time with JPEGs?

🏃‍♀️ Imagine serving AVIF. Or WebP? Imagine serving the most modern image format your user's browser can support on her device.

## 1. Install plugin 🦄

```bash
npm install --save gatsby-source-cloudinary
```

```bash
yarn add --save gatsby-source-cloudinary
```

### 2. Gatsby Plugin Image 🖼️

To use [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) you'll need to install it along with [gatsby-transformer-cloudinary](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/).


```bash
npm install --save gatsby-transformer-cloudinary gatsby-plugin-image
```

```bash
yarn add --save gatsby-transformer-cloudinary gatsby-plugin-image
```

### 3. Cloudinary cloudname, key and secret 🤫

Cloudinary offers a generous free tier which is more than enough to bootstrap projects.
Get your cloudname, key and secret from your cloudinary console when you signup at [Cloudinary.com](https://cloudinary.com).

### 4. Use .env.development 🔑

Store your `cloudName`, `apiKey` and `apiSecret` as environment variables for security.
Create an `.env.development` file in the project's root and add your environment variables.

```
CLOUDINARY_API_KEY=INSERT API KEY HERE
CLOUDINARY_API_SECRET=INSERT API SECRET HERE
CLOUDINARY_CLOUD_NAME=INSERT CLOUDNAME HERE
```

Install `dotenv` in your project with:

```bash
npm install dotenv
```

```bash
yarn add dotenv
```

In your `gatsby-config.js` file, require and configure `dotenv` with:

```js
require('dotenv').config();
```

There are several options to configure `dotenv` to use different env files either in development or production. You can find that [here](https://www.npmjs.com/package/dotenv).

Add the `.env.development` file to `.gitignore` so it's not committed.

### 5. Configure the environment variables on deployment.

### 6. Include your new plugin in `gatsby-config.js` 🦄

In your `gatsby-config.js` file, include the plugin like this:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        maxResults: 22,
      },
    },
    // Optional usage of gatsby-plugin-image
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        transformTypes: [`CloudinaryMedia`],
      },
    },
    `gatsby-plugin-image`,
  ],
};
```

## 7. How to use 💅

Run `gatsby develop` and all media assets configured in the plugin are now automagically 🌟 available as `cloudinaryMedia` and `allCloudinaryMedia` in graphQL.

These can run in a Page Query or StaticQuery.

Create your beautiful and accessible website or app 💅

```js
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Images = () => {
  const data = useStaticQuery(graphql`
    query CloudinaryImages {
      allCloudinaryMedia {
        edges {
          node {
            secure_url
          }
        }
      }
    }
  `);
  const clImages = data.allCloudinaryMedia.edges;

  return (
    <div>
      <div>
        {clImages.map((image, index) => (
          <div key={`${index}-cl`}>
            <img src={image.node.secure_url} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Example usage with gatsby-plugin-image 🖼️

Example with [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) + [gatsby-transformer-cloudinary](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/). gatsby-plugin-image will add the `gatsbyImageData` resolver used below.

```js
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const SingleImage = () => {
  const data = useStaticQuery(graphql`
    query CloudinaryImage {
      cloudinaryMedia {
        secure_url
        gatsbyImageData(
          width: 300
          aspectRatio: 1
          transformations: ["e_grayscale", "c_fill"]
        )
      }
    }
  `);

  const imageSrc = data.cloudinaryMedia.secure_url;
  const image = getImage(data.cloudinaryMedia);

  return (
    <>
      <img width="300" src={imageSrc} alt={'no alt :('} />
      <GatsbyImage image={image} alt="no alt :(" />
  );
};

export default SingleImage;
```


### Plugin options 🔌

You can find the plugin options in the table below.

| option         | type    | required | default | description                                                                                                                                                                                                         |
| -------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cloudName`    | string  | true     | n/a     | Cloud name of your Cloudinary account, can be obtained from your [Cloudinary console](https://cloudinary.com/console/). This should be stored and retrieved as an environment variable.                             |
| `apiKey`       | string  | true     | na/a    | API Key of your Cloudinary account, can be obtained from your [Cloudinary console](https://cloudinary.com/console/). This should be stored and retrieved as an environment variable.                                |
| `apiSecret`    | string  | true     | n/a     | API Secret of your Cloudinary account, can be obtained from your [Cloudinary console](https://cloudinary.com/console/). This should be stored and retrieved as an environment variable.                             |
| `resourceType` | string  | false    | image   | This is the file type. Possible values: image, raw, video. Note: Use the video resource type for all video resources as well as for audio files, such as .mp3.                                                      |
| `type`         | string  | false    | n/a     | This is the storage type: upload, private, authenticated, facebook, twitter, gplus, instagram_name, gravatar, youtube, hulu, vimeo, animoto, worldstarhiphop or dailymotion. When non given, all types are sourced. |
| `maxResults`   | integer | false    | 10      | Max number of resources to return                                                                                                                                                                                   |
| `tags`         | boolean | false    | false   | If true, include the list of tag names assigned to each resource                                                                                                                                                    |
| `prefix`       | string  | false    | n/a     | Find all resources with a public ID that starts with the given prefix. The resources are sorted by public ID in the response.                                                                                       |
| `context`      | boolean | false    | n/a     | Specifies if the context data for the image should be returned. This is useful for retrieving `alt` text or custom metadata in key:value pairs for an image set on Cloudinary.                                      |

With `prefix`, you can source only media files from a specific folder. However, you will need to specify `type` and `resourceType` in the config options.

An example `prefix` value is `gatsby-anime-videos/`. This will fetch only media files with public ids beginning with `gatsby-anime-videos/*`. Example: `gatsby-anime-videos/naruto.mp4`

The `f_auto` and `q_auto` Cloudinary transformations are applied automatically to all media queries. This optimizes the delivered media quality and format.

> All media files sourced from Cloudinary are done when Gatsby creates an optimized build; hence you will need to trigger a new production build whenever new media files are added directly on Cloudinary.

## Motivation

Gatsby offers the ability to develop high-performance web pages with a rich developer experience and declarative data fetching Layer with GraphQL.
Cloudinary provides a robust solution to manage media assets, from storage, and optimized delivery, to media transformations. Extending the powers of Gatsby with the use of gatsby-source-cloudinary affords the best of both worlds, to allow users to store media assets on Cloudinary,
leveraging Cloudinary's powerful optimization and transformation capabilities in fast sites built with Gatsby.

While Cloudinary images with on-the-fly transformations can be used during runtime in Gatsby, gatsby-source-cloudinary utilizes the build optimizations of Gatsby.

## Features

- Store media files on Cloudinary and deliver through a secure CDN to your Gatsby site
- Average of over 60% image optimizations using `f_auto` and `q_auto` applied by default.
- Query Cloudinary images in Gatsby's data layer using GraphQL.
- Utilize Cloudinary's robust transformation suite in media files on a Gatsby site.
- Manage media assets of an application entirely on Cloudinary rather than directly in the codebase.

Looking to use the features of Gatsby-Image with Cloudinary optimized storage, transformations, and delivery? Check out the [gatsby-transformer-cloudinary](https://www.npmjs.com/package/gatsby-transformer-cloudinary) plugin.

## Other Resources

- [Cloudinary image transformation reference](https://cloudinary.com/documentation/image_transformation_reference)
- [Try the gatsby-transformer-cloudinary plugin to utilize the power of gatsby-image and cloudinary](https://www.npmjs.com/package/gatsby-transformer-cloudinary)
- [Using Cloudinary image service for media optimization](https://www.gatsbyjs.org/docs/using-cloudinary-image-service/)

## Contribute 🏴‍☠️

Want to contribute to making this tool even better? Feel free to send in issues and pull requests on feature requests, fixes, bugs, typos, performance lapses, or any other challenge faced with using this tool.

## License

MIT
