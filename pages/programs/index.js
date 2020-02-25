import React, { useState } from "react";
import Router from "next/router";
import {
  Collapse,
  Row,
  Button,
  Col,
  Typography,
  Modal,
  Input,
  Form,
  Tooltip,
  Icon
} from "antd";
const { Panel } = Collapse;

const { Title } = Typography;

let a = {
  title: [
    "Program 1 dsñlvhñsdlkjvñsjdl fjsdñlvnlkcxvn zñldsjfparjgireh",
    "Program 2",
    "Program 3",
    "Program 4"
  ],
  day: ["Day 1", "Day 2", "Day 3", "Day 4"]
};
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

let isAdmin = true;

//funcion principal
function IndexProgram(props) {
  const [visible, setVisible] = useState(null);
  const { getFieldDecorator } = props.form;

  function showModal() {
    setVisible(true);
  }

  function handleOk(e) {
    console.log("handle Ok: ", e);
    setVisible(false);
  }

  function handleCancel(e) {
    console.log("handle Cancel: ", e);
    setVisible(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //Hacer post a la base de datos
        console.log("No hay errores ", values);
        Router.push("/");
      }
    });
  }

  return (
    <Row style={{ padding: "20px 0" }}>
      <Modal
        title="Título del nuevo programa"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Crear programa"
      >
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Item
            label={
              <span>
                Título&nbsp;
                <Tooltip title="No uses dos espacios seguidos ni al final del título">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Ingresa el título del programa",
                  whitespace: true
                },
                {
                  pattern: /^(?=.{1,1000}$)([a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ,.¿]+[\s(?!\s)]?)*[a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ,.?]$/,
                  message: "Título no válido"
                }
              ]
            })(<Input type="text" size="large" placeholder="Título" />)}
          </Form.Item>
        </Form>
      </Modal>
      <Col
        className="gutter-row"
        className="offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-12 col-sm-5 col-md-7 col-lg-5 col-xl-7"
      >
        <Row justify="center" type="flex">
          <Title> Programas</Title>
        </Row>
        {isAdmin ? (
          <Button type="primary" onClick={() => showModal()}>
            Nuevo programa
          </Button>
        ) : null}
        <br />
        <br />
        <Collapse accordion style={{ wordWrap: "break-word" }}>
          {a.title.map(item => {
            return (
              <Panel header={`${item} `} key={`${item}`}>
                {a.day.map(day => {
                  return (
                    <div>
                      <Button type="primary"> {day} </Button> <br />
                      <br />
                    </div>
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </Col>
    </Row>
  );
}

const Index = Form.create({ name: "Index" })(IndexProgram);
export default Index;
