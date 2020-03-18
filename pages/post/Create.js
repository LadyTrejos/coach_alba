import React, { Component, useRef, useState, useEffect } from "react";
import Router from "next/router";

import Files from "../../comps/Files";
import api from "../../api";
import styles from "../../styles/styles.scss";
import {
  Collapse,
  Button,
  Form,
  Input,
  Row,
  Col,
  Card,
  Typography,
  Alert,
  message
} from "antd";
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";

const { Text, Title } = Typography;
const { Panel } = Collapse;

function CreatePost(props) {
  const { user } = props;
  const fileRef = useRef(null);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const { CKEditor, DecoupledEditor } = editorRef.current || {};
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
      spanish: require("@ckeditor/ckeditor5-build-decoupled-document/build/translations/es")
    };

    setEditorLoaded(true);
  }, []);

  function handleSubmit(event, fileRef) {
    const file = fileRef.current.state.selectedFile;
    !file ? setError("Ingresa una imagen") : setError(null);
    !description
      ? setErrorDescription("Ingresa el enunciado del post")
      : setErrorDescription(null);

    event.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err && file && description) {
        setLoading(true);
        let postData = new FormData();
        postData.append("picture", file);
        postData.append("title", values.title);
        postData.append("description", description);
        postData.append("owner", user.id);
        const csrftoken = Cookies.get("csrftoken");
        //Router.push("/post/[id]", `/post/${values.title}`);
        api
          .post(`/api/post/`, postData, {
            headers: {
              "Content-type": "multipart/form-data",
              "X-CSRFToken": csrftoken
            }
          })
          .then(res => {
            message.config({
              top: 90
            });
            message.success("Publicación creada correctamente.", 5);

            Router.push("/post/[id]", `/post/${res.data.id}`);
          })
          .catch(err => {
            setError(err);
          });
      }
    });
  }

  function onClose() {
    setError(null);
  }
  function onCloseDescription() {
    setErrorDescription(null);
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
                <Files ref={fileRef} upload="image"></Files>
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
            <Row>
              <Col className="gutter-row offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-12 col-sm-5 col-md-7 col-lg-5 col-xl-5">
                <Form.Item label="Título de la publicación">
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,
                        message: "Ponle un título a tu publicación",
                        type: "string"
                      }
                    ]
                  })(<Input placeholder="Título" size="large"></Input>)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="gutter-row offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-12 col-sm-8 col-md-10 col-lg-10 col-xl-8">
                <Form.Item label="Descripción de la publicación">
                  {editorLoaded ? (
                    <div>
                      <div id="toolbar-container"></div>
                      <CKEditor
                        onInit={editor => {
                          // Add the toolbar to the container

                          const toolbarContainer = document.querySelector(
                            "#toolbar-container"
                          );
                          toolbarContainer.appendChild(
                            editor.ui.view.toolbar.element,
                            editor.ui.view.editable.element
                          );

                          window.editor = editor;
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        config={{
                          language: "es",
                          toolbar: [
                            "Heading",
                            "|",
                            "fontFamily",
                            "fontSize",
                            "fontColor",
                            "fontBackgroundColor",
                            "|",
                            "bold",
                            "italic",
                            "underline",
                            "strikethrough",
                            "|",
                            "bulletedList",

                            "numberedList",
                            "|",
                            "alignment",
                            "link"
                            // "undo",
                            // "redo"
                          ],
                          fontSize: {
                            options: [9, 11, 13, "default", 17, 19, 21]
                          },
                          removePlugins: [
                            "ImageUpload",
                            "MediaEmbed",
                            "BlockQuote",
                            "IncreaseIndent"
                          ],
                          isReadOnly: true
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescription(data);
                          setErrorDescription(null);
                        }}
                        editor={DecoupledEditor}
                      />
                    </div>
                  ) : (
                    <div>Cargando... </div>
                  )}
                  {errorDescription ? (
                    <Alert
                      message={errorDescription}
                      type="error"
                      closable
                      onClose={() => onCloseDescription()}
                    />
                  ) : null}
                </Form.Item>

                <div>
                  <Collapse accordion style={{ wordWrap: "break-word" }}>
                    <Panel
                      header={`Vista previa del texto`}
                      key={`Vista previa`}
                      className={styles.panel}
                    >
                      <Row
                        justify="center"
                        type="flex"
                        style={{ paddingTop: "20px" }}
                      >
                        <Title>{props.form.getFieldValue("title")}</Title>
                      </Row>

                      <Row justify="center">
                        <Col
                          className="gutter-row"
                          // className="offset-1 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-10 col-sm-8 col-md-10 col-lg-10 col-xl-8"
                        >
                          <Text>{ReactHtmlParser(description)}</Text>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </div>
              </Col>
            </Row>
            <br />

            <Row justify="center" type="flex">
              <Button htmlType="submit" type="primary" loading={loading}>
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
