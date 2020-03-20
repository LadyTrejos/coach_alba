import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import Cookies from "js-cookie";
import api from "../api";

function Edit(props) {
  const [visible, setVisible] = useState(props.visible);
  const [loading, setLoading] = useState(false);

  const { id, title, editTo, type } = props;
  const { getFieldDecorator } = props.form;

  function handleCancel(e) {
    e.stopPropagation();
    props.closeModal();
  }

  function handleEdit(event, id) {
    event.preventDefault();
    event.stopPropagation();

    let programData = null;
    const csrftoken = Cookies.get("csrftoken");

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);

        if (editTo === "programs") {
          // Send title only
          programData = JSON.stringify(values);
        } else {
          // Modules and videos needs title and father's id
          programData = JSON.stringify({
            title: values.title,
            father: props.father
          });
        }

        api
          .patch(`/api/${editTo}/${id}/`, programData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })

          .then(() => {
            setVisible(false);
            setLoading(false);
            props.closeModal();
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
          htmlType="submit"
          type="primary"
          loading={loading}
          onClick={e => handleEdit(e, id)}
        >
          Aceptar
        </Button>
      ]}
    >
      <Form onSubmit={e => handleEdit(e, id)}>
        <Form.Item label="Título" hasFeedback>
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Ingresa el título",
                whitespace: true
              }
            ],
            initialValue: title
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
