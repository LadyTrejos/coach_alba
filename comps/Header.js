import React from "react";
import Link from "next/link";
import { Link as LinkScroll, Element } from "react-scroll";

const linkStyle = {
  marginRight: 15
};

class Header extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <a class="navbar-brand" href="#">
          Logo
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#home">
                Inicio <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about-me">
                Sobre mí
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#gallery">
                Galería
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#demoBlog">
                Blog
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#contact">
                Contacto
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <a
              style={{
                background: "#fff",
                border: "2px solid #fff",
                borderRadius: "5px",
                color: "blue",
                margin: "0 8px",
                padding: "5px 10px"
              }}
              href="/RegisterLogin"
            >
              Inicia sesión / Regístrate
            </a>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
