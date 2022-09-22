require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Source Cloudinary Starter`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-image`,
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        context: true,
        maxResults: 10,
        prefix: process.env.CLOUDINARY_SOURCE_PREFIX,
      },
    },
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        transformTypes: ['CloudinaryMedia'],
      },
    },
  ],
};
