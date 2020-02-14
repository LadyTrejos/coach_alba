import styles from "../styles/styles.scss";

export default function Footer() {
  return (
    <footer className={`container-fluid ${styles.footer}`}>
      <div className={`row justify-content-center ${styles.contact}`}>
        <div className="col-12 col-sm-2 col-md-6 col-lg-5 col-xl-5 ">
          <div className="row justify-content-center">
            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <a href="https://wa.me/573233396771">
                <i
                  className="fab fa-whatsapp"
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
                  className="fa fa-facebook"
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
              <a href="https://www.instagram.com/albanurycoach/">
                <i
                  className="fa fa-instagram"
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
          +57 323 3396771 <br />
          example@gmail.com
        </div>
      </div>
    </footer>
  );
}
