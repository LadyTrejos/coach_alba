import React, { useState } from "react";
import { Form, Input, Icon, Tooltip, Button, Alert, Row } from "antd";

import styles from "../styles/styles.scss";
import { loginUser } from "../utils/auth";

function LoginComponent(props) {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;

  function handleSubmit(event) {
    event.preventDefault();

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);
        loginUser(values.email, values.password);
      }
    });
  }

  function noSpaces(e) {
    const newWord = e.target.value.replace(/\s/g, "");
    return newWord;
  }

  function onClose() {
    setErrors(null);
  }

  return (
    <div className={styles.loginContainer}>
      <Form onSubmit={handleSubmit}>
        <h3>Inicio de sesión</h3>
        {errors ? (
          <Alert
            message="Correo electrónico y/o contraseña incorrecto(a)"
            type="error"
            closable
            onClose={() => onClose()}
          />
        ) : null}

        <Form.Item label="Correo electrónico" hasFeedback>
          {getFieldDecorator("email", {
            getValueFromEvent: noSpaces,
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
          })(<Input placeholder="Correo electrónico" size="large" />)}
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
            />
          )}
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className={styles.btnSubmit}
          loading={loading}
        >
          Iniciar sesión
        </Button>

        <div className="form-group">
          <a href="/password-reset" className={styles.ForgetPwd}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </Form>
    </div>
  );
}

const Login = Form.create({ name: "login" })(LoginComponent);
export default Login;
