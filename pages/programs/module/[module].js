import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../../../api";
import styles from "../../../styles/styles.scss";
import ReactPlayer from "react-player";

import { Row, Typography, List, Skeleton } from "antd";

const { Title } = Typography;

function Module(props) {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState(null);
  // console.log("router.query.id", router.query.day);

  function loadData() {
    api
      .get(`api/modules/${router.query.module}/`)
      .then(res => {
        // console.log("res modules: ", res);
        setVideo(res.data.videos);
        setReady(true);
        setTitle(res.data.title);
      })
      .catch(err => console.log("error al cargar los programas ", err));
  }

  return (
    <div>
      <Row justify="center" type="flex">
        <Title level={2}>{title}</Title>
      </Row>

      {ready ? (
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
            pagination={{ pageSize: 3, position: "bottom" }}
            dataSource={video}
            renderItem={item => (
              <List.Item
                actions={[
                  <div
                    style={{
                      textAlign: "justify",
                      wordBreak: "break-word",
                      fontSize: "20px"
                    }}
                  >
                    {item.title}
                  </div>
                ]}
              >
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
              </List.Item>
            )}
          />
        </Row>
      ) : (
        <div className="container">
          <Skeleton active>{ready == false ? loadData() : null} </Skeleton>
        </div>
      )}
    </div>
  );
}

export default Module;
