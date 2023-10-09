import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function IndexPage({ data }) {
  return (
    <main style={{ fontFamily: 'monospace', textAlign: 'center' }}>
      <h1>{data.site.siteMetadata.title}</h1>

      <table style={{ margin: '0 auto' }}>
        <colgroup>
          <col style={{ width: '20%', backgroundColor: 'ghostwhite' }} />
          <col
            span="4"
            style={{
              width: '20%',
              backgroundColor: 'floralwhite',
            }}
          />
        </colgroup>

        <tr>
          <th>gatsby-source-cloudinary</th>
          <th colSpan={5}>
            gatsby-source-cloudinary + gatsby-transformer-cloudinary +
            gatsby-plugin-image
          </th>
        </tr>

        <tr>
          <th>Plain</th>
          <th>Grayscle</th>
          <th>Tint</th>
          <th>Ken Burns</th>
          <th>Plain</th>
        </tr>

        {data.allCloudinaryMedia.nodes.map((media) => {
          const { secure_url, context } = media;
          const example1Image = getImage(media.example1ImageData);
          const example2Image = getImage(media.example2ImageData);
          const example3Image = getImage(media.example3ImageData);
          const gatsbyImage = getImage(media);
          const alt = context?.custom?.alt;

          return (
            <tr>
              <td>
                <img
                  width="300"
                  style={{ maxWidth: '100%', display: 'block' }}
                  src={secure_url}
                  alt={alt}
                />
              </td>
              <td>
                <GatsbyImage
                  style={{ maxWidth: '100%' }}
                  image={example1Image}
                  alt={alt}
                />
              </td>
              <td>
                <GatsbyImage image={example2Image} alt={alt} />
              </td>
              <td>
                <GatsbyImage image={example3Image} alt={alt} />
              </td>
              <td>
                <GatsbyImage image={gatsbyImage} alt={alt} />
              </td>
            </tr>
          );
        })}
      </table>
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
    allCloudinaryMedia {
      nodes {
        secure_url
        gatsbyImageData(width: 300, placeholder: BLURRED)
        example1ImageData: gatsbyImageData(
          width: 300
          transformations: ["e_grayscale"]
          placeholder: TRACED_SVG
        )
        example2ImageData: gatsbyImageData(
          width: 300
          transformations: ["e_tint:equalize:80:blue:blueviolet"]
          backgroundColor: "PaleTurquoise"
        )
        example3ImageData: gatsbyImageData(
          width: 300
          transformations: ["e_zoompan"]
          chained: ["e_loop", "f_gif"]
          backgroundColor: "Lavender"
        )
        context {
          custom {
            alt
          }
        }
      }
    }
  }
`;
