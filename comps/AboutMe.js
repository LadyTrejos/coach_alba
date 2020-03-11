import React from "react";
import styles from "../styles/styles.scss";

export default function AboutMe() {
  return (
    <section className={styles.aboutbg}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-end">
          <div className={`col-12 col-sm-10 col-md-8 col-lg-5 col-xl-5 `}>
            <img
              src="/static/DSC_4392.png"
              alt="Alba Nury"
              className={styles.coverimg}
            />
          </div>
          <div
            className={`col-12 col-sm-10 col-md-8 col-lg-5 col-xl-5 ${styles.bio}`}
          >
            <h2 className={styles.biotitle}>Sobre mí </h2>
            <p>
              Duis anim velit enim magna adipisicing sunt. Ut dolore nostrud ea
              proident ad ullamco esse. Laboris duis laboris dolore esse nisi
              adipisicing sit voluptate officia. Veniam aute commodo magna magna
              eiusmod. Nisi exercitation esse esse sint sint nisi sit enim
              minim. Et do aute aliqua fugiat ipsum esse sit ex. Tempor qui
              ipsum dolore enim non voluptate ea nulla. Voluptate incididunt
              ullamco excepteur ea esse do ullamco deserunt et culpa nostrud
              consectetur veniam deserunt. Excepteur in id elit sit do aliquip
              amet magna. Ipsum duis aute duis quis ad est duis nulla Lorem sunt
              sunt dolore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
