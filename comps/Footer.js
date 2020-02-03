import styles from "../styles/styles.scss";

export default function Footer() {
  return (
    <footer className={`row justify-content-center ${styles.footer}`}>
      <div className="col-sm-6 col-md-8 col-lg-8 col-xl-6">
        <a href="https://web.whatsapp.com">
          <i
            class="fa fa-whatsapp"
            aria-hidden="true"
            data-text="Whatsapp"
            style={{
              fontSize: "5vh",
              textAlign: "center",
              margin: "20px",
              color: "#fff"
            }}
          ></i>
        </a>
        <a href="https://www.facebook.com">
          <i
            class="fa fa-facebook"
            aria-hidden="true"
            data-text="Facebook"
            style={{
              fontSize: "5vh",
              textAlign: "center",
              margin: "20px",
              color: "#fff"
            }}
          ></i>
        </a>
        <a href="https://www.instagram.com">
          <i
            class="fa fa-instagram"
            aria-hidden="true"
            data-text="Instagram"
            style={{
              fontSize: "5vh",
              textAlign: "center",
              margin: "20px",
              color: "#fff"
            }}
          ></i>
        </a>
      </div>
      <div className="col-sm-5 col-md-3 col-lg-3 col-xl-3">
        Cr 12 cs 45 Pereira
        <br />
        +57 321456789
        <br />
        example@gmail.com
      </div>
    </footer>
  );
}
