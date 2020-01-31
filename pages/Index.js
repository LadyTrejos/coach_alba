import Header from "../comps/Header";
import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import DemoBlog from "../comps/DemoBlog";
import Footer from "../comps/Footer";
import Home from "../comps/Home";

import React from "react";
import { Link as LinkScroll, Element } from "react-scroll";

export default function Index() {
  return (
    <div>
      <Header></Header>
      <Element name="home" className="element">
        <div style={{ height: "20vh" }}></div>
        <Home />
      </Element>
      <div style={{ height: "750px" }}></div>
      <Element name="sobre_mi" className="element">
        <div style={{ height: "20vh" }}></div>
        <AboutMe />
      </Element>
      <div style={{ height: "750px" }}></div>
      <Element name="galeria" className="element">
        <div style={{ height: "20vh" }}></div>
        <Gallery />
      </Element>
      <div style={{ height: "750px" }}></div>
      <Element name="blog" className="element">
        <div style={{ height: "20vh" }}></div>
        <DemoBlog />
      </Element>
      <div style={{ height: "750px" }}></div>
      <Element name="contacto" className="element">
        <div style={{ height: "20vh" }}></div>
        <Footer />
      </Element>
    </div>
  );
}
