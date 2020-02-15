import styles from "../styles/styles.scss";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="offset-1 col-9 col-sm-10 col-md-6 col-lg-6 col-xl-6">
          <div className={styles.description}>
            Alba Nury Gonzalez L. Coach Profesional, personal y de Vida. A
            través de diferentes técnicas de coaching enfocamos mi conocimiento
            y tu compromiso para generar el logro de tus metas personales o
            profesionales.
            <br /> <br />
            Descubrir la clave para solucionar todos nuestros problemas con
            facilidad y rapidez es el deseo de las masas; sin embargo, tomar
            conciencia que la solución está en tu SER es tarea que pocos quieren
            realizar, y es allí donde está la respuesta del por qué tan pocos lo
            logran.
          </div>
        </div>
        <div className="offset-1 col-10 col-sm-10 col-md-4 col-lg-4 col-xl-4">
          <img src="/tatiana.png" className={styles.coverimg} />
        </div>
      </div>
    </div>
  );
}
