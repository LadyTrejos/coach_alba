import React from "react";
import { BackTop, Col, Row } from "antd";

import styles from "../styles/styles.scss";
import Login from "../comps/Login";
import Register from "../comps/Register";
import Header from "../comps/Header";
import { authInitialProps } from "../utils/auth";

function Ingresar({ auth }) {
  const { user = {} } = auth || {};
  return (
    <div>
      <Header user={user} />
      <BackTop />
      {/* quitar esto cuando sea necesario registrarse*/}
      {/* <div className={`offset-md-3 col-md-7 ${styles.container}`}>
        <div className="row">
          <div className={styles.login_form}>
            <Row justify="center" type="flex">
              <Col xs={20} sm={20} md={15} lg={10} xl={10} xxl={8}>
                <Login></Login>
              </Col>
            </Row>
          </div>
        </div>
      </div> */}
      
      {/* //activar esto cuando sea necesario registrarse */}
      <div className="row">
        <div className={`col-md-6 ${styles.container}`}>
          <div className="row">
            <div className={`col-md-12 ${styles.login_form}`}>
              <Login></Login>
            </div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.container}`}>
          <div className="row">
            <div className={`col-md-12 ${styles.register_form}`}>
              <Register></Register>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Ingresar.getInitialProps = async ctx => {
  const { auth } = authInitialProps(false)(false)(ctx);
  return { auth };
};

export default Ingresar;
