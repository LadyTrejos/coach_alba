import React from "react";

import AboutMe from "../comps/AboutMe";
import Gallery from "../comps/Gallery";
import DemoBlog from "../comps/DemoBlog";
import Footer from "../comps/Footer";
import Home from "../comps/Home";

class Index extends React.Component {
  render() {
    return (
      <div>
        <div id="home" className="pt-5">
          <Home />
        </div>

        <div id="about-me" className="pt-5">
          <AboutMe />
        </div>

        <div id="gallery" className="pt-5">
          <Gallery />
        </div>
        <div id="blog" className="pt-5">
          <DemoBlog />
        </div>

        <div id="contact" className="pt-5">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Index;
