import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { Row, Modal, Skeleton, Button } from "antd";
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";

import styles from "../../styles/styles.scss";
import api from "../../api";

const Post = props => {
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
      <div className={styles.post}>
        <div className={styles.post__img}>
          <span className={styles.post__img__helper}></span>
          <img src={src} alt="Imagen de la publicación" />
        </div>

        <div className={styles.post__content}>
          <h2 className={styles.post__title}>{title}</h2>
          <div className={styles.post__text}>
            {ReactHtmlParser(description)}
          </div>
        </div>

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
    </div>
  ) : (
    <div className="container">
      <Skeleton active>{description == null ? loadData() : null} </Skeleton>
    </div>
  );
};

Post.getInitialProps = async ({ query }) => {
  const res = await api.get(`/api/post/${query.id}`);
  return { data: res.data };
};

export default Post;
