import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../../../../api";
import styles from "../../../../styles/styles.scss";
import Delete from "../../../../comps/Delete";
import ProgramSettings from "../../../../comps/ProgramSettings";
import ReactPlayer from "react-player";

import { Row, Col, Typography, List, Skeleton, Icon, Button } from "antd";

const { Title } = Typography;

function Module(props) {
  const router = useRouter();
  const { user } = props;
  const [video, setVideo] = useState(null);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState(null);
  // console.log("router.query.id", router.query.day);

  function handleCancel(e) {
    console.log("handle Cancel: ", e);
  }

  function loadData() {
    api
      .get(`api/modules/${router.query.module}/`)
      .then(res => {
        console.log("res modules: ", res);
        setVideo(res.data.videos);
        setReady(true);
        setTitle(res.data.title);
      })
      .catch(err => console.log("error al cargar los programas ", err));
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

  return ready ? (
    <div>
      <Row justify="center" type="flex">
        <Title level={2}>{title}</Title>
      </Row>

      <Row style={{ margin: "0 0 2rem 1rem" }}>
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
            xl: 3,
            xxl: 3
          }}
          pagination={
            video.length > 3 ? { pageSize: 3, position: "bottom" } : null
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
                      margin: "0 0.5rem 1rem 0.5rem",
                      minHeight: "350px",
                      minWidth: "250px",
                      height: "50vh",
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
                      <Button
                        onClick={e => console.log("editar: ", item.title)}
                        type="primary"
                      >
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
  ) : (
    <div className="container">
      <Skeleton active>{ready == false ? loadData() : null} </Skeleton>
    </div>
  );
}

export default Module;
