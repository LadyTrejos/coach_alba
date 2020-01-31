import React from "react";
import Link from "next/link";
import { Link as LinkScroll, Element } from "react-scroll";

const linkStyle = {
  marginRight: 15
};

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Inicio
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="sobre_mi"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Sobre mí
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="galeria"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Galería
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="blog"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Blog
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="contacto"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Contacto
              </LinkScroll>
            </li>
          </ul>

          <Link href="/login">
            <button>Ingresar / Registrarse</button>
          </Link>
        </nav>
        <style jsx>
          {`
            button {
              background: #3f98e6;
              color: #fff;
              border: 3px solid #3f98e6;
              border-radius: 1px;
              padding: 0.3rem 1rem;
              font: 1.2rem "Poppins", sans-serif;
              outline: none;
              cursor: pointer;
              position: relative;
              transition: 0.2s ease-in-out;
              font-family: "Delius";
              letter-spacing: 1px;
              float: right;
            }
            header {
              color: #fff;
              background: #5ac6c6; /* fallback for old browsers */
              padding: 15px;
              text-align: center;
              position: fixed;
              top: 0;
              height: 7vh;
              width: 95vw;
              z-index: 99;
              marging-top: 10vh;
            }
            nav {
              background: none;
              height: 100px;
              width: 100%;
            }
            nav li {
              display: inline-block;
              color: black;
              cursor: pointer;
              text-decoration: none;
              text-align: center;
              padding: 7px 10px;
              font-family: "Delius";
              font-size: 1.1rem;
            }

            nav ul {
              float: left;
            }
          `}
        </style>
      </header>
    );
  }
}

export default Header;
