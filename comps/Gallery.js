import styles from "../styles/styles.scss";
import Footer from "./Footer";
class Gallery extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className={styles.sectionTitle}>Galería</h1>
        <div
          id="carousel-with-lb"
          className="carousel slide carousel-multi-item"
          data-ride="carousel"
        >
          <div className="controls-top">
            <a
              className="carousel-control-prev"
              href="#carousel-with-lb"
              role="button"
              data-slide="prev"
            >
              <span
                className={styles.carouselcontrolprevicon}
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel-with-lb"
              role="button"
              data-slide="next"
            >
              <span
                className={styles.carouselcontrolnexticon}
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <ol className="carousel-indicators">
            <li
              data-target="#carousel-with-lb"
              data-slide-to="0"
              className="active secondary-color"
            ></li>
            <li
              data-target="#carousel-with-lb"
              data-slide-to="1"
              className="secondary-color"
            ></li>
            <li
              data-target="#carousel-with-lb"
              data-slide-to="2"
              className="secondary-color"
            ></li>
            <li
              data-target="#carousel-with-lb"
              data-slide-to="3"
              className="secondary-color"
            ></li>
          </ol>

          <div className="carousel-inner mdb-lightbox" role="listbox">
            <div id="mdb-lightbox-ui"></div>
            <div className=" carousel-item active text-center w-100">
              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_1.jpeg" className={`img-fluid `} />
              </figure>

              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_2.jpeg" className={`img-fluid `} />
              </figure>
            </div>
            <div className="carousel-item text-center">
              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_3.jpeg" className={`img-fluid `} />
              </figure>
              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_4.jpeg" className={`img-fluid `} />
              </figure>
            </div>
            <div className="carousel-item text-center">
              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_5.jpeg" className={`img-fluid `} />
              </figure>

              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_6.jpeg" className={`img-fluid `} />
              </figure>
            </div>
            <div className="carousel-item text-center">
              <figure className="col-md-6 d-md-inline-block">
                <img src="/IMG_7.jpeg" className={`img-fluid `} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
