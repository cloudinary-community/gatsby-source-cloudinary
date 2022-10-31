import React from 'react';
import { graphql } from 'gatsby';

export default function BasicPage({ data }) {
  return (
    <main>
      {data.allCloudinaryMedia.nodes.map((media, index) => (
        <img
          key={index}
          alt={media.context?.custom?.alt}
          width="200px"
          src={media.secure_url}
        />
      ))}
    </main>
  );
}

export const query = graphql`
  query {
    allCloudinaryMedia {
      nodes {
        secure_url
        context {
          custom {
            alt
          }
        }
      }
    }
  }
`;
