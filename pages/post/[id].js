import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { Row, Typography, Col, Modal, Skeleton, Button } from "antd";
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";

import styles from "../../styles/styles.scss";
import api from "../../api";

const { Text, Title } = Typography;

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
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  function showModal() {
    setVisible(true);
  }

  function handleOk(e) {
    setVisible(false);
    setLoadingDelete(true);
    const csrftoken = Cookies.get("csrftoken");
    api
      .delete(`/api/post/${router.query.id}`, {
        headers: {
          "X-CSRFToken": csrftoken
        }
      })
      .then(res => {
        Router.push("/Blog");
      })
      .catch(err => console.log(err));
  }

  function handleCancel(e) {
    setVisible(false);
  }

  function loadingEditFunct() {
    setLoadingEdit(true);
    Router.push("/post/edit/[id]", `/post/edit/${id}`);
  }

  function loadData() {
    api.get(`/api/post/${router.query.id}`).then(res => {
      // src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      setSrc(res.data.picture);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setId(res.data.id);
    });
  }

  return title ? (
    <div className="container">
      <Row justify="center" type="flex">
        <div
          style={{
            minWidth: "320px",
            minHeight: "350px",
            height: "40vh",
            width: "auto",
            margin: "1rem"
          }}
        >
          <img
            src={src}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="Imagen de la publicación"
          />
        </div>
      </Row>
      <Row justify="center" type="flex" style={{ paddingTop: "20px" }}>
        <Title>{title}</Title>
      </Row>
      <Row justify="center" style={{ fontSize: "17px" }}>
        <Col>
          <Text style={{ wordWrap: "break-word" }}>
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
          <Button
            type="danger"
            onClick={() => showModal()}
            loading={loadingDelete}
          >
            Eliminar publicación
          </Button>
          <Button
            className={styles.defaultButton}
            onClick={() => loadingEditFunct()}
            loading={loadingEdit}
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
