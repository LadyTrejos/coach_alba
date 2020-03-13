import React, { useState } from "react";
import Router from "next/router";
import style from "../../styles/styles.scss";
import api from "../../api";
import Cookies from "js-cookie";
import {
  Collapse,
  Row,
  Button,
  Col,
  Typography,
  Modal,
  Input,
  Menu,
  Dropdown,
  Form,
  Tooltip,
  Skeleton,
  Popconfirm,
  Icon
} from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

let a = {
  title: ["Programa 1 ", "Programa 2", "Programa 3", "Programa 4"],
  day: ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6"]
};

//funcion principal
function IndexProgram(props) {
  const { user } = props;
  const [visible, setVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState(null);
  const [ready, setReady] = useState(false);
  const [loadingExtra, setLoadingExtra] = useState(false);
  const [deleteItem, setDeleteItem] = useState(-1);
  const { getFieldDecorator } = props.form;

  function showModal() {
    setVisible(true);
  }

  function handleCancel(e) {
    e.stopPropagation();
    console.log("handle Cancel: ", e);
    setVisible(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const csrftoken = Cookies.get("csrftoken");
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);
        const programData = JSON.stringify(values);
        console.log("programData: ", programData);

        api
          .post(`/api/programs/`, programData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })

          .then(res => {
            //mirar cómo trae el 'res' el título
            loadData();
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  function loadData() {
    api
      .get(`/api/programs/`)
      .then(res => {
        setPrograms(res);
        setReady(true);
      })
      .then(res => {
        setLoading(false);
        setVisible(false);
        props.form.resetFields();
      });
  }

  function deleteProgram(e, id) {
    e.stopPropagation();
    setLoadingExtra(true);
    setDeleteItem(id);
    console.log("Eliminar el programa seleccionado", id);
    const csrftoken = Cookies.get("csrftoken");

    api
      .delete(`/api/programs/${id}`, {
        headers: {
          "X-CSRFToken": csrftoken
        }
      })
      .then(res => {
        loadData();
        setLoadingExtra(false);
      })
      .catch(err => console.log(err));
  }

  function daySelected(day) {
    Router.push("/programs/day/[day]", `/programs/day/${day}`);
  }

  function toPrograms(e, id) {
    e.stopPropagation();
    Router.push("/programs/[id]", `/programs/${id}`);
  }

  const menu = id => (
    <Menu>
      <Menu.Item key="2">
        <Popconfirm
          title="¿Estás segura que deseas eliminar este programa?"
          onConfirm={e => deleteProgram(e, id)}
          onCancel={e => handleCancel(e)}
          okText="Sí"
          cancelText="No"
        >
          <Button
            type="danger"
            loading={loadingExtra && deleteItem == id}
            onClick={event => {
              event.stopPropagation();
            }}
          >
            Eliminar
          </Button>
        </Popconfirm>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="primary" onClick={e => toPrograms(e, id)}>
          Añadir día
        </Button>
      </Menu.Item>
    </Menu>
  );

  const genExtra = id => (
    <Dropdown
      overlay={menu(id)}
      trigger={["click"]}
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    >
      <span>
        <Icon
          type="setting"
          style={{ fontSize: "23px", color: "#3949c6", marginRight: "3px" }}
          theme="filled"
        />
        Opciones
      </span>
    </Dropdown>
    // <Row gutter={[16, 16]}>
    //   <Col span={12}>
    //     <Button
    //       type="primary"
    //       onClick={e => Router.push("/programs/[id]", `/programs/${id}`)}
    //     >
    //       Añadir día
    //     </Button>
    //   </Col>
    //   <Col span={1}>
    //     <Popconfirm
    //       title="¿Estás segura que deseas eliminar este programa?"
    //       onConfirm={e => deleteProgram(e, id)}
    //       onCancel={e => handleCancel(e)}
    //       okText="Sí"
    //       cancelText="No"
    //     >
    //       <Button type="danger" loading={loadingExtra && deleteItem == id}>
    //         Eliminar
    //       </Button>
    //     </Popconfirm>
    //   </Col>
    // </Row>
  );

  return (
    <Row style={{ padding: "20px 0" }}>
      <Modal
        title="Título del nuevo programa"
        visible={visible}
        onOk={e => handleSubmit(e)}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={e => handleSubmit(e)}
          >
            Crear programa
          </Button>
        ]}
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
        {ready ? (
          <Collapse accordion style={{ wordWrap: "break-word" }}>
            {programs.data.map(data => {
              return (
                <Panel
                  header={`${data.title} `}
                  key={`${data.id}`}
                  extra={user.is_admin ? genExtra(data.id) : null}
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
        ) : (
          <div className="container">
            <Skeleton active>{ready == false ? loadData() : null}</Skeleton>
          </div>
        )}
      </Col>
    </Row>
  );
}

const Index = Form.create({ name: "Index" })(IndexProgram);
export default Index;
