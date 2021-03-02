import React from "react";
import { Link } from "gatsby";

import styles from "./post-preview.module.css";

function PostPreview({ post }) {
  return (
    <div className={styles.preview}>
      <h3 className={styles.previewTitle}>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h3>
      <small>{post.createdAt}</small>
      <div className={styles.summary}>
        <p
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  );
}
export default PostPreview;
