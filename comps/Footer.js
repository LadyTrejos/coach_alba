import React from "react";
import styles from "../styles/styles.scss";
import { Icon } from "antd";

export default function Footer() {
  return (
    <footer className={`container-fluid ${styles.footer}`}>
      <div className={`row justify-content-center ${styles.contact}`}>
        <div className="col-12 col-sm-2 col-md-6 col-lg-5 col-xl-5 ">
          <div className="row justify-content-center">
            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <a
                href="https://wa.me/573233396771"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-whatsapp"
                  aria-hidden="true"
                  data-text="Whatsapp"
                  title="WhatsApp"
                  style={{
                    fontSize: "40px",
                    textAlign: "center",
                    color: "#fff"
                  }}
                ></i>
              </a>
            </div>
            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <a
                href="https://www.facebook.com/AlbaNuryCoach/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  type="facebook"
                  title="www.facebook.com/AlbaNuryCoach/"
                  theme="filled"
                  style={{
                    color: "#fff",
                    fontSize: "40px"
                  }}
                />
              </a>
            </div>
            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <a
                href="https://www.instagram.com/albanurycoach/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  type="instagram"
                  title="www.instagram.com/albanurycoach/"
                  style={{ color: "#fff", fontSize: "40px" }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4 col-md-4 col-lg-2 col-xl-2 text-center">
          <h6>Contacto</h6>
          +57 323 3396771 <br />
          albanurycoach@gmail.com <br />
          Pereira, Risaralda, Colombia
        </div>
      </div>
    </footer>
  );
}
