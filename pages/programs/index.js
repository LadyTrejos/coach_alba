import React, { useState } from "react";
import Router from "next/router";
import style from "../../styles/styles.scss";
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
  title: ["Programa 1 ", "Programa 2", "Programa 3", "Programa 4"],
  day: ["Día 1", "Día 2", "Día 3", "Día 4"]
};
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

//funcion principal
function IndexProgram(props) {
  const { user } = props;
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
        // const programData = JSON.stringify(values.title);
        //     //console.log("programData: ", programData);

        //     api
        //       .post(``, programData, {
        //         headers: { "Content-type": "application/json" }
        //       })

        //       .then((res) => {
        // //mirar cómo trae el 'res' el título
        //         Router.push("/programs/[title]", `/programs/${res.title}`);
        //       })
        //       .catch(err => {
        //         console.log(err)
        //         });
        console.log("No hay errores ", values);
        Router.push("/programs/[title]", `/programs/${values.title}`);
      }
    });
  }

  function deleteProgram(e) {
    console.log("Eliminar el programa seleccionado");
  }
  function daySelected(day) {
    console.log(day);
    Router.push("/programs/day/[day]", `/programs/day/${day}`);
  }

  const genExtra = () => (
    <Button type="danger" onClick={deleteProgram}>
      Eliminar
    </Button>
  );
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
        className="offset-sm-3 offset-md-2 offset-lg-2 offset-xl-2 col-12 col-sm-6 col-md-8 col-lg-8 col-xl-8"
      >
        <Row justify="center" type="flex">
          <Title> Programas</Title>
        </Row>
        {user.is_admin ? (
          <Button type="primary" onClick={() => showModal()}>
            Nuevo programa
          </Button>
        ) : null}
        <br />
        <br />
        <Collapse accordion style={{ wordWrap: "break-word" }}>
          {a.title.map(title => {
            return (
              <Panel
                header={`${title} `}
                key={`${title}`}
                extra={user.is_admin ? genExtra() : null}
                className={user.is_admin ? style.panel : null}
              >
                {a.day.map(day => {
                  return (
                    <div>
                      <Button type="primary" onClick={() => daySelected(day)}>
                        {day}
                      </Button>
                      <br />
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
