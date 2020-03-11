import React, { useState } from "react";
import DemoBlog from "../comps/DemoBlog";
import { BackTop, Skeleton } from "antd";
import api from "../api";

import styles from "../styles/styles.scss";
//Cambiar por la consulta a la base de datos

export default function Blog(props) {
  const [data, setData] = useState(null);

  function loadData() {
    api.get(`/api/post/?ordering=-created_at`).then(res => {
      setData(res.data);
    });
  }

  return (
    <div style={{ padding: "10px 0 50px 0" }}>
      <BackTop />
      <h1 className={styles.sectionTitle}>Blog</h1>
      {data ? (
        <DemoBlog post={data} demo={false} pagination={true} {...props} />
      ) : (
        <div className="container">
          <Skeleton active>{data == null ? loadData() : null} </Skeleton>
        </div>
      )}
    </div>
  );
}
