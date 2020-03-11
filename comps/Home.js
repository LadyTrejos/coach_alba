import React from "react";
import styles from "../styles/styles.scss";

export default function Home() {
  return (
    <div className={`container-fluid ${styles.homebg}`}>
      <div className="row align-items-center">
        <div className=" offset-lg-1 offset-xl-1 col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
          <div className={styles.description}>
            <span className={styles.name}>Alba Nury González L.</span>
            <br />
            <span className={styles.coach}>
              Coach profesional, personal y de vida
            </span>
            <br />
            <div className={styles.divider}>
              <div className={styles.dividerMask}></div>
            </div>
            <p className={styles.descriptionText}>
              A través de diferentes técnicas de coaching enfocamos mi
              conocimiento y tu compromiso para{" "}
              <span className={styles.highlightPink}>
                generar el logro de tus metas personales o profesionales.
              </span>
            </p>
            <br /> <br />
            <div className={styles.blockquote}>
              <p>
                Descubrir la clave para solucionar todos nuestros problemas con
                facilidad y rapidez es el deseo de las masas. Sin embargo, tomar
                conciencia que la solución está en tu SER es tarea que pocos
                quieren realizar, y es allí donde está la respuesta del por qué
                tan pocos lo logran.
              </p>
              <h4>&mdash;Alba Nury </h4>
            </div>
          </div>
        </div>
        <div className="offset-1 col-10 col-sm-10 col-md-6 col-lg-4 col-xl-4">
          <img src="/static/alba_home.png" className={styles.coverimg} />
        </div>
      </div>
    </div>
  );
}
