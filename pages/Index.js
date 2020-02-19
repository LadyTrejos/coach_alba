import React from "react";

import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import DemoBlog from "../comps/DemoBlog";
import Footer from "../comps/Footer";
import Home from "../comps/Home";
import styles from "../styles/styles.scss";

import { BackTop, Button, Row, Col } from "antd";

import { ThemeContext, User_info } from "../comps/Contex";
//Cambiar por la consulta a la base de datos
let a = [
  { title: "title_1", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_2", src: "image.png", description: "blablablalbaljdkfas" },
  { title: "title_3", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_4", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_5", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_6", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_7", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_8", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_9", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_10", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_11", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_12", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_13", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_14", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_15", src: "image.png", description: "blablablalbaljdkfas" }
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
          <DemoBlog post={a} demo={true} pagination={false} />
          <Row justify="center" type="flex">
            <Col>
              <Button href="/blog" type="primary">
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
}

Index.contextType = ThemeContext;

export default Index;
