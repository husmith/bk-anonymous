import React, { useState } from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import PromptPreview from "../components/prompt-preview";
import PostPreview from "../components/post-preview";

function RootIndex(props) {
  const siteTitle = props.data.site.siteMetadata.title;
  const posts = props.data.allContentfulPost.edges;
  const prompts = props.data.allContentfulPrompt.edges;

  return (
    <Layout location={props.location}>
      <Helmet title={siteTitle} />

      <div className="wrapper">
        <section className="section">
          <div className="section-header border-bottom">Prompts</div>
          <ul className="prompt-list">
            {prompts.map(({ node }) => (
              <div key={node.slug}>
                <PromptPreview prompt={node} />
              </div>
            ))}
          </ul>
        </section>
        <section className="section">
          <div className="section-header border-bottom">Recent Submissions</div>
          <ul className="article-list">
            {posts.map(({ node }) => (
              <div key={node.slug} className="article-item">
                <PostPreview post={node} />
              </div>
            ))}
          </ul>
        </section>
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
    allContentfulPost(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          slug
          title
          createdAt(formatString: "MM.DD.yyyy")
          hashtag {
            hashtag
          }
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
