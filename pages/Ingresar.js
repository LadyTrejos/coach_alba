import styles from "../styles/styles.scss";
import Head from "next/head";
import Header from "../comps/Header";

class RegisterLogin extends React.Component {
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
        </Head>
        <Header></Header>
        <div></div>

        <div className={`container ${styles.login_container}`}>
          <div className="row">
            <div className={`col-md-6 ${styles.login_form_1}`}>
              <h3>Inicio de sesión</h3>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className={styles.btnSubmit}
                    value="Iniciar sesión"
                  />
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
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Celular"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lugar de residencia"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar contraseña"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className={styles.btnSubmit}
                    value="Registrarme"
                  />
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
