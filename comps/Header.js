import React, { useState } from "react";
import { Button } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Text from "antd/lib/typography/Text";
import { logoutUser } from "../utils/auth";
import styles from "../styles/styles.scss";

function Header(props) {
  const { user } = props;
  const [loading, setLoading] = useState(false);

  function logoutUserFunct() {
    setLoading(true);
    logoutUser();
  }
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
          {/* {user.id ? (
            //Auth Navigation
            <React.Fragment>
              <Nav.Link href="/programs">Programas</Nav.Link>
            </React.Fragment>
          ) : null}
          {user.is_admin ? <Nav.Link href="/users">Usuarios</Nav.Link> : null} */}
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
          {user.id ? (
            <React.Fragment>
              <Button onClick={() => logoutUserFunct()} loading={loading}>
                Cerrar sesión
              </Button>
            </React.Fragment>
          ) : null
          /* <Button href="/ingresar" className={styles.defaultButton}>Inicia sesión / Regístrate</Button> */
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
