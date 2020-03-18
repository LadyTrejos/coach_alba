import React from "react";
import styles from "../styles/styles.scss";
import { Icon } from "antd";

export default function Footer() {
  return (
    <footer className={`container-fluid ${styles.footer}`}>
      <div className={`row justify-content-center ${styles.contact}`}>
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
          <h6 className={styles.footerTitle}>Sígueme en redes sociales</h6>
          <div className="row justify-content-center">
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">
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
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">
              <a
                href="https://www.facebook.com/AlbaNuryCoach/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-facebook"
                  aria-hidden="true"
                  style={{
                    fontSize: "40px",
                    textAlign: "center",
                    color: "#fff"
                  }}
                ></i>
              </a>
            </div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">
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
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
          <h6 className={styles.footerTitle}>Contáctame</h6>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <span>
                <i className="fa fa-whatsapp mr-2" aria-hidden="true"></i> +57
                323 3396771
              </span>
            </li>
            <li>
              <span>
                <i className="fa fa-envelope mr-2" aria-hidden="true"></i>{" "}
                albanurycoach@gmail.com
              </span>
            </li>
            <li>
              <span>
                <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>{" "}
                Pereira, Risaralda, Colombia
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
