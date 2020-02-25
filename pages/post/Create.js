import React, { Component, useRef, useState } from "react";
import Files from "../../comps/Files";
import { Button, Form, Input, Row, Col, Card, Typography, Alert } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

function CreatePost(props) {
  const fileRef = useRef(null);
  const [error, setError] = useState(null);
  const { getFieldDecorator } = props.form;

  function handleSubmit(event, fileRef) {
    const file = fileRef.current.state.selectedFile;
    !file ? setError("Ingresa un archivo") : setError(null);

    event.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err && file) {
        let postData = new FormData();
        postData.append("title", values.title);
        postData.append("description", values.description);
        postData.append("file", file);

        console.log("postData: ", postData.get("title"));
        // api
        //   .post(``, postData, {
        //     headers: { "Content-type": "multipart/form-data" }
        //   })
        //   .then(res => {
        //     console.log(res);
        //message.success('Publicación creada correctamente.',10)
        //     // Router.push("/");
        //   })
        //   .catch(err => {
        //     setErrors(err);
        //   });
      }
    });
  }

  function onClose() {
    setError(null);
  }

  return (
    <Form onSubmit={e => handleSubmit(e, fileRef)}>
      <Row>
        <Col className=" offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10">
          <Card
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              boxShadow:
                " 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.9)",
              borderRadius: "10px"
            }}
          >
            <Row justify="center" type="flex">
              <Title level={2}>Publicación</Title>
            </Row>

            <Row justify="center" type="flex">
              <Form.Item>
                <Files ref={fileRef}></Files>
                {error ? (
                  <Alert
                    message="Ingresa un archivo"
                    type="error"
                    closable
                    onClose={() => onClose()}
                  />
                ) : null}
              </Form.Item>
            </Row>
            <Row>
              <Col
                className="gutter-row"
                className="offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-12 col-sm-5 col-md-7 col-lg-5 col-xl-5"
              >
                <Form.Item label="Título de la publicación">
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,

                        message: "Ponle un título a tu publicación",
                        type: "string"
                      },
                      {
                        pattern: /^(?=.{1,1000}$)([a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ,.¿]+[\s(?!\s)]?)*[a-zA-Z0-9äáàëéèíìïöóòúüùñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ,.?]$/,
                        message: "Título no válido"
                      }
                    ]
                  })(<Input placeholder="Título" size="large"></Input>)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col
                className="gutter-row"
                className="offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-12 col-sm-8 col-md-10 col-lg-10 col-xl-8"
              >
                <Form.Item label="Descripción de la publicación">
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Ponle una descripción a tu publicación",
                        type: "string"
                      }
                    ]
                  })(
                    <TextArea
                      placeholder="Decribe tu publicación"
                      rows={8}
                      style={{ whiteSpace: "pre-line" }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" type="flex">
              <Button htmlType="submit" type="primary">
                Subir publicación
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}
const Create = Form.create({ name: "create" })(CreatePost);
export default Create;
