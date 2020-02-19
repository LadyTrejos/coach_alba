import React from "react";
import Router from "next/router";
import { Form, Input, Icon, Tooltip, Button, Alert } from "antd";

import styles from "../styles/styles.scss";
import api from "../api";

class Component_login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: "",
        password: ""
      },

      errors: null
    };
    this.errorsRef = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const userData = JSON.stringify(this.state.login);
        console.log("UserData: ", userData);
        api
          .post(`/rest-auth/login/`, userData, {
            headers: { "Content-type": "application/json" }
          })

          .then(res => {
            console.log("res: ", res);
            let userInfo = res.data.user;
            Router.push("/");
          })
          .catch(err => {
            this.setState(
              {
                errors: err
              },
              () => {
                console.log("err: ", err);
              }
            );
          });
        // this.props.onAuth(values.email, values.password);
      }
    });
  };

  noSpaces = word => {
    return word.replace(/\s/g, "");
  };

  onClose() {
    this.setState({
      errors: null
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("Errors --> ", this.state.errors);

    return (
      <Form
        className={`${styles.login_container}`}
        onSubmit={this.handleSubmit}
      >
        <h3>Inicio de sesión</h3>
        {this.state.errors ? (
          <Alert
            message="Correo electrónico y/o contraseña incorrecto(a)"
            type="error"
            closable
            onClose={() => this.onClose()}
          />
        ) : null}

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
