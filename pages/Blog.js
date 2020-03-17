import React, { useState } from "react";
import { BackTop, Skeleton, Row } from "antd";

import api from "../api";
import DemoBlog from "../comps/DemoBlog";
import styles from "../styles/styles.scss";

export default function Blog(props) {
  const [data, setData] = useState(null);

  function loadData() {
    api.get(`/api/post/?ordering=-created_at`).then(res => {
      setData(res.data);
    });
  }

  return (
    <div className="container">
      <BackTop />
      <Row justify="center" type="flex" style={{ paddingTop: "20px" }}>
        <h1 className={styles.sectionTitle}>Blog</h1>
      </Row>
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
