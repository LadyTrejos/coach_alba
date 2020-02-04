import styles from "../styles/styles.scss";

export default function Footer() {
  return (
    <footer className={`container-fluid p-0 ${styles.footer}`}>
      {/* <svg viewBox="0 0 120 28">
        <defs>
          <path
            id="wave"
            d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
          />
        </defs>
        <use
          id="wave3"
          className={`${styles.wave} ${styles.wave3}`}
          href="#wave"
          x="0"
          y="-1"
        ></use>
        <use
          id="wave2"
          className={`${styles.wave} ${styles.wave2}`}
          href="#wave"
          x="0"
          y="0"
        ></use>
        <use
          id="wave1"
          className={`${styles.wave} `}
          href="#wave"
          x="0"
          y="1"
        ></use>
      </svg> */}
      <div className={`row justify-content-center ${styles.contact}`}>
        <div className="col-12 col-sm-2 col-md-6 col-lg-5 col-xl-5 ">
          <div className="row justify-content-center">
            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <a href="https://web.whatsapp.com">
                <i
                  className="fa fa-whatsapp"
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
              <a href="https://www.instagram.com">
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
          +57 321456789 <br />
          example@gmail.com
        </div>
      </div>
    </footer>
  );
}
