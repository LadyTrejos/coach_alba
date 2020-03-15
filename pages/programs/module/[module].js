import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../../../api";
import ReactPlayer from "react-player";

import { Row, Typography, List, Skeleton } from "antd";

const { Title } = Typography;

function Module(props) {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [ready, setReady] = useState(false);
  // console.log("router.query.id", router.query.day);

  function loadData() {
    api
      .get(`/api/videos/`)
      .then(res => {
        setVideo(res);
        setReady(true);
      })
      .catch(err => console.log("error al cargar los programas ", err));
  }

  return (
    <div>
      <Row justify="center" type="flex">
        <Title level={2}>
          Bienvenid@ al {router.query.day} de este programa
        </Title>
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
            dataSource={video.data}
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
                  style={{
                    display: "flex",

                    margin: "1rem"
                  }}
                >
                  <ReactPlayer
                    url={item.videofile}
                    controls
                    autopause="true"
                    style={{
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
