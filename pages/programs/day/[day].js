import React, { useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

import { Row, Typography, List } from "antd";

const { Title } = Typography;

const videos = [
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U"
];

function Day(props) {
  const router = useRouter();
  console.log(router.query.day);

  return (
    <Row justify="center" type="flex">
      <Title> Bienvenid@ al {router.query.day} de este programa</Title>
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
        dataSource={videos}
        renderItem={item => (
          <List.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: " 5px"
            }}
          >
            <ReactPlayer url={item} onPlay={console.log("play")} />
          </List.Item>
        )}
      />
    </Row>
  );
}

export default Day;
