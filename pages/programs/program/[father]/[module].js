import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../../../../api";
import styles from "../../../../styles/styles.scss";
import Delete from "../../../../comps/Delete";
import ProgramSettings from "../../../../comps/ProgramSettings";
import ModalEdit from "../../../../comps/ModalEdit";
import Header from "../../../../comps/Header";
import { authInitialProps } from "../../../../utils/auth";
import ReactPlayer from "react-player";

import { Row, Col, Typography, List, Skeleton, Icon, Button } from "antd";

const { Title } = Typography;

function Module(props) {
  const router = useRouter();
  const { user = {} } = props.auth || {};
  const { data } = props;
  const [video, setVideo] = useState(data.videos);
  const [title, setTitle] = useState(data.title);
  const [id, setId] = useState(data.id);
  const [videoTitle, setVideoTitle] = useState(null);
  const [visible, setVisible] = useState(false);

  function handleCancel(e) {
    console.log("handleCancel: ", e);
  }

  function loadData() {
    api
      .get(`api/modules/${router.query.module}/`)
      .then(res => {
        setVideo(res.data.videos);
        setTitle(res.data.title);
      })
      .catch(err => console.log("error al cargar los programas ", err));
  }

  function showModal(e, item) {
    setVisible(true);
    setId(item.id);
    setVideoTitle(item.title);
  }
  function falseVisible() {
    setVisible(false);
  }

  const options = (id, title) => (
    <ProgramSettings
      id={id}
      loadData={loadData}
      {...props}
      title={title}
      editTo="modules"
      create="videos"
      type="módulo"
      newSon="video"
      father={router.query.father}
    ></ProgramSettings>
  );

  return (
    <div className={`container `}>
      <Header user={user} />
      <Row justify="center" type="flex">
        <Title level={2}>{title}</Title>
      </Row>

      <Row style={{ margin: "0 0 3rem 0" }}>
        {user.is_admin ? options(router.query.module, title) : null}
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
            video.length > 2 ? { pageSize: 2, position: "bottom" } : null
          }
          dataSource={video}
          renderItem={item => (
            <List.Item>
              <Row>
                <Row>
                  <div
                    className={styles.videoWrapper}
                    style={{
                      display: "flex",
                      margin: "0 1.5rem 1rem 1.5rem",
                      minHeight: "350px",
                      minWidth: "250px",
                      height: "30%",
                      width: "auto"
                    }}
                  >
                    <ReactPlayer
                      url={item.videofile}
                      controls
                      autopause="true"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <div
                    style={{
                      textAlign: "justify",
                      wordBreak: "break-word",
                      fontSize: "20px",
                      padding: "0 1rem 0 1rem"
                    }}
                  >
                    {item.title}
                  </div>
                </Row>

                {user.is_admin ? (
                  <Row>
                    <Col style={{ margin: "0 1rem 0 1rem" }} span={3}>
                      {visible ? (
                        <ModalEdit
                          visible={visible}
                          editTo="videos"
                          id={id}
                          title={videoTitle}
                          falseVisible={falseVisible}
                          loadData={loadData}
                          type="video"
                          father={router.query.module}
                        />
                      ) : null}
                      <Button onClick={e => showModal(e, item)} type="primary">
                        Editar
                      </Button>
                    </Col>
                    <Col style={{ margin: "0 1rem 0 1rem" }} span={3}>
                      <Delete
                        type="videos"
                        handleCancel={handleCancel}
                        loadData={loadData}
                        id={item.id}
                      />
                    </Col>
                  </Row>
                ) : null}
              </Row>
            </List.Item>
          )}
        />
      </Row>
    </div>
  );
}

Module.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(false)(ctx);
  const res = await api.get(`api/modules/${ctx.query.module}/`);

  return { auth, data: res.data };
};

export default Module;
