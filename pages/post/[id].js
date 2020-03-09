import React, { useEffect, useState } from "react";
import { Row, Typography, Col, Modal, Skeleton, Button, message } from "antd";
const { Text, Title } = Typography;
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "../../styles/styles.scss";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";

export default function Post(props) {
  const { user } = props;
  const router = useRouter();
  const [visible, setVisible] = useState(null);
  const [title, setTitle] = useState(null);
  const [src, setSrc] = useState(
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
  );
  const [id, setId] = useState(null);
  const [description, setDescription] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function showModal() {
    setVisible(true);
  }

  function handleOk(e) {
    setVisible(false);
    const csrftoken = Cookies.get("csrftoken");
    api
      .delete(`/api/post/${router.query.id}`, {
        headers: {
          "X-CSRFToken": csrftoken
        }
      })
      .then(res => {
        Router.push("/Blog");
      });
  }

  function handleCancel(e) {
    setVisible(false);
  }

  function loadData() {
    api.get(`/api/post/${router.query.id}`).then(res => {
      // src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      // setSrc(res.data.picture);
      setSrc("https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png");
      setTitle(res.data.title);
      setDescription(res.data.description);
      setId(res.data.id);
    });
  }

  return title ? (
    <div>
      <Row justify="center" type="flex">
        <div
          style={{
            minWidth: "400px",
            minHeight: "350px",
            height: "40vh",
            width: "auto",
            margin: "1rem"
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
      {user.is_admin ? (
        <Row justify="center" type="flex" style={{ margin: "10px 0 20px 0" }}>
          <Modal
            title="Eliminar publicación"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="Cancelar"
            okText="Eliminar"
          >
            ¿Está segura que desea eliminar esta publicación?
          </Modal>
          <Button type="danger" onClick={() => showModal()}>
            Eliminar publicación
          </Button>
          <Button
            className={styles.defaultButton}
            onClick={() => Router.push("/post/edit/[id]", `/post/edit/${id}`)}
          >
            Editar publicación
          </Button>
        </Row>
      ) : null}
    </div>
  ) : (
    <div className="container">
      <Skeleton active>{description == null ? loadData() : null} </Skeleton>
    </div>
  );
}
