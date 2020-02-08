import React from "react";
import styles from "../styles/styles.scss";

import Router from "next/router";
import api from "../api";
import { Form, Input, Icon, Tooltip, Button } from "antd";

class Component_login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: "",
        password: ""
      },

      loginError: {
        emailError: "",
        passwordError: ""
      },

      isLoginPasswordVisible: "password",

      eyeLoginPassword: "fa fa-eye-slash icon",

      errors: null
    };
    this.errorsRef = React.createRef();
  }

  viewLoginPassword() {
    if (this.state.isLoginPasswordVisible == "password") {
      this.setState({
        isLoginPasswordVisible: "text",
        eyeLoginPassword: "fa fa-eye icon"
      });
    } else {
      this.setState({
        isLoginPasswordVisible: "password",
        eyeLoginPassword: "fa fa-eye-slash"
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    console.log("hola: ", event);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password);
      }
    });
  };

  noSpaces = word => {
    console.log("noSpaces");
    return word.replace(/\s/g, "");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        className={`${styles.login_container}`}
        onSubmit={this.handleSubmit}
      >
        <h3>Inicio de sesión</h3>

        <Form.Item label="Correo electrónico" hasFeedback>
          {getFieldDecorator("name", {
            rules: [
              {
                type: "email",
                pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                message:
                  "Ingresa tu correo electrónico con el siguiente formato: nombre@ejemplo.com",
                whitespace: true
              },
              {
                required: true,
                message: "Ingresa tu correo electrónico"
              }
              // {validator:this.handleSearch, validationTrigger:'onBlur'}
            ]
          })(
            <Input
              placeholder="Correo electrónico"
              size="large"
              onChange={e => {
                this.setState({
                  login: {
                    ...this.state.login,
                    email: this.noSpaces(e.target.value)
                  }
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Contraseña&nbsp;
              <Tooltip title="Utiliza al menos 6 caracteres">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          hasFeedback
        >
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Ingresa tu contraseña",
                whitespace: true
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              size="large"
              placeholder="Contraseña"
              onChange={e => {
                this.setState({
                  login: {
                    ...this.state.login,
                    password: e.target.value
                  }
                });
              }}
            />
          )}
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className={styles.btnSubmit}
        >
          Iniciar sesión
        </Button>

        <div className="form-group">
          <a href="#" className={styles.ForgetPwd}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </Form>
    );
  }
}

const Login = Form.create({ name: "login" })(Component_login);
export default Login;
