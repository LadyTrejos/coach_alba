import React from "react";
import styles from "../styles/styles.scss";
import PostPreview from "./PostPreview";

export default class DemoBlog extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className={styles.title}>Blog</h1>
        <div className="row align-items-center">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <PostPreview></PostPreview>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <PostPreview></PostPreview>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <PostPreview></PostPreview>
          </div>
        </div>
        <div className="row justify-content-center pt-3">
          <div className="col-3">
            <button className="btn btn-info btn-block">
              Ver más publicaciones
            </button>
          </div>
        </div>
      </div>
    );
  }
}
