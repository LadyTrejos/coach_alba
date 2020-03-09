import React, { useState } from "react";

import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import DemoBlog from "../comps/DemoBlog";
import Footer from "../comps/Footer";
import Home from "../comps/Home";
import styles from "../styles/styles.scss";
import api from "../api";

import { BackTop, Button, Row, Col, Skeleton } from "antd";

export default function Index() {
  const [data, setData] = useState(null);
  function loadData() {
    api.get(`/api/post/?ordering=-created_at`).then(res => {
      console.log("Blog res: ", res.data);
      setData(res.data);
    });
  }
  return (
    <div>
      <script picture="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
      <BackTop />
      <div id="home" className="pt-5">
        <Home />
      </div>

      <div id="about-me" className="pt-5">
        <AboutMe />
      </div>

      <div id="gallery" className="pt-5">
        <Gallery />
      </div>

      <div id="demo_blog" className="pt-5">
        <h1 className={styles.sectionTitle}>
          <a href="/blog">Blog</a>
        </h1>
        {data ? (
          <DemoBlog post={data} demo={true} pagination={false} />
        ) : (
          <div className="container">
            <Skeleton active>{data == null ? loadData() : null} </Skeleton>
          </div>
        )}

        <Row justify="center" type="flex">
          <Col>
            <Button href="/blog" className={styles.defaultButton}>
              Ver más publicaciones
            </Button>
          </Col>
        </Row>
      </div>

      <div id="contact" className="pt-5">
        <Footer />
      </div>
    </div>
  );
}
