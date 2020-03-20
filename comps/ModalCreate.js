import React, { useState, useRef } from "react";
import { Modal, Button, Form, Input, Alert, Row } from "antd";
import Cookies from "js-cookie";

import api from "../api";
import Files from "../comps/Files";

function ModalCreateForm(props) {
  // Video
  const fileRef = useRef(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = props.form;
  const { visible, newSon, postTo } = props;

  function handleCancel(e) {
    e.stopPropagation();
    props.falseVisibleModal();
  }

  function onClose() {
    setError(null);
  }

  function validateFile() {
    let file = null;
    let fileError = false;
    if (postTo === "videos") {
      file = fileRef.current.state.selectedFile;
      fileError = !file;
    }

    fileError ? setError("Ingresa un video") : setError(null);
    return { file, fileError };
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const csrftoken = Cookies.get("csrftoken");
    let programData = {};
    const { file, fileError } = validateFile();

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err && !fileError) {
        setLoading(true);

        if (postTo === "programs") {
          programData = JSON.stringify(values);
        } else if (postTo === "modules") {
          programData = JSON.stringify({
            title: values.title,
            father: props.id
          });
        } else {
          programData = new FormData();
          programData.append("title", values.title);
          programData.append("videofile", file);
          programData.append("father", props.id);
        }

        api
          .post(`/api/${postTo}/`, programData, {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken
            }
          })

          .then(() => {
            props.loadData();
            props.closeModal();
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  return (
    <Modal
      title={`Título del nuevo ${newSon}`}
      visible={visible}
      onOk={e => handleSubmit(e)}
      onCancel={e => handleCancel(e)}
      footer={[
        <Button key="back" onClick={e => handleCancel(e)}>
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
        {postTo === "videos" ? (
          <Row justify="center" type="flex">
            <Form.Item>
              <Files ref={fileRef} upload="video" />
              {error ? (
                <Alert
                  message={error}
                  type="error"
                  closable
                  onClose={() => onClose()}
                />
              ) : null}
            </Form.Item>
          </Row>
        ) : null}

        <Form.Item label="Título" hasFeedback>
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: `Ingresa el título`,
                whitespace: true
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

const ModalCreate = Form.create({ name: "ModalCreate" })(ModalCreateForm);
export default ModalCreate;
