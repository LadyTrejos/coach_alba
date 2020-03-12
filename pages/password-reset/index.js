import React from "react";
import api from "../../api";
import Router from "next/router";
import styles from "../../styles/styles.scss";
import Cookies from "js-cookie";
import { Form, Icon, Input, Button, notification, Row, Typography } from "antd";

const { Text, Title } = Typography;

function ForgotPasswordForm(props) {
  const { getFieldDecorator } = props.form;

  function handleSubmit(e) {
    e.preventDefault();
    const csrftoken = Cookies.get("csrftoken");
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
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
                "Revise su correo electrónico y siga las instrucciones para restablecer su contraseña. Si no recibe el correo, asegúrese de que el correo ingresado es correcto y se encuentra registrado en nuestra página.",
              duration: 0
            });
            Router.push("/ingresar");
          })
          .catch(err => console.log(err.message));
      }
    });
  }

  return (
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
                  enviaré las instrucciones para recuperar el acceso a tu cuenta
                </Text>
              </Row>
              <Form.Item label="Correo electrónico: ">
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Ingresa tu correo electrónico" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Correo electrónico"
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

const ForgotPassword = Form.create({ name: "forgot_password_form" })(
  ForgotPasswordForm
);

export default ForgotPassword;
