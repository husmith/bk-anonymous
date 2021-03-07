import React from "react";
import { Link } from "gatsby";

import styles from "./post-preview.module.css";

function PostPreview({ post }) {
  return (
    <Link to={`/post/${post.slug}`} className={styles.card}>
      <article className={styles.article}>
        <small>{post.hashtag?.hashtag}</small>
        <h3 className={styles.previewTitle}>{post.title}</h3>
        <small>{post.createdAt}</small>
        {post.body && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        )}
      </article>
    </Link>
  );
}
export default PostPreview;
