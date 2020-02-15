import React from "react";
import styles from "../styles/styles.scss";
import api from "../api";
import { Form, BackTop } from "antd";
import Login from "../comps/Login";
import Register from "../comps/Register";

class Register_login extends React.Component {
  render() {
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
}

const RegisterLogin = Form.create({ name: "register" })(Register_login);
export default RegisterLogin;
