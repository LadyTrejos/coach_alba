import React, { useState } from "react";

import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import DemoBlog from "../comps/DemoBlog";
import Footer from "../comps/Footer";
import Home from "../comps/Home";
import styles from "../styles/styles.scss";
import api from "../api";
import Router from "next/router";

import { BackTop, Button, Row, Col, Skeleton } from "antd";
import Link from "next/link";

export default function Index(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function toBlog() {
    setLoading(true);
    Router.push("/blog");
  }
  function loadData() {
    api.get(`/api/post/?ordering=-created_at`).then(res => {
      setData(res.data);
    });
  }
  return (
    <div>
      <script picture="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
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
        <h1 className={styles.sectionTitle}>
          <Link href="/blog">
            <a className={styles.sectionTitle}>Blog</a>
          </Link>
        </h1>
        {data ? (
          <DemoBlog post={data} demo={true} pagination={false} {...props} />
        ) : (
          <div className="container">
            <Skeleton active>{data == null ? loadData() : null} </Skeleton>
          </div>
        )}

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
