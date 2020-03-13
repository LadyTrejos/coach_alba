import React, { useState } from "react";

import { useRouter } from "next/router";

import { Row, Typography } from "antd";

const { Title } = Typography;

function Program(props) {
  const router = useRouter();
  console.log(router.query.title);
  return (
    <Row justify="center" type="flex">
      <Title> {router.query.id} </Title>;
    </Row>
  );
}

export default Program;
