import styles from "../styles/styles.scss";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="offset-1 col-9 col-sm-10 col-md-6 col-lg-6 col-xl-6">
          <div className={styles.description}>
            Velit voluptate ea officia qui deserunt occaecat. Ipsum veniam qui
            aliquip cillum deserunt sint aliquip sint elit aliquip exercitation
            consequat fugiat.
          </div>
        </div>
        <div className="col-3">
          <img src="/tatiana.png" className={styles.coverimg} />
        </div>
      </div>
    </div>
  );
}
