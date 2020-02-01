export default function Footer() {
  return (
    <footer class="row text-center" style={{ backgroundColor: "#959595" }}>
      <div className="col-sm-12 col-md-12 col-lg-9 col-xl-10">
        <a href="https://web.whatsapp.com">
          <i
            class="fa fa-whatsapp"
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
        <a href="https://www.facebook.com">
          <i
            class="fa fa-facebook"
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
        <a href="https://www.instagram.com">
          <i
            class="fa fa-instagram"
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
      <div class="col-sm-12 col-md-12 col-lg-2 col-xl-2">
        Cr 12 cs 45 Pereira
        <br />
        +57 321456789
        <br />
        example@gmail.com
      </div>
    </footer>
  );
}
