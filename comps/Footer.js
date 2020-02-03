import styles from "../styles/styles.scss";

export default function Footer() {
  return (
    <footer className={`row justify-content-center ${styles.footer}`}>
      <div className="col-12 col-sm-2 col-md-6 col-lg-5 col-xl-5 ">
        <div className="row justify-content-center">
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
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
          </div>
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
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
          </div>
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
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
        </div>
      </div>
      <div className="col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2 text-center">
        <h6>Contacto</h6>
        Cr 12 cs 45 Pereira <br />
        +57 321456789 <br />
        example@gmail.com
      </div>
    </footer>
  );
}
