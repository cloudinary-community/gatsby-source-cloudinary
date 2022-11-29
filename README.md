# Gatsby Source Cloudinary

Pull data from your Cloudinary account into the Gatsby data layer with `gatsby-source-cloudinary`:

- 📥 Creates a `CloudinaryMedia` node for each media file found based on your configuration.

Use together with [`gatsby-transformer-cloudinary`](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/) to:

- 🖼️ Add [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) support to the sourced `CloudinaryMedia` nodes.
- 📤 Upload local images and remote images to [Cloudinary](https://cloudinary.com/) from within your Gatsby project.

&nbsp;

## 📖 Table of Contents

- [🚀 Getting Started](#🚀-getting-started)
  - [Install Package](#install-package)
  - [Configure Plugin](#configure-plugin)
  - [Example usage](#example-usage)
- [🖼️ Use with Gatsby Image](#🖼️-use-with-gatsby-plugin-image)
  - [Install Packages](#install-packages)
  - [Configure Plugins](#configure-plugins)
  - [Example usage](#example-usage)
- [🔌 Pugin Options](#🔌-plugin-options)
- [⚠️ Gotchas](#⚠️-gotchas)
- [📚 Other Resources](#📚-other-resources)
- [🏴‍☠️ Contribute](#🏴‍☠️-contribute)

&nbsp;

## 🚀 Getting Started

### Install Package

```bash
npm install gatsby-source-cloudinary
```

or

```bash
yarn add gatsby-source-cloudinary
```

### Configure Plugin

Add `gatsby-source-cloudinary` to the plugin array in your `gatsby-config.js` file.

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        // resourceType: `image`,
        // type: `twitter`,
        // maxResults: 22,
        // tags: true,
        // context: true,
        // prefix: `demo/animals`
      },
    },
  ],
};
```

`process.env` ⁉️ Read about [env variables in the Gatsby docs](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/).

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

&nbsp;

## 🖼️ Use with Gatsby Plugin Image

To add support for [`gatsby-plugin-image`](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) you'll need the [`gatsby-transformer-cloudinary`](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/) plugin.

### Install Packages

```bash
npm install gatsby-transformer-cloudinary gatsby-plugin-image
```

or

```bash
yarn add gatsby-transformer-cloudinary gatsby-plugin-image
```

### Configure Plugins

```js
// File: ./gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        // resourceType: `image`,
        // type: `twitter`,
        // maxResults: 22,
        // tags: true,
        // context: true,
        // prefix: `demo/animals`
      },
    },
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        // Add the `gatsbyImageData` resolver to `CloudinaryMedia`
        transformTypes: [`CloudinaryMedia`],
      },
    },
    `gatsby-plugin-image`,
  ],
};
```

Check the [`gatsby-plugin-image` docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) and [`gatsby-transformer-cloudinary` docs](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/) to learn more.

### Example usage

```jsx
// File: ./pages/images.js

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

&nbsp;

## 🔌 Plugin Options

### `cloudName` (required)

You'll find your Cloudinary account's `cloudName` in your [Cloudinary console](https://cloudinary.com/console/).

**Type:** String\
**Default:** n/a\
**Note:** Store and retrieve your `cloudName` as [an environment variable](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/).

### `apiKey` (required)

The API Key of your Cloudinary account. You'll find it in your [Cloudinary console](https://cloudinary.com/console/).

**Type:** String\
**Default:** n/a\
**Note:** Store and retrieve your `apiKey` as [an environment variable](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/).

### `apiSecret` (required)

The API Secret of your Cloudinary account. You'll find it in your [Cloudinary console](https://cloudinary.com/console/).

**Type:** String\
**Default:** n/a\
**Note:** Store and retrieve your `apiSecret` as [an environment variable](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/).

### `resourceType`

The _resource_ types to include when pulling data from Cloudinary.

**Type:** String\
**Default:** `image`\
**Valid:** `image`, `raw` and `video`\
**Note:** Use the video `resourceType` for all video and audio files, such as `.mp3` and `.mp4`.

### `type`

The _storage_ types to include when pulling data from your Cloudinary account.

**Type:** String\
**Default:** n/a\
**Valid:** `upload`, `private`, `authenticated`, `facebook`, `twitter`, `gplus`, `instagram_name`, `gravatar`, `youtube`, `hulu`, `vimeo`, `animoto`, `worldstarhiphop` and `dailymotion`\
**Note:** When not given, all types are sourced.

### `maxResults`

Max number of resources to return.

**Type:** Integer\
**Default:** `10`

### `tags`

When `true`, includes the list of tag names assigned to each resource.

**Type:** Boolean\
**Default:** `false`

### `prefix`

Find all resources with a public ID that starts with the given `prefix` sorted by public ID in the response.

**Type:** String\
**Default:** n/a\
**Note:** Can be used to source only media files from a specific folder. However, you will need to specify both `type` and `resourceType` in the config options.

### `context`

When `true`, includes the context data assigned to each resource. Helpful in retrieving alt text or custom metadata configured for the media file in Cloudinary.

**Type:** String\
**Default:** n/a

&nbsp;

## ⚠️ Gotchas

- Gatsby pulls the data from Cloudinary when it builds; you need to trigger a rebuild whenever new media files are added to the Cloudinary account.
- `f_auto` and `q_auto` Cloudinary transformations are applied automatically to the `secure_url` value optimizing the delivered media quality and format.

&nbsp;

## 📚 Other Resources

- [Cloudinary image transformation reference](https://cloudinary.com/documentation/image_transformation_reference)

&nbsp;

## 🏴‍☠️ Contribute

You may improve the documentation, help fellow users, report bugs, suggest enhancements, contribute code and more.

Get started by reading the [contribution docs](https://github.com/cloudinary-devs/gatsby-source-cloudinary/blob/main/CONTRIBUTING.md).
