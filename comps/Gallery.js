class Gallery extends React.Component {
  imagen(img) {
    return (
      <figure class="col-md-4 d-md-inline-block">
        <img src={img} class="img-fluid" />
      </figure>
    );
  }

  render() {
    const photos = ["/logo192.png", "/tatiana.png", "/image.png"];
    return (
      <div className="container-fluid">
        <h1 style={{ textAlign: "center" }}>Galería</h1>
        <div
          id="carousel-with-lb"
          class="carousel slide carousel-multi-item"
          data-ride="carousel"
        >
          <div class="controls-top">
            <a
              href="#carousel-with-lb"
              data-slide="prev"
              style={{ fontSize: "2rem" }}
            >
              <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
            </a>
            <a
              href="#carousel-with-lb"
              data-slide="next"
              style={{ fontSize: "2rem" }}
            >
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
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
            <div class=" carousel-item active text-center">
              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(2).jpg"
                  class="img-fluid"
                />
              </figure>

              <figure class="col-md-4 d-md-inline-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(4).jpg"
                  class="img-fluid"
                />
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
