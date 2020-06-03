import React, { useState } from "react";
import { BackTop, Row } from "antd";

import PostList from "../comps/PostList";
import api from "../api";
import styles from "../styles/styles.scss";
import { authInitialProps } from "../utils/auth";
import Header from "../comps/Header";

function Blog(props) {
  const { user = {} } = props.auth || {};
  return (
    <div className="container-fluid">
      <Header user={user} />
      <BackTop />
      <Row justify="center" type="flex" style={{ paddingTop: "20px" }}>
        <h1 className={styles.sectionTitle}>Blog</h1>
      </Row>
      <PostList post={props.data} demo={false} pagination={true} user={user} />
    </div>
  );
}

Blog.getInitialProps = async ctx => {
  const { auth } = authInitialProps(false)(false)(ctx);
  const res = await api.get(`/api/post/?ordering=-created_at`);
  return { auth, data: res.data };
};

export default Blog;
