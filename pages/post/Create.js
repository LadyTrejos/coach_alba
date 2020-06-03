import React, { useRef, useState, useEffect } from "react";
import Router from "next/router";
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

import Header from "../../comps/Header";
import Files from "../../comps/Files";
import api from "../../api";
import styles from "../../styles/styles.scss";
import { authInitialProps } from "../../utils/auth";

const { Text, Title } = Typography;
const { Panel } = Collapse;

function CreatePost(props) {
  const { user = {} } = props.auth || {};
  const fileRef = useRef(null);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
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
    <div className="container-fluid">
      <Header user={user} />
      <div className={`${styles.wrapper_card}`}>
        <Form onSubmit={e => handleSubmit(e, fileRef)}>
          <Row justify="center" type="flex">
            <h1 className={styles.sectionTitle}>Nueva publicación</h1>
          </Row>

          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
              <Form.Item label="Imagen de la publicación:">
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
            </Col>
          </Row>

          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
              <Form.Item label="Título de la publicación">
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "Ponle un título a tu publicación",
                      type: "string"
                    }
                  ]
                })(<Input placeholder="Título" size="large" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
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
            </Col>
          </Row>
          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
              <Collapse accordion style={{ wordWrap: "break-word" }}>
                <Panel
                  header="Vista previa de la publicación"
                  key="PreviewCreate"
                  className={styles.panel}
                >
                  <h3 className={styles.post__title}>
                    {props.form.getFieldValue("title")}
                  </h3>

                  <Text>{ReactHtmlParser(description)}</Text>
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <br />

          <Row justify="center" type="flex" gutter={20}>
            <Col xs={20} sm={12} md={10} lg={6} xl={6} xxl={5}>
              <Button
                htmlType="submit"
                className={styles.defaultButton}
                loading={loading}
                block
              >
                Crear publicación
              </Button>
            </Col>
            <Col xs={20} sm={12} md={10} lg={6} xl={6} xxl={5}>
              <Button
                block
                loading={loadingCancel}
                onClick={() => {
                  setLoadingCancel(true);
                  Router.push("/blog");
                }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

CreatePost.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(true)(ctx);

  return { auth };
};

const Create = Form.create({ name: "create" })(CreatePost);
export default Create;
