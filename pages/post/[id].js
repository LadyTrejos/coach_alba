import React, { useEffect, useState } from "react";
import { Row, Typography, Col, Card, Skeleton } from "antd";
const { Text, Title } = Typography;
import { useRouter } from "next/router";
import styles from "../../styles/styles.scss";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";

export default function Post(props) {
  const router = useRouter();
  const [title, setTitle] = useState(null);
  const [src, setSrc] = useState(
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
  );
  const [description, setDescription] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function loadData() {
    console.log("hola"),
      api.get(`/api/post/${router.query.id}`).then(res => {
        console.log("res: ", res);
        console.log("res.data.picture: ", res.data.picture);

        // src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        setSrc(res.data.picture);
        setTitle(res.data.title);
        setDescription(res.data.description);
      });
  }

  return title ? (
    <div>
      {console.log("return--> ", router.query.id)}
      <Row justify="center" type="flex">
        <div
          style={{
            minWidth: "400px",
            minHeight: "350px",
            height: "40vh",
            width: "auto",
            margin: "1rem"
            // boxShadow:
            //   " 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <img
            src={src}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </Row>
      <Row justify="center" type="flex" style={{ paddingTop: "20px" }}>
        <Title>{title}</Title>
      </Row>
      <Row justify="center" style={{ fontSize: "17px" }}>
        <Col
          className="gutter-row"
          className="offset-1 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-10 col-sm-8 col-md-10 col-lg-10 col-xl-8"
        >
          <Text style={{ wordWrap: "break-word" }}>
            {" "}
            {ReactHtmlParser(description)}
          </Text>
        </Col>
      </Row>
    </div>
  ) : (
    // <div style={{ textAlign: "center" }}>
    //   Cargando... {description == null ? ud() : null}
    // </div>
    <div className="container">
      <Skeleton active>{description == null ? loadData() : null} </Skeleton>
    </div>
  );
}
