import React, { useState } from "react";
import Router from "next/router";
import api from "../api";
import ModalProgram from "../comps/ModalProgram";
import Cookies from "js-cookie";
import styles from "../styles/styles.scss";
import {
  Button,
  Menu,
  Dropdown,
  Popconfirm,
  Icon,
  Form,
  Tooltip,
  Modal,
  Input
} from "antd";

function ProgramSettingsForm(props) {
  const [loadingExtra, setLoadingExtra] = useState(false);
  const [deleteItem, setDeleteItem] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;

  function toPrograms(e, id) {
    e.stopPropagation();
    Router.push("/programs/[id]", `/programs/${id}`);
  }

  function showModalModule(e) {
    // e.stopPropagation();
    setVisibleModal(true);
  }

  function handleCancel(e) {
    e.stopPropagation();
    console.log("handle Cancel: ", e);
    setVisible(false);
    props.form.resetFields();
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
        props.loadData();
        // Router.push("/programs");
        setLoadingExtra(false);
        setLoading(true);
      })
      .catch(err => console.log(err));
  }

  function handleEdit(event, id) {
    event.preventDefault();
    event.stopPropagation();
    const csrftoken = Cookies.get("csrftoken");
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);
        const programData = JSON.stringify(values);
        console.log("programData: ", programData);

        api
          .put(`/api/programs/${id}/`, programData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })

          .then(res => {
            setVisible(false);
            setLoading(false);
            props.loadData();
            props.form.resetFields();
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  function showModal() {
    setVisible(true);
  }

  function falseVisible() {
    setVisibleModal(false);
  }

  const menu = id => (
    <Menu>
      <Menu.Item key="1">
        <a onClick={e => showModalModule(e)}>Nuevo módulo</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={e => showModal(e)}>Cambiar nombre</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Popconfirm
          title="¿Eliminar?"
          onConfirm={e => deleteProgram(e, id)}
          onCancel={e => handleCancel(e)}
          okText="Sí"
          cancelText="No"
          placement={"left" /*cambiar esto cuando se pone formato celular */}
        >
          <Button
            type="default"
            loading={loadingExtra && deleteItem == id}
            onClick={event => {
              event.stopPropagation();
            }}
          >
            Eliminar
          </Button>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Modal
        title="Cambiar título del programa"
        visible={visible}
        onOk={e => handleEdit(e, props.id)}
        onCancel={e => handleCancel(e)}
        footer={[
          <Button key="back" onClick={e => handleCancel(e)}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={e => handleEdit(e, props.id)}
          >
            Aceptar
          </Button>
        ]}
      >
        <Form>
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
                  message: "Ingresa el título",
                  whitespace: true
                },
                {
                  pattern: /^(?=.{1,1000}$)([a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ,.¿]+[\s(?!\s)]?)*[a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ,.?]$/,
                  message: "Título no válido"
                }
              ]
            })(
              <Input
                type="text"
                size="large"
                placeholder={props.title}
                onClick={e => e.stopPropagation()}
                onChange={e => e.stopPropagation()}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
      {visibleModal ? (
        <ModalProgram
          visible={visibleModal}
          loadData={props.loadData}
          falseVisible={falseVisible}
          postTo="modules"
          id={props.id}
          type="módulo"
          {...props}
        ></ModalProgram>
      ) : null}
      <Dropdown
        overlay={menu(props.id)}
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
    </div>
  );
}

const ProgramSettings = Form.create({ name: "ProgramSetting" })(
  ProgramSettingsForm
);
export default ProgramSettings;
