import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Layout from "../components/layout";

function PromptTemplate(props) {
  const prompt = props.data.contentfulPrompt;
  const siteTitle = props.data.site.siteMetadata.title;
  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <Helmet title={`${prompt.title} | ${siteTitle}`} />
        <div className="wrapper">
          <h1 className="section-headline">{prompt.title}</h1>
          <p
            style={{
              display: "block",
            }}
          >
            {prompt.pseudo}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: prompt.body.childMarkdownRemark.html,
            }}
          />
        </div>
        <div className="article-list">
          {prompt.post.map((post) => (
            <div key={post.slug}>{post.title}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default PromptTemplate;

export const pageQuery = graphql`
  query PromptBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPrompt(slug: { eq: $slug }) {
      title
      hashtag
      body {
        childMarkdownRemark {
          html
        }
      }
      post {
        title
        slug
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
