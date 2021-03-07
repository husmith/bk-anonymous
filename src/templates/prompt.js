import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styles from "./prompt.module.css";
import Layout from "../components/layout";
import PostPreview from "../components/post-preview";

function PromptTemplate(props) {
  const prompt = props.data.contentfulPrompt;
  const siteTitle = props.data.site.siteMetadata.title;
  return (
    <Layout location={props.location}>
      <Helmet title={`${prompt.title} | ${siteTitle}`} />
      <div className="wrapper">
        <div className={styles.prompt}>
          <h1 className={styles.title}>{prompt.title}</h1>
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
          {prompt.post?.length &&
            prompt.post.map((post) => (
              <div key={post.slug} className="article-item">
                <PostPreview post={post} />
              </div>
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
        createdAt(formatString: "MM.DD.yyyy")
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
