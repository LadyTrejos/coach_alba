import React from "react";
import { Button } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header(props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
    >
      <Navbar.Brand href="/#home">
        <img
          alt=""
          src="/fb.ico"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Alba Nury
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
        </Nav>
        <Nav>
          <Button href="/ingresar">Inicia sesión / Regístrate</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
