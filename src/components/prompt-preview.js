import React from "react";
import { Link } from "gatsby";
import { ArrowRight } from "./icons";
import * as styles from "./prompt-preview.module.css";

export default ({ prompt }) => (
  <Link to={`/prompt/${prompt.slug}`} className={styles.preview}>
    <h3 className={styles.previewTitle}>{prompt.hashtag}</h3>
    <ArrowRight />
  </Link>
);
