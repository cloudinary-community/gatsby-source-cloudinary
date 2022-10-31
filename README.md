# Gatsby Source Cloudinary

A Gatsby source plugin to pull data from Cloudinary into the Gatsby data layer. For each media file found a `CloudinaryMedia` node is created.

- Compatible with [`gatsby-plugin-image`](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) when used in combination with [`gatsby-transformer-cloudinary`](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/).
- To upload images already in the Gatsby data layer (such as local files) to Cloudinary use [`gatsby-transformer-cloudinary`](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/).

[🚀 Getting Started](#🚀-getting-started) · [🖼️ Use with Gatsby Plugin Image](#🖼️-usage-with-gatsby-image) · [🔌 Plugin Options](#🔌-pugin-options) · [⚠️ Gotchas](#⚠️-gotchas)

## 🚀 Getting Started

### Install

```bash
npm install gatsby-source-cloudinary
```

or

```bash
yarn add gatsby-source-cloudinary
```

### Configure

Add `gatsby-source-cloudinary` to the plugins array in your `gatsby-config.js` file.

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
        // Adds your configured alt text
        context: true,
      },
    },
  ],
};
```

`process.env`⁉️ Read about [environment variables in Gatsby](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/) the Gatsby docs.

### Example usage

```jsx
import React from 'react';
import { graphql } from 'gatsby';

export default function BasicPage({ data }) {
  return (
    <main>
      {data.allCloudinaryMedia.nodes.map((media, index) => (
        <img key={index} width="200px" src={media.secure_url} />
      ))}
    </main>
  );
}

export const query = graphql`
  query {
    allCloudinaryMedia {
      nodes {
        secure_url
      }
    }
  }
`;
```

## 🖼️ Usage with Gatsby Image

To use [`gatsby-plugin-image`](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) the [`gatsby-transformer-cloudinary`](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/) is also needed.

### Install

```bash
npm install --save gatsby-transformer-cloudinary gatsby-plugin-image
```

or

```bash
yarn add --save gatsby-transformer-cloudinary gatsby-plugin-image
```

### Configure

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
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        // Attaches `gatsbyImageData` to `CloudinaryMedia`
        transformTypes: [`CloudinaryMedia`],
      },
    },
    `gatsby-plugin-image`,
  ],
};
```

Check the [`gatsby-plugin-image`](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) and [`gatsby-transformer-cloudinary`](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/) docs for more info.

### Example usage

```jsx
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function GasbyImagePage({ data }) {
  return (
    <main>
      {data.allCloudinaryMedia.nodes.map((media, index) => {
        const image = getImage(media);
        return <GatsbyImage key={index} image={image} />;
      })}
    </main>
  );
}

export const query = graphql`
  query {
    allCloudinaryMedia {
      nodes {
        gatsbyImageData(width: 300, placeholder: BLURRED)
      }
    }
  }
`;
```

## 🔌 Pugin Options

### `cloudName` (required)

Cloud name of your Cloudinary account, can be obtained from your [Cloudinary console](https://cloudinary.com/console/).
**Type:** String
**Required:** ✅ Yes
**Default:** n/a
**Note:** This should be stored and retrieved as an environment variable.

### `apiKey` (required)

API Key of your Cloudinary account, can be obtained from your [Cloudinary console](https://cloudinary.com/console/).
**Type:** String
**Default:** n/a
**Note:** This should be stored and retrieved as an environment variable.

### `apiSecret` (required)

API Secret of your Cloudinary account, can be obtained from your [Cloudinary console](https://cloudinary.com/console/).
**Type:** String
**Default:** n/a
**Note:** This should be stored and retrieved as an environment variable.

### `resourceType`

The _resource_ types to include when pulling data from Cloudinary.

**Type:** String
**Default:** `image`
**Valid:** `image`, `raw` and `video`
**Note:** Use the video resource type for all video resources as well as for audio files, such as .mp3.

### `type`

The _storage_ types to include when pulling data from Cloudinary.

**Type:** String
**Default:** n/a
**Valid:** `upload`, `private`, `authenticated`, `facebook`, `twitter`, `gplus`, `instagram_name`, `gravatar`, `youtube`, `hulu`, `vimeo`, `animoto`, `worldstarhiphop` and `dailymotion`
**Note:** When non given, all types are sourced.

### `maxResults`

Max number of resources to return.

**Type:** Integer
**Default:** `10`

### `tags`

If true, includes the list of tag names assigned to each resource.

**Type:** Boolean
**Default:** `false`

### `prefix`

Find all resources with a public ID that starts with the given prefix. The resources are sorted by public ID in the response.

**Type:** String
**Default:** n/a
**Note:** Can be used to source only media files from a specific folder. However, you will need to specify both `type` and `resourceType` in the config options.

### `context`

Specifies if the context data for the image should be returned. This is useful for retrieving alt text or custom metadata in key:value pairs for an image set on Cloudinary.

**Type:** String
**Default:** n/a

## ⚠️ Gotchas

- Gatsby pulls the data from Cloudinary when it builds; a rebuild is therefore needed whenever new media files are added to the Cloudinary account.
- `f_auto` and `q_auto` Cloudinary transformations are applied automatically to the `secure_url` value. This optimizes the delivered media quality and format.

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

## 📚 Other Resources

- [Cloudinary image transformation reference](https://cloudinary.com/documentation/image_transformation_reference)

## 🏴‍☠️ Contribute

Want to contribute to making the plugin even better? Feel free to send in issues and pull requests on feature requests, fixes, bugs, typos, performance lapses, or any other challenge faced with using our plugin.
