import React from "react";
import styles from "../styles/styles.scss";
import Head from "next/head";
import Header from "../comps/Header";
import Router from "next/router";
import CountrySelector from "../comps/CountrySelector";
import api from "../api";
import { Select, Form } from "antd";
import NumericInput from "../comps/NumericInput";

class Register_login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: "",
        password: ""
      },
      register: {
        name: "",
        email: "",
        phone: "",
        idPhone: "",
        location: {
          country: "",
          state: "",
          city: ""
        },
        password: "",
        confirmPassword: ""
      },

      loginError: {
        emailError: "",
        passwordError: ""
      },
      registerError: {
        nameError: "",
        emailError: "",
        phoneError: "",
        locationError: "",
        passwordError: "",
        confirmPasswordError: ""
      },

      isPasswordVisible: "password",
      isConfirmationPasswordVisible: "password",
      isLoginPasswordVisible: "password",
      eye: "fa fa-eye-slash icon",
      eyeConfirmationPassword: "fa fa-eye-slash icon",
      eyeLoginPassword: "fa fa-eye-slash icon",
      checkBoxValidate: false,
      checkBoxValidateSubmit: "",
      counter: 0,
      phonecodeItems: []
    };
    this.countryRef = React.createRef();
  }

  componentDidMount() {
    const selector = this.countryRef.current;
    console.log("selector: ", selector.state);
    this.setState({
      phonecodeItems: selector.state.phonecodeItems
    });
  }

  viewPassword() {
    if (this.state.isPasswordVisible == "password") {
      this.setState({
        isPasswordVisible: "text",
        eye: "fa fa-eye icon"
      });
    } else {
      this.setState({
        isPasswordVisible: "password",
        eye: "fa fa-eye-slash"
      });
    }
  }

  viewConfirmationPassword() {
    if (this.state.isConfirmationPasswordVisible == "password") {
      this.setState({
        isConfirmationPasswordVisible: "text",
        eyeConfirmationPassword: "fa fa-eye icon"
      });
    } else {
      this.setState({
        isConfirmationPasswordVisible: "password",
        eyeConfirmationPassword: "fa fa-eye-slash"
      });
    }
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

  validateLogin = () => {
    let emailError = "";
    let passwordError = "";
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regx.test(this.state.login.email)) {
      emailError = "Correo electrónico no válido";
    }

    if (this.state.login.password == "") {
      passwordError = "la contraseña no puede ser vacía";
    }

    if (emailError || passwordError) {
      this.setState({
        loginError: {
          ...this.state.loginError,
          emailError,
          passwordError
        }
      });
      return false;
    }

    return true;
  };

  validateRegister = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let locationError = "";
    let passwordError = "";
    let checkBoxValidateSubmit = "";

    let regxName = /^(?=.{3,25}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z._]+(?<![_.])$/;
    if (!regxName.test(this.state.register.name)) {
      nameError = "Nombre no válido";
      if (this.state.register.name.length < 3) {
        nameError = nameError + ", debe contener mínimo tres letras";
      }
    }

    let regxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regxEmail.test(this.state.register.email)) {
      emailError = "Correo electrónico no válido";
    }

    if (this.state.register.password.length < 6) {
      passwordError = "La contraseña debe contener al menos 6 caracteres";
    }

    if (!this.state.checkBoxValidate) {
      checkBoxValidateSubmit = "Debes aceptar la política de privacidad";
    }
    if (
      !this.state.register.location.country ||
      !this.state.register.location.state ||
      !this.state.register.location.city
    ) {
      locationError = "Lugar de residencia incompleto";
    }
    if (
      nameError ||
      emailError ||
      passwordError ||
      checkBoxValidateSubmit ||
      locationError
    ) {
      this.setState({
        registerError: {
          ...this.state.registerError,
          nameError,
          emailError,
          phoneError,
          locationError,
          passwordError
        },
        checkBoxValidateSubmit
      });
      return false;
    }

    return true;
  };

  OnClickLogin(event) {
    event.preventDefault();
    const isValid = this.validateLogin();
    if (isValid) {
      this.setState({
        loginError: {
          ...this.state.loginError,
          passwordError: "",
          emailError: ""
        }
      });
      Router.push("/");
    }
  }

  OnClickRegister(event) {
    event.preventDefault();

    this.selector = this.countryRef.current;
    const { country, state, city } = this.selector.state;
    this.setState(
      {
        register: {
          ...this.state.register,
          location: { country, state, city }
        }
      },
      () => {
        const isValid = this.validateRegister();
        if (isValid && this.state.checkBoxValidate) {
          this.setState({
            registerError: {
              ...this.state.registerError,
              nameError: "",
              emailError: "",
              phoneError: "",
              locationError: "",
              passwordError: ""
            },
            checkBoxValidateSubmit: ""
          });
          const userData = JSON.stringify(this.state.register);
          console.log("userData: ", userData);

          api
            .post(`/api/users/register`, userData, {
              headers: { "Content-type": "application/json" }
            })

            .catch(err => {})
            .then(() => {
              Router.push("/");
            });
        }
      }
    );
  }

  noSpaces = word => {
    return word.replace(/\s/g, "");
  };

  checkBox = () => {
    this.state.checkBoxValidate
      ? this.setState({ checkBoxValidate: false })
      : this.setState({ checkBoxValidate: true });

    this.state.counter == 0
      ? this.setState({ counter: 1 })
      : this.setState({ counter: 0 });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "Indicativo",
      rules: [{ required: true, message: "Ingresa indicativo" }]
    })(
      <Select
        showSearch
        size="large"
        style={{ minWidth: "10vw" }}
        onChange={value =>
          this.setState({
            register: { ...this.state.register, idPhone: value }
          })
        }
      >
        {this.state.phonecodeItems}
      </Select>
    );
    console.log(this.state.register);
    return (
      <header className={styles.header_ingresar}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            key="bootstrap"
          />
          <link
            href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          />
        </Head>
        <Header></Header>
        <div></div>

        <Form
          className={`container ${styles.login_container}`}
          onSubmit={this.handleSubmit}
        >
          <div className="row">
            <div className={`col-md-6 ${styles.login_form_1}`}>
              <h3>Inicio de sesión</h3>
              <form>
                <label>Correo electrónico *:</label>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control `}
                    value={this.state.login.email}
                    placeholder="Correo electrónico"
                    onChange={e => {
                      this.setState({
                        login: {
                          ...this.state.login,
                          email: this.noSpaces(e.target.value)
                        }
                      });
                    }}
                  />
                  {this.state.loginError.emailError ? (
                    <div className={styles.errorTextColorLogin}>
                      {this.state.loginError.emailError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label>Contraseña *:</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={this.state.isLoginPasswordVisible}
                      data-toggle="password"
                      placeholder="Contraseña"
                      onChange={e => {
                        this.setState({
                          login: {
                            ...this.state.login,
                            password: this.noSpaces(e.target.value)
                          }
                        });
                      }}
                    />
                    <a
                      onClick={e => this.viewLoginPassword(e)}
                      className="input-group-append"
                    >
                      <div className="input-group-text">
                        <i className={`${this.state.eyeLoginPassword} `}></i>
                      </div>
                    </a>
                  </div>

                  {this.state.loginError.passwordError ? (
                    <div className={styles.errorTextColorLogin}>
                      {this.state.loginError.passwordError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <button
                    onClick={ev => this.OnClickLogin(ev)}
                    className={styles.btnSubmit}
                  >
                    Iniciar sesión
                  </button>
                </div>
                <div className="form-group">
                  <a href="#" className={styles.ForgetPwd}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
            <div className={`col-md-6 ${styles.login_form_2}`}>
              <h3>Registro</h3>
              <form>
                <div className="form-group">
                  <label>Nombre *:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    onChange={e => {
                      this.setState({
                        register: {
                          ...this.state.register,
                          name: e.target.value
                        }
                      });
                    }}
                  />
                  {this.state.registerError.nameError ? (
                    <div className={styles.errorTextColorRegister}>
                      {this.state.registerError.nameError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label>Correo electrónico *:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.register.email}
                    placeholder="Correo electrónico"
                    onChange={e => {
                      this.setState({
                        register: {
                          ...this.state.register,
                          email: this.noSpaces(e.target.value)
                        }
                      });
                    }}
                  />
                  {this.state.registerError.emailError ? (
                    <div className={styles.errorTextColorRegister}>
                      {this.state.registerError.emailError}
                    </div>
                  ) : null}
                </div>
                <Form.Item label="Número de celular *" className="form-group">
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        pattern: /^[0-9]{10}$/gi,
                        message: "El número debe contener 10 dígitos"
                      }
                    ]
                  })(
                    <NumericInput
                      size="large"
                      addonBefore={prefixSelector}
                      onChange={value =>
                        this.setState({
                          register: { ...this.state.register, phone: value }
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
                <div className="form-group">
                  <label>Lugar de residencia *:</label>
                  <CountrySelector ref={this.countryRef}></CountrySelector>
                  {this.state.registerError.locationError ? (
                    <div className={styles.errorTextColorRegister}>
                      {this.state.registerError.locationError}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>Contraseña *:</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={this.state.isPasswordVisible}
                      data-toggle="password"
                      placeholder="Contraseña"
                      onChange={e => {
                        this.setState({
                          register: {
                            ...this.state.register,
                            password: this.noSpaces(e.target.value)
                          }
                        });
                      }}
                    />
                    <a
                      onClick={e => this.viewPassword(e)}
                      className="input-group-append"
                    >
                      <div className="input-group-text">
                        <i className={`${this.state.eye} `}></i>
                      </div>
                    </a>
                  </div>
                  {this.state.registerError.passwordError ? (
                    <div className={styles.errorTextColorRegister}>
                      {this.state.registerError.passwordError}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>Confirmar contraseña *:</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={this.state.isConfirmationPasswordVisible}
                      data-toggle="password"
                      placeholder="Confirmar contraseña"
                      onChange={e => {
                        this.setState({
                          register: {
                            ...this.state.register,
                            confirmPassword: this.noSpaces(e.target.value)
                          }
                        });
                      }}
                    />
                    <a
                      onClick={e => this.viewConfirmationPassword(e)}
                      className="input-group-append"
                    >
                      <div className="input-group-text">
                        <i
                          className={`${this.state.eyeConfirmationPassword} `}
                        ></i>
                      </div>
                    </a>
                  </div>

                  {this.state.register.password.length >= 1 ? (
                    this.state.register.confirmPassword !==
                    this.state.register.password ? (
                      <div className={styles.errorTextColorRegister}>
                        Las contraseñas no coinciden
                      </div>
                    ) : null
                  ) : null}
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onClick={e => this.checkBox(e)}
                  />

                  <label className="form-check-label" htmlFor="exampleCheck1">
                    <p>
                      Acepto
                      <a
                        style={{ color: "#5CE707", fontWeight: "bold" }}
                        href="/"
                      >
                        política de privacidad
                      </a>
                    </p>
                  </label>
                </div>
                {this.state.checkBoxValidateSubmit &&
                this.state.counter == 0 ? (
                  <div className={styles.errorTextColorRegister}>
                    {this.state.checkBoxValidateSubmit}
                  </div>
                ) : null}
                <div className="form-group">
                  <button
                    onClick={ev => this.OnClickRegister(ev)}
                    className={styles.btnSubmit}
                  >
                    Registrarme
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Form>
      </header>
    );
  }
}

const RegisterLogin = Form.create({ name: "register" })(Register_login);
export default RegisterLogin;
