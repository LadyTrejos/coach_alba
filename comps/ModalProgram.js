import React, { useState } from "react";

import Cookies from "js-cookie";
import api from "../api";

import { Modal, Button, Form, Tooltip, Icon, Input } from "antd";

function ModalProgramForm(props) {
  const [visible, setVisible] = useState(props.visible);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;

  function handleCancel(e) {
    e.stopPropagation();
    props.falseVisible();
    setVisible(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const csrftoken = Cookies.get("csrftoken");
    props.form.validateFieldsAndScroll((err, values) => {
      console.log("values: ", values);
      if (!err) {
        setLoading(true);

        if (props.typeModal == "program") {
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
              props.loadData();
              props.falseVisible();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          const programData = JSON.stringify({
            title: values.title,
            father: props.id
          });
          console.log("programData: ", programData);
          api
            .post(`/api/modules/`, programData, {
              headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken
              }
            })

            .then(res => {
              //mirar cómo trae el 'res' el título
              props.loadData();
              props.falseVisible();
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    });
  }

  return (
    <Modal
      title={
        props.typeModal == "program"
          ? "Título del nuevo programa"
          : "Título del nuevo módulo"
      }
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
          Aceptar
        </Button>
      ]}
    >
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item
          label={
            <span>
              Título&nbsp;
              <Tooltip
                title={
                  props.typeModal == "program"
                    ? "No uses dos espacios seguidos ni al final del título del programa"
                    : "No uses dos espacios seguidos ni al final del título del módulo"
                }
              >
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
          })(
            <Input
              type="text"
              size="large"
              placeholder="Título"
              onChange={e => e.stopPropagation()}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

const ModalProgram = Form.create({ name: "ModalProgram" })(ModalProgramForm);
export default ModalProgram;
