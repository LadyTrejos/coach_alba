import React, { useState } from "react";
import { Form, Input, Icon, Tooltip, Button, Alert } from "antd";
import Router from "next/router";
import styles from "../styles/styles.scss";
import api from "../api";
import Cookies from "js-cookie";

function LoginComponent(props) {
  const [errors, setErrors] = useState(null);
  const { getFieldDecorator } = props.form;

  function handleSubmit(event) {
    event.preventDefault();

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const userData = JSON.stringify(values);
        const csrftoken = Cookies.get("csrftoken");
        api
          .post(`/rest-auth/login/`, userData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })
          .then(res => {
            const token = res.data.key;
            const userId = res.data.user.id;
            const isAdmin = res.data.user.is_admin;
            localStorage.setItem("token", token);
            localStorage.setItem("id", userId);
            localStorage.setItem("role", isAdmin);
            Router.push("/");
          })
          .catch(err => {
            setErrors(err);
          });
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
    <Form className={`${styles.login_container}`} onSubmit={handleSubmit}>
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

const Login = Form.create({ name: "login" })(LoginComponent);
export default Login;
