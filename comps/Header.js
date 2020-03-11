import React, { useState } from "react";
import { Button } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Text from "antd/lib/typography/Text";

import { logoutUser } from "../utils/auth";
import styles from "../styles/header.scss";

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
      fixed="top"
      className={styles.header}
    >
      <Navbar.Brand href="/#home">
        <img
          alt=""
          src="/static/logoAlba.png"
          width="80"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className={styles.navlink} href="/#home">
            Inicio
          </Nav.Link>
          <Nav.Link className={styles.navlink} href="/#about-me">
            Sobre mí
          </Nav.Link>
          <Nav.Link className={styles.navlink} href="/#gallery">
            Galería
          </Nav.Link>
          <Nav.Link className={styles.navlink} href="/#demo_blog">
            Blog
          </Nav.Link>
          <Nav.Link className={styles.navlink} href="/#contact">
            Contacto
          </Nav.Link>
          {user.id ? (
            //Auth Navigation
            <React.Fragment>
              <Nav.Link className={styles.navlink} href="/programs">
                Programas
              </Nav.Link>
            </React.Fragment>
          ) : null}
          {/* {user.is_admin ? (
            <Nav.Link className={styles.navlink} href="/users">
              Usuarios
            </Nav.Link>
          ) : null} */}
        </Nav>
        <Nav>
          <Text className={styles.signature}>Coach Alba Nury</Text>
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
