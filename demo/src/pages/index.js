import * as React from 'react';
import { graphql } from 'gatsby';

export default function IndexPage({ data }) {
  return (
    <main>
      {data.allCloudinaryMedia.nodes.map(({ secure_url }) => (
        <img
          style={{ margin: '1em' }}
          width="300"
          src={secure_url}
          alt={'no alt :('}
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
      }
    }
  }
`;
