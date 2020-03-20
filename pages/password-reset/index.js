import React, { useState } from "react";
import api from "../../api";
import Router from "next/router";
import styles from "../../styles/styles.scss";
import Cookies from "js-cookie";
import { authInitialProps } from "../../utils/auth";
import { Form, Icon, Input, Button, notification, Row, Typography } from "antd";

import Header from "../../comps/Header";

const { Text, Title } = Typography;

function ForgotPasswordForm(props) {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const { user = {} } = props.auth || {};

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const csrftoken = Cookies.get("csrftoken");
    props.form.validateFields((err, values) => {
      if (!err) {
        api
          .post(`/rest-auth/password/reset/`, JSON.stringify(values), {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })
          .then(res => {
            props.form.resetFields();
            notification.info({
              message: "Las instrucciones se han enviado",
              description:
                "Revisa tu correo electrónico y sigue las instrucciones para restablecer tu contraseña.",
              duration: 10,
              top: 80
            });
            setLoading(false);
            Router.push("/ingresar");
          })
          .catch(err => {
            console.log(err.message);
            notification.error({
              message: "Correo electrónico no registrado",
              description:
                "El correo que ingresaste no se encuentra registrado, revisa si está escrito correctamente.",
              duration: 5,
              top: 80
            });
            setLoading(false);
          });
      }
    });
  }

  return (
    <div className="container">
      <Header user={user} />
      <div className="row">
        <div
          className={`offset-1 offset-md-3 col-md-6 col-10 ${styles.container}`}
        >
          <div className="row">
            <div className={`col-md-12 ${styles.login_form}`}>
              <Form onSubmit={e => handleSubmit(e)}>
                <Row justify="center" type="flex">
                  <Title> Recuperar contraseña </Title>
                </Row>
                <Row>
                  <Text>
                    Ingresa el correo electrónico que tienes registrado y te
                    enviaré las instrucciones para recuperar el acceso a tu
                    cuenta
                  </Text>
                </Row>
                <Form.Item label="Correo electrónico: ">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Ingresa tu correo electrónico"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Correo electrónico"
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ForgotPasswordForm.getInitialProps = async ctx => {
  const { auth } = authInitialProps(false)(false)(ctx);

  return { auth };
};

const ForgotPassword = Form.create({ name: "forgot_password_form" })(
  ForgotPasswordForm
);

export default ForgotPassword;
