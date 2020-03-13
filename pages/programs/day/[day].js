import React, { useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

import { Row, Typography, List } from "antd";

const { Title } = Typography;

const videos = [
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0",
  "https://www.youtube.com/watch?v=p0FhxFZu9m0"
];

function Day(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(null);
  console.log(router.query.day);

  return (
    <div>
      <Row justify="center" type="flex">
        <Title level={2}>
          Bienvenid@ al {router.query.day} de este programa
        </Title>
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
          pagination={{ pageSize: 3, position: "bottom" }}
          dataSource={videos}
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
                  Consectetur in eu do et. Irure elit laboris cupidatat elit
                  tempor enim consequat enim ea. Aliqua et dolor in dolor.
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
                  url={item}
                  controls
                  autoPause={true}
                  style={{
                    objectFit: "contain"
                  }}
                />
              </div>
            </List.Item>
          )}
        />
      </Row>
    </div>
  );
}

export default Day;
