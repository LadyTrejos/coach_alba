import styles from "../styles/styles.scss";
import Head from "next/head";
import Header from "../comps/Header";
import Router from "next/router";

class RegisterLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: "",
        password: "",
        emailError: "",
        passwordError: ""
      },
      register: {
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        nameError: "",
        emailError: "",
        phoneError: "",
        addressError: "",
        passwordError: "",
        confirmPasswordError: ""
      },

      isPasswordVisible: "password",
      eye: "fa fa-eye-slash icon"
    };
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
        login: {
          ...this.state.login,
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
    let addressError = "";
    let passwordError = "";
    let confirmPasswordError = "";
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

    if (nameError || emailError || passwordError) {
      this.setState({
        register: {
          ...this.state.register,
          nameError,
          emailError,
          phoneError,
          addressError,
          passwordError
        }
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
        login: {
          ...this.state.login,
          passwordError: "",
          emailError: ""
        }
      });
      Router.push("/");
    }
  }

  OnClickRegister(event) {
    event.preventDefault();
    const isValid = this.validateRegister();
    if (isValid) {
      this.setState({
        register: {
          ...this.state.register,
          nameError: "",
          emailError: "",
          phoneError: "",
          addressError: "",
          passwordError: ""
        }
      });
      Router.push("/");
    }
  }

  noSpaces = word => {
    return word.replace(/\s/g, "");
  };
  render() {
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
          <link rel="stylesheet" href="style.css" />
          <script type="text/javascript" src="script.js"></script>
        </Head>
        <Header></Header>
        <div></div>

        <div
          className={`container ${styles.login_container}`}
          onSubmit={this.handleSubmit}
        >
          <div className="row">
            <div className={`col-md-6 ${styles.login_form_1}`}>
              <h3>Inicio de sesión</h3>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
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
                  {this.state.login.emailError ? (
                    <div
                      style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                    >
                      {this.state.login.emailError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={this.state.login.password}
                    className="form-control"
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

                  {this.state.login.passwordError ? (
                    <div
                      style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                    >
                      {this.state.login.passwordError}
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
                  {this.state.register.nameError ? (
                    <div
                      style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                    >
                      {this.state.register.nameError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
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
                  {this.state.register.emailError ? (
                    <div
                      style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                    >
                      {this.state.register.emailError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Celular"
                    onChange={e => {
                      this.setState({
                        register: {
                          ...this.state.register,
                          phone: e.target.value
                        }
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lugar de residencia"
                    onChange={e => {
                      this.setState({
                        register: {
                          ...this.state.register,
                          address: e.target.value
                        }
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={this.state.isPasswordVisible}
                      data-toggle="password"
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
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    value={this.state.register.confirmPassword}
                    className="form-control"
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
                  {this.state.register.password.length >= 1 ? (
                    this.state.register.confirmPassword !==
                    this.state.register.password ? (
                      <div
                        style={{
                          color: "red",
                          fontSize: 12,
                          fontWeight: "bold"
                        }}
                      >
                        Las contraseñas no coinciden
                      </div>
                    ) : null
                  ) : null}
                </div>
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
        </div>
      </header>
    );
  }
}
export default RegisterLogin;
