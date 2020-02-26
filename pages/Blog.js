import React from "react";
import DemoBlog from "../comps/DemoBlog";
import { BackTop } from "antd";

import styles from "../styles/styles.scss";
//Cambiar por la consulta a la base de datos
let a = [
  {
    title: "title_1",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_2",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_3",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_4",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_5",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_6",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_7",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_8",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_9",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_10",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_11",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_12",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_13",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_14",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  },
  {
    title: "title_15",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    description: "blablablalbaljdkfas"
  }
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
