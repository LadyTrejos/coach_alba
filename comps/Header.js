import React from "react";
import { Button } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Text from "antd/lib/typography/Text";

function Header(props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      sticky="top"
      style={{ backgroundColor: "rgba(35, 53, 192, 0.9)" }}
    >
      <Navbar.Brand href="/#home">
        <img
          alt=""
          src="/logoAlba.png"
          width="80"
          height="50"
          className="d-inline-block align-top"
        />{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/#home">Inicio</Nav.Link>
          <Nav.Link href="/#about-me">Sobre mí</Nav.Link>
          <Nav.Link href="/#gallery">Galería</Nav.Link>
          <Nav.Link href="/#demo_blog">Blog</Nav.Link>
          <Nav.Link href="/#contact">Contacto</Nav.Link>
          <Nav.Link href="/users">Usuarios</Nav.Link>
          <Nav.Link href="/programs">Programas</Nav.Link>
        </Nav>
        <Nav>
          <Text
            style={{
              paddingRight: "5rem",
              fontFamily: "Shadows Into Light",
              fontSize: "1.5rem",
              color: "rgba(255, 255, 255, 0.9)"
            }}
          >
            Coach Alba Nury
          </Text>
          {/* <Button href="/ingresar">Inicia sesión / Regístrate</Button> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
