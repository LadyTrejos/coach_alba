import styles from "../styles/styles.scss";
import Footer from "./Footer";
class Gallery extends React.Component {
  render() {
    let foto = ["/tatiana.png", "/logo192.png"];
    return (
      <div className="container-fluid">
        <h1 className={styles.title}>Galería</h1>
        <div
          id="carousel-with-lb"
          class="carousel slide carousel-multi-item"
          data-ride="carousel"
        >
          <div class="controls-top">
            <a
              class="carousel-control-prev"
              href="#carousel-with-lb"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel-with-lb"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <ol class="carousel-indicators">
            <li
              data-target="#carousel-with-lb"
              data-slide-to="0"
              class="active secondary-color"
            ></li>
            <li
              data-target="#carousel-with-lb"
              data-slide-to="1"
              class="secondary-color"
            ></li>
            <li
              data-target="#carousel-with-lb"
              data-slide-to="2"
              class="secondary-color"
            ></li>
          </ol>

          <div class="carousel-inner mdb-lightbox" role="listbox">
            <div id="mdb-lightbox-ui"></div>
            <div class=" carousel-item active text-center w-100">
              <figure class="col-md-4 d-md-inline-block">
                <img src="/paisaje2.jpg" class="img-fluid" />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img src="/paisaje.jpg" class="img-fluid" />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(6).jpg"
                  class="img-fluid"
                />
              </figure>
            </div>
            <div class="carousel-item text-center">
              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(22).jpg"
                  class="img-fluid"
                />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(25).jpg"
                  class="img-fluid"
                />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(29).jpg"
                  class="img-fluid"
                />
              </figure>
            </div>
            <div class="carousel-item text-center">
              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(44).jpg"
                  class="img-fluid"
                />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(45).jpg"
                  class="img-fluid"
                />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(66).jpg"
                  class="img-fluid"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
