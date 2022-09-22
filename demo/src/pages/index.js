import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function IndexPage({ data }) {
  return (
    <main>
      {data.allCloudinaryMedia.nodes.map((media) => {
        const { secure_url } = media;
        const gatsbyImage = getImage(media);
        const example1Image = getImage(media.example1ImageData);
        const example2Image = getImage(media.example2ImageData);
        const example3Image = getImage(media.example3ImageData);

        return (
          <div>
            <img width="300" src={secure_url} alt="no alt :(" />
            <GatsbyImage image={gatsbyImage} alt="no alt" />
            <GatsbyImage image={example1Image} alt="no alt" />
            <GatsbyImage image={example2Image} alt="no alt" />
            <GatsbyImage image={example3Image} alt="no alt" />
          </div>
        );
      })}
    </main>
  );
}

export const query = graphql`
  query {
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
      }
    }
  }
`;
