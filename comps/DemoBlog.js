import styles from "../styles/styles.scss";
export default function DemoBlog() {
  return (
    <div className="container-fluid">
      <h1 style={{ textAlign: "center" }}>Blog</h1>
      <div className="row align-items-center">
        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <div class="card" style={{ width: "18rem" }}>
            <img class="card-img-top" src="/tatiana.png" alt="Card image cap" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-63">
          <div class="card" style={{ width: "18rem" }}>
            <img class="card-img-top" src="/tatiana.png" alt="Card image cap" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
