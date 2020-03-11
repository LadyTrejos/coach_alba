import React from "react";
import styles from "../styles/styles.scss";
import Router from "next/router";
import CountrySelector from "../comps/CountrySelector";
import api from "../api";
import Cookies from "js-cookie";
import {
  Select,
  Form,
  Alert,
  Input,
  Icon,
  Tooltip,
  Button,
  Checkbox
} from "antd";
import NumericInput from "../comps/NumericInput";

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};

class Component_register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      register: {
        name: "",
        email: "",
        phone: null,
        id_phone: 57,

        country: "",
        state: "",
        city: "",

        password1: "",
        password2: ""
      },

      registerError: {
        locationError: ""
      },

      checkBoxValidate: false,
      checkBoxValidateSubmit: "",
      counter: 0,
      phonecodeItems: [],
      errorsRegister: null
    };
    this.countryRef = React.createRef();
    this.errors = React.createRef();
  }

  componentDidMount() {
    const selector = this.countryRef.current;
    this.setState({
      phonecodeItems: selector.state.phonecodeItems
    });
  }

  validateRegister = selector => {
    if (
      selector.state.country == "" ||
      selector.state.state == "" ||
      selector.state.city == ""
    ) {
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    this.selector = this.countryRef.current;
    const { country, state, city } = this.selector.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log("values: ", values);
        this.setState(
          {
            register: {
              ...this.state.register,
              country,
              state,
              city
            }
          },
          () => {
            const userData = JSON.stringify(this.state.register);
            const csrftoken = Cookies.get("csrftoken");
            console.log("userData: ", userData);

            api
              .post(`/rest-auth/registration/`, userData, {
                headers: {
                  "Content-type": "application/json",
                  "X-CSRFToken": csrftoken
                }
              })

              .then(() => {
                Router.push("/");
              })
              .catch(err => {
                let errorsRegister = err.response.data.errors.map(item => {
                  var [key, value] = Object.entries(item)[0];
                  return value;
                });
                console.log("ErrorsRegister: ", errorsRegister);
                this.setState(
                  {
                    ...this.state,
                    errorsRegister
                  },
                  () =>
                    this.errors.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    })
                );
              });
          }
        );
      }
    });
  };

  noSpaces = word => {
    return word.replace(/\s/g, "");
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Las contraseñas no coinciden.");
    } else {
      callback();
    }
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleChange = e => {
    this.setState(
      {
        checkNick: e.target.checked
      },
      () => {
        this.props.form.validateFields(["nickname"], { force: true });
      }
    );
  };

  validatePrivacyCheck = (rule, value, callback) => {
    if (value) {
      callback();
    } else {
      callback("Acepta la política de privacidad");
    }
  };
  validateResidence = (rule, value, callback) => {
    const selector = this.countryRef.current;
    console.log("rule: ", rule, " ,value: ", value);

    if (
      selector.state.city === "" ||
      selector.state.state === "" ||
      selector.state.city === ""
    ) {
      callback("Selecciona tu lugar de residencia.");
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator("id_phone", {
      initialValue: "57",
      rules: [{ required: true, message: "Ingresa indicativo" }]
    })(
      <Select
        showSearch
        size="large"
        style={{ minWidth: "5vw" }}
        onChange={value =>
          this.setState({
            register: { ...this.state.register, id_phone: parseInt(value) }
          })
        }
      >
        {this.state.phonecodeItems}
      </Select>
    );

    return (
      <Form
        className={`${styles.login_container}`}
        onSubmit={this.handleSubmit}
      >
        <h3 ref={this.errors}>Registro</h3>

        <Form.Item
          label={
            <span>
              Nombre&nbsp;
              <Tooltip title="Utiliza al menos 3 caracteres y solo usa letras">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          hasFeedback
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Ingresa tu nombre"
              },
              {
                pattern: /^(?=.{3,100}$)([a-zA-ZäáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ]+[\s(?!\s)]?)*[a-zA-ZäáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ]$/,

                message:
                  "Ingresa un nombre mayor a tres caracteres y sin números"
              }
            ]
          })(
            <Input
              placeholder="Nombre"
              size="large"
              onChange={e => {
                this.setState({
                  register: {
                    ...this.state.register,
                    name: e.target.value
                  }
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item label="Correo electrónico" hasFeedback>
          {getFieldDecorator("email", {
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
            ]
          })(
            <Input
              placeholder="Correo electrónico"
              size="large"
              onChange={e => {
                this.setState({
                  register: {
                    ...this.state.register,
                    email: this.noSpaces(e.target.value)
                  },
                  errorsRegister: null
                });
              }}
            />
          )}
          {this.state.errorsRegister ? (
            <div style={{ color: "red" }}>{this.state.errorsRegister}</div>
          ) : null}
        </Form.Item>
        <div className="container">
          <div className="row">
            <Form.Item
              className={`col-md-3 col-sm-1`}
              label="Indicativo"
              hasFeedback
            >
              {prefixSelector}
            </Form.Item>
            <Form.Item
              className={`col-md-9 col-sm-11 `}
              label="Número celular"
              hasFeedback
            >
              {getFieldDecorator("phone", {
                rules: [
                  { required: true, message: "Ingresa tu número de celular" },
                  {
                    pattern: /^[0-9]{10}$/gi,
                    message: "El número debe contener 10 dígitos"
                  }
                ]
              })(
                <NumericInput
                  size="large"
                  onChange={value =>
                    this.setState({
                      register: {
                        ...this.state.register,
                        phone: parseInt(value, 10)
                      }
                    })
                  }
                  placeholder="Ej: 1234567890"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    borderRadius: 10
                  }}
                />
              )}
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Lugar de residencia">
          <CountrySelector ref={this.countryRef}></CountrySelector>
        </Form.Item>

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
          {getFieldDecorator("password", {
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
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Ingresa la confirmación de contraseña"
              },

              { validator: this.compareToFirstPassword }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          {getFieldDecorator("agreement", {
            valuePropName: "checked",
            rules: [{ validator: this.validatePrivacyCheck }]
          })(
            <Checkbox style={{ color: "#000" }}>
              Acepto la{" "}
              <a
                href="/PrivacyPolicy"
                style={{ color: "#5CE707", fontWeight: "bold" }}
                target="_blank"
              >
                política de privacidad
              </a>
            </Checkbox>
          )}
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className={styles.btnSubmit}
        >
          Registrarme
        </Button>
      </Form>
    );
  }
}

const Register = Form.create({ name: "register" })(Component_register);
export default Register;
