import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Header from "../../comps/Header";
import { Row, Modal, Skeleton, Button, Col } from "antd";
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";

import styles from "../../styles/styles.scss";
import api from "../../api";

import { authInitialProps } from "../../utils/auth";

const Post = props => {
  const { user = {} } = props.auth || {};
  const { data } = props;
  const router = useRouter();
  const [visible, setVisible] = useState(null);
  const [title, setTitle] = useState(data.title);
  const [src, setSrc] = useState(data.picture);
  const [id, setId] = useState(data.id);
  const [description, setDescription] = useState(data.description);
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

  return (
    <div>
      <Header user={user} />

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
            <Row
              justify="center"
              type="flex"
              style={{ margin: "10px 0 20px 0" }}
            >
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
              <div className="  col-5 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <Button
                  className={styles.defaultButton}
                  onClick={() => loadingEditFunct()}
                  loading={loadingEdit}
                >
                  Editar
                </Button>
              </div>
              <div className=" col-5 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <Button onClick={() => showModal()} loading={loadingDelete}>
                  Eliminar
                </Button>
              </div>
            </Row>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Post.getInitialProps = async ctx => {
  const { auth } = authInitialProps(false)(false)(ctx);
  const res = await api.get(`/api/post/${ctx.query.id}`);
  return { auth, data: res.data };
};

export default Post;
