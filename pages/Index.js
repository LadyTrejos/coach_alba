import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { BackTop, Button, Row, Col } from "antd";

import Header from "../comps/Header";
import Home from "../comps/Home";
import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import PostList from "../comps/PostList";
import Footer from "../comps/Footer";
import styles from "../styles/styles.scss";
import api from "../api";
import { authInitialProps } from "../utils/auth";

function Index(props) {
  const { user = {} } = props.auth || {};
  const { data } = props;
  const [loading, setLoading] = useState(false);

  function toBlog() {
    setLoading(true);
    Router.push("/blog");
  }

  return (
    <div>
      <Header user={user} />
      <BackTop />
      <div id="home" style={{ paddingTop: "50px" }}>
        <Home />
      </div>

      <div id="about-me">
        <AboutMe />
      </div>

      <div id="gallery" style={{ paddingTop: "75px" }}>
        <Gallery />
      </div>

      <div id="demo_blog" style={{ paddingTop: "75px" }}>
        <Link href="/blog">
          <h1 className={styles.sectionTitle}>
            <a>Blog</a>
          </h1>
        </Link>
        <PostList post={data} demo={true} pagination={false} user={user} />

        <Row justify="center" type="flex">
          <Col>
            <Button
              onClick={() => toBlog()}
              className={styles.defaultButton}
              loading={loading}
            >
              Ver más publicaciones
            </Button>
          </Col>
        </Row>
      </div>

      <div id="contact" style={{ paddingTop: "75px" }}>
        <Footer />
      </div>
    </div>
  );
}

Index.getInitialProps = async ctx => {
  const { auth } = authInitialProps(false)(false)(ctx);
  const res = await api.get(`/api/post/?ordering=-created_at`);
  return { auth, data: res.data };
};

export default Index;
