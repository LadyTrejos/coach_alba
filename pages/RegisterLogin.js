import styles from "../styles/styles.scss";
import Head from "next/head";
import Header from "../comps/Header";

class RegisterLogin extends React.Component {
  render() {
    return (
      <footer>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            key="bootstrap"
          />
        </Head>
        <div class="row align-items-center">
          <div class="col-6">Login</div>
          <div class="col-6">Registro</div>
        </div>
      </footer>
    );
  }
}
export default RegisterLogin;
