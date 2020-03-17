import React, { useState } from "react";
import api from "../api";
import Cookies from "js-cookie";

import { Modal, Input, Button, Form, Tooltip, Icon } from "antd";

function Edit(props) {
  const [visible, setVisible] = useState(props.visible);
  const [loading, setLoading] = useState(false);

  const { id, title, editTo, type } = props;
  const { getFieldDecorator } = props.form;

  function handleCancel(e) {
    e.stopPropagation();
    props.falseVisible();
  }

  function handleEdit(event, id) {
    event.preventDefault();
    event.stopPropagation();

    let programData = null;
    const csrftoken = Cookies.get("csrftoken");
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);

        editTo == "programs"
          ? (programData = JSON.stringify(values))
          : editTo == "modules"
          ? (programData = JSON.stringify({
              title: values.title,
              father: props.father
            }))
          : null;

        console.log("programData: ", programData);

        api
          .put(`/api/${editTo}/${id}/`, programData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })

          .then(res => {
            setVisible(false);
            setLoading(false);
            props.falseVisible();
            props.loadData();
            props.form.resetFields();
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  return (
    <Modal
      title={`Cambiar título del ${type}`}
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
          onClick={e => handleEdit(e, id)}
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
              placeholder={title}
              onClick={e => e.stopPropagation()}
              onChange={e => e.stopPropagation()}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

const ModalEdit = Form.create({ name: "ModalEdit" })(Edit);
export default ModalEdit;
