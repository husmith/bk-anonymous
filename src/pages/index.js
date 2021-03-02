import React, { useState } from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import PromptPreview from "../components/prompt-preview";

function RootIndex(props) {
  console.log(props);
  const siteTitle = props.data.site.siteMetadata.title;
  const posts = props.data.allContentfulBlogPost.edges;
  const prompts = props.data.allContentfulPrompt.edges;

  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />

        <div className="wrapper">
          <ul className="article-list">
            {prompts.map(({ node }) => (
              <div key={node.slug}>
                <PromptPreview prompt={node} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default RootIndex;

export const pageQuery = graphql`
  query RootQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPrompt(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          slug
          hashtag
        }
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
