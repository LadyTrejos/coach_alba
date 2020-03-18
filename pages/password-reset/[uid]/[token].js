import React, { useState } from "react";
import { Form, Icon, Input, Button, notification, Tooltip } from "antd";
import Header from "../../../comps/Header";
import Router from "next/router";
import api from "../../../api";
import styles from "../../../styles/styles.scss";
import Cookies from "js-cookie";
import { authInitialProps } from "../../../utils/auth";
import { useRouter } from "next/router";

function PasswordResetForm(props) {
  const { user = {} } = props.auth || {};
  const { getFieldDecorator } = props.form;
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        const newData = JSON.stringify({
          new_password1: values.new_password1,
          new_password2: values.new_password2,
          uid: router.query.uid,
          token: router.query.token
        });
        const csrftoken = Cookies.get("csrftoken");
        api
          .post(`/rest-auth/password/reset/confirm/`, newData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })
          .then(res => {
            props.form.resetFields();
            notification.success({
              message: "Contraseña restablecida",
              description: "La contraseña se ha actualizado correctamente.",
              duration: 0
            });
            Router.push("/ingresar");
          })
          .catch(err => console.log(err.message));
      }
    });
  }

  function noSpaces(word) {
    return word.replace(/\s/g, "");
  }

  function compareToFirstPassword(rule, value, callback) {
    const { form } = props;
    if (value && value !== form.getFieldValue("new_password1")) {
      callback("Las contraseñas no coinciden.");
    } else {
      callback();
    }
  }

  function validateToNextPassword(rule, value, callback) {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["new_password2"], { force: true });
    }
    callback();
  }

  function handleConfirmBlur(e) {
    const { value } = e.target;

    let result = confirmDirty || !!value;
    setConfirmDirty(result);
  }

  return (
    <div className="row">
      <Header user={user} />
      <div className={`offset-md-3 col-md-6 ${styles.container}`}>
        <div className="row">
          <div className={`col-md-12 ${styles.login_form}`}>
            <Form
              className={`${styles.login_container}`}
              onSubmit={e => handleSubmit(e)}
            >
              <h3>Restaurar contraseña</h3>
              <Form.Item
                label={
                  <span>
                    Contraseña&nbsp;
                    <Tooltip title="Utiliza al menos 8 caracteres">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
                hasFeedback
              >
                {getFieldDecorator("new_password1", {
                  rules: [
                    {
                      required: true,
                      pattern: /^[a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ!@#\$%\^&\*\?]{8,100}$/,
                      message: "Contraseña no válida.",
                      whitespace: true
                    },

                    { validator: validateToNextPassword }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    size="large"
                    placeholder="Contraseña"
                    onChange={e => {
                      setPassword1(noSpaces(e.target.value));
                    }}
                  />
                )}
              </Form.Item>

              <Form.Item label="Confirmar contraseña" hasFeedback>
                {getFieldDecorator("new_password2", {
                  rules: [
                    {
                      required: true,
                      message: "Ingresa la confirmación de contraseña"
                    },

                    { validator: compareToFirstPassword }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    size="large"
                    placeholder="Contraseña"
                    onChange={e => {
                      setPassword2(noSpaces(e.target.value));
                    }}
                    onBlur={e => handleConfirmBlur(e)}
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
                  Guardar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

PasswordResetForm.getInitialProps = async ctx => {
  const { auth } = authInitialProps(false)(false)(ctx);
  return { auth };
};

const PasswordReset = Form.create({ name: "password_reset_form" })(
  PasswordResetForm
);

export default PasswordReset;
