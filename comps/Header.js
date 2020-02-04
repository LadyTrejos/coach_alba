import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <a className="navbar-brand" href="#">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#home">
                Inicio <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about-me">
                Sobre mí
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gallery">
                Galería
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#blog">
                Blog
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contacto
              </a>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            <a
              style={{
                background: "#fff",
                border: "2px solid #fff",
                borderRadius: "5px",
                color: "blue",
                margin: "0 8px",
                padding: "5px 10px",
                textDecoration: "none"
              }}
              href="/ingresar"
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
