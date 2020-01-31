import React from "react";
import { Link as LinkScroll, Element } from "react-scroll";

import Head from "next/head";

class Index extends React.Component {
  render() {
    return (
      <div>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          key="bootstrap"
        />
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Header></Header>

        <div id="home" style={{ paddingTop: "10vh" }}>
          <Home />
        </div>
        <div id="about-me">
          <AboutMe />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="demoBlog">
          <DemoBlog />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Index;
