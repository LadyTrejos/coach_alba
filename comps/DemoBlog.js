import React from "react";
import styles from "../styles/styles.scss";
import PostPreview from "./PostPreview";

export default function Blog() {
  return (
    <div className="container-fluid">
      <h1 className={styles.sectionTitle}>Blog</h1>
      <div className="row align-items-center">
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <PostPreview></PostPreview>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <PostPreview></PostPreview>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <PostPreview></PostPreview>
        </div>
      </div>
      <div className="row justify-content-center pt-3">
        <div className="col-12 col-sm-10 col-md-4 col-lg-3 col-xl-3">
          <a className="btn btn-info btn-block">Ver más publicaciones</a>
        </div>
      </div>
    </div>
  );
}
