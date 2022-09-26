import * as React from 'react';
import { graphql, Link } from 'gatsby';

export default function NotFoundPage({ data }) {
  return (
    <main style={{ fontFamily: 'monospace', textAlign: 'center' }}>
      <h1>{data.site.siteMetadata.title}</h1>

      <h2>404: Not Found</h2>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">Go home</Link>
    </main>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
