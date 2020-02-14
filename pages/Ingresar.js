import React from "react";
import { Form } from "antd";
import styles from "../styles/styles.scss";
import api from "../api";
import Login from "../comps/Login";
import Register from "../comps/Register";

class Register_login extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className={`col-md-6 ${styles.login_form_3}`}>
            <div className="row">
              <div className={`col-md-12 ${styles.login_form_1}`}>
                <Login></Login>
              </div>
            </div>
          </div>

          <div className={`col-md-6 ${styles.login_form_3}`}>
            <div className="row">
              <div className={`col-md-12 ${styles.login_form_2}`}>
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
