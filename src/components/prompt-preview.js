import React from "react";
import { Link } from "gatsby";

import styles from "./prompt-preview.module.css";

export default ({ prompt }) => (
  <div className={styles.preview}>
    <h3 className={styles.previewTitle}>
      <Link to={`/prompt/${prompt.slug}`}>{prompt.hashtag}</Link>
    </h3>
    <small>{prompt.createdAt}</small>
  </div>
);
