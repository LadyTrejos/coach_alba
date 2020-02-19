import React from "react";
import { BackTop } from "antd";

import styles from "../styles/styles.scss";
import Login from "../comps/Login";
import Register from "../comps/Register";

export default function Ingresar() {
  return (
    <div>
      <BackTop />
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
