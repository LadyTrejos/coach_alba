import styles from "../styles/styles.scss";
import Head from "next/head";
import Header from "../comps/Header";

class RegisterLogin extends React.Component {
  render() {
    return (
      <header>
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

        <div className="overlay"></div>
        <video
          playsInline="playsinline"
          autoPlay="autoplay"
          loop="loop"
          poster="/video.jpg"
          muted
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div class="container">
          <div class="row">
            <div class="col-md-6 login-form-1">
              <h3 style={{ textAlign: "center" }}>Inicio de sesión</h3>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btnSubmit"
                    value="Iniciar sesión"
                  />
                </div>
                <div class="form-group">
                  <a href="#" class="ForgetPwd">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
            <div class="col-md-6 login-form-2">
              <h3 style={{ textAlign: "center" }}>Registro</h3>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nombre"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Correo electrónico"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Celular"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Lugar de residencia"
                    value=""
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirmar contraseña"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Registrarme" />
                </div>
                <div class="form-group">
                  <a href="#" class="ForgetPwd" value="Login">
                    ¿Olvidaste tu contraseña?
                  </a>
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
