import React, { useState } from "react";
import { useRouter } from "next/router";
import { Row, Col, Typography, List, Button } from "antd";
import ReactPlayer from "react-player";

import Delete from "../../../../comps/Delete";
import ProgramSettings from "../../../../comps/ProgramSettings";
import ModalEdit from "../../../../comps/ModalEdit";
import Header from "../../../../comps/Header";

import api from "../../../../api";
import styles from "../../../../styles/styles.scss";
import { authInitialProps } from "../../../../utils/auth";

const { Title } = Typography;

function Module(props) {
  const router = useRouter();
  const { user = {} } = props.auth || {};
  const { data } = props;
  const [id, setId] = useState(data.id);
  const [moduleTitle, setModuleTitle] = useState(data.title);
  const [videos, setVideos] = useState(data.videos);
  const [videoTitle, setVideoTitle] = useState(null);
  const [visible, setVisible] = useState(false);

  function handleCancel(e) {
    console.log("handleCancel: ", e);
  }

  function loadData() {
    api
      .get(`api/modules/${router.query.module}`)
      .then(res => {
        setVideos(res.data.videos);
        setModuleTitle(res.data.title);
      })
      .catch(err => console.log("Error al cargar el módulo. ", err));
  }

  function showModal(e, item) {
    setVisible(true);
    setId(item.id);
    setVideoTitle(item.title);
  }

  function closeModal() {
    setVisible(false);
  }

  const options = (id, title) => (
    <ProgramSettings
      id={id}
      loadData={loadData}
      title={title}
      type="módulo"
      editTo="modules"
      create="videos"
      father={router.query.father}
      newSon="video"
      {...props}
    ></ProgramSettings>
  );

  return (
    <div className="container">
      <Header user={user} />

      {visible ? (
        <ModalEdit
          visible={visible}
          editTo="videos"
          id={id}
          title={videoTitle}
          closeModal={closeModal}
          loadData={loadData}
          type="video"
          father={router.query.module}
        />
      ) : null}

      <div className={styles.wrapper_card}>
        <Row justify="center" type="flex" gutter={30}>
          <Col offset={2} xs={18} sm={17} md={17} lg={17} xl={19} xxl={19}>
            <h1 className={styles.sectionSubtitle}>{moduleTitle}</h1>
          </Col>
          <Col
            xs={4}
            sm={5}
            md={5}
            lg={5}
            xl={3}
            xxl={3}
            style={{ paddingTop: "0.8rem" }}
          >
            {user.is_admin ? options(router.query.module, moduleTitle) : null}
          </Col>
        </Row>

        <Row>
          <List
            itemLayout="horizontal"
            grid={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2
            }}
            pagination={
              videos.length > 2 ? { pageSize: 2, position: "bottom" } : null
            }
            dataSource={videos}
            renderItem={item => (
              <List.Item>
                <div className={styles.video_card}>
                  <Row>
                    <div className={styles.videoWrapper}>
                      <ReactPlayer
                        url={item.videofile}
                        controls
                        autopause="true"
                        width="100%"
                        height="100%"
                        className={styles.react_player}
                      />
                    </div>
                  </Row>

                  <Row>
                    <div className={styles.video_card__title}>{item.title}</div>
                  </Row>

                  {user.is_admin ? (
                    <Row justify="center" type="flex" gutter={25}>
                      <Col xs={20} sm={20} md={15} lg={10} xl={10} xxl={8}>
                        <Button
                          onClick={e => showModal(e, item)}
                          className={styles.defaultButton}
                          block
                        >
                          Editar
                        </Button>
                      </Col>
                      <Col xs={20} sm={20} md={15} lg={10} xl={10} xxl={8}>
                        <Delete
                          type="videos"
                          handleCancel={handleCancel}
                          loadData={loadData}
                          id={item.id}
                          block={true}
                        />
                      </Col>
                    </Row>
                  ) : null}
                </div>
              </List.Item>
            )}
          />
        </Row>
      </div>
    </div>
  );
}

Module.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(false)(ctx);
  const res = await api.get(`api/modules/${ctx.query.module}/`);

  return { auth, data: res.data };
};

export default Module;
