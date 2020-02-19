import React from "react";
import DemoBlog from "../comps/DemoBlog";
import { BackTop } from "antd";

import styles from "../styles/styles.scss";
//Cambiar por la consulta a la base de datos
let a = [
  { title: "title_1", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_2", src: "image.png", description: "blablablalbaljdkfas" },
  { title: "title_3", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_4", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_5", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_6", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_7", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_8", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_9", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_10", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_11", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_12", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_13", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_14", src: "tatiana.png", description: "blablablalbaljdkfas" },
  { title: "title_15", src: "image.png", description: "blablablalbaljdkfas" }
];

export default function Blog() {
  return (
    <div style={{ paddingBottom: "50px" }}>
      <BackTop />
      <h1 className={styles.sectionTitle}>Blog</h1>
      <DemoBlog post={a} demo={false} pagination={true} />
    </div>
  );
}
