import React from "react";

import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import DemoBlog from "../comps/DemoBlog";
import Footer from "../comps/Footer";
import Home from "../comps/Home";
import styles from "../styles/styles.scss";

import Link from "next/link";
import Router from "next/router";

import { BackTop, Button, Row, Col } from "antd";

import { ThemeContext, User_info } from "../comps/Contex";
let a = [
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" },
  { src: "tatiana.png" }
];

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: User_info.name
    };
  }
  render() {
    let user = this.context;
    console.log("user: ", this.state.user);
    console.log("Index props: ", this.props);

    return (
      <div>
        <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
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
          <h1 className={styles.sectionTitle}>Blog</h1>
          <DemoBlog post={a} demo={true} />
          <Row justify="center" type="flex">
            <Col>
              <Button>
                <Link
                  href={{
                    pathname: "/blog",
                    query: {
                      object: JSON.stringify(a)
                    }
                  }}
                >
                  Ver más publicaciones
                </Link>
              </Button>
            </Col>
          </Row>
        </div>

        <div id="contact" className="pt-5">
          <Footer />
        </div>

        <div style={{ backgroundColor: "#0fb" }}>{user.name}</div>
      </div>
    );
  }
}

Index.contextType = ThemeContext;

export default Index;
