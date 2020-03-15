import React, { useState } from "react";

import Cookies from "js-cookie";
import api from "../api";

import { Modal, Button, Form, Tooltip, Icon, Input } from "antd";

function ModalProgramForm(props) {
  const [visible, setVisible] = useState(props.visible);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const { type, postTo } = props;

  function handleCancel(e) {
    e.stopPropagation();
    props.falseVisible();
    setVisible(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const csrftoken = Cookies.get("csrftoken");
    let programData = {};
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);

        if (postTo == "programs") {
          programData = JSON.stringify(values);
        } else if (postTo == "modules") {
          programData = JSON.stringify({
            title: values.title,
            father: props.id
          });
        }

        api
          .post(`/api/${postTo}/`, programData, {
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
    });
  }

  return (
    <Modal
      title={`Título del nuevo ${type}`}
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
                title={`No uses dos espacios seguidos ni al final del título del ${type}`}
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
                message: `Ingresa el título`,
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
