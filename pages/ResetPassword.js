import React from "react";
import { Form, Icon, Input, Button, notification, Tooltip } from "antd";
import Router from "next/router";
import api from "../api";
import styles from "../styles/styles.scss";
import Cookies from "js-cookie";

class ResetPasswordForm extends React.Component {
  state = {
    email: "",
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });

        const newData = JSON.stringify({
          new_password1: values.new_password1,
          new_password2: values.new_password2,
          uid: this.props.match.params.uid,
          token: this.props.match.params.token
        });
        console.log(newData);
        const csrftoken = Cookies.get("csrftoken");
        api
          .post(`/rest-auth/password/reset/confirm/`, newData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })
          .then(res => {
            this.props.form.resetFields();
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
  };

  noSpaces = word => {
    return word.replace(/\s/g, "");
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("new_password1")) {
      callback("Las contraseñas no coinciden.");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["new_password2"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="row">
        <div className={`offset-md-3 col-md-6 ${styles.container}`}>
          <div className="row">
            <div className={`col-md-12 ${styles.login_form}`}>
              <Form
                className={`${styles.login_container}`}
                onSubmit={this.handleSubmit}
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

                      { validator: this.validateToNextPassword }
                    ]
                  })(
                    <Input.Password
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      size="large"
                      placeholder="Contraseña"
                      onChange={e => {
                        this.setState({
                          register: {
                            ...this.state.register,
                            password1: this.noSpaces(e.target.value)
                          }
                        });
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

                      { validator: this.compareToFirstPassword }
                    ]
                  })(
                    <Input.Password
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      size="large"
                      placeholder="Contraseña"
                      onChange={e => {
                        this.setState({
                          register: {
                            ...this.state.register,
                            password2: this.noSpaces(e.target.value)
                          }
                        });
                      }}
                      onBlur={this.handleConfirmBlur}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={this.state.loading}
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
}

const ResetPassword = Form.create({ name: "reset_password_form" })(
  ResetPasswordForm
);

export default ResetPassword;
