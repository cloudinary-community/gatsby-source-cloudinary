import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function GasbyImagePage({ data }) {
  return (
    <main>
      {data.allCloudinaryMedia.nodes.map((media, index) => {
        const image = getImage(media);
        return (
          <GatsbyImage
            key={index}
            alt={media.context?.custom?.alt}
            image={image}
          />
        );
      })}
    </main>
  );
}

export const query = graphql`
  query {
    allCloudinaryMedia {
      nodes {
        gatsbyImageData(width: 300, placeholder: BLURRED)
        context {
          custom {
            alt
          }
        }
      }
    }
  }
`;
