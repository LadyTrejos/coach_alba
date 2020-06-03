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
  message,
  Skeleton
} from "antd";
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";
import { authInitialProps } from "../../../utils/auth";
import Header from "../../../comps/Header";
import Files from "../../../comps/Files";
import api from "../../../api";
import styles from "../../../styles/styles.scss";

const { Text, Title } = Typography;
const { Panel } = Collapse;

function EditPost(props) {
  const { user = {} } = props.auth || {};
  const { data } = props;
  const [id, setId] = useState(data.id);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const fileRef = useRef(null);
  const editorRef = useRef();

  const [errorDescription, setErrorDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const { CKEditor, DecoupledEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);

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
    !description
      ? setErrorDescription("Escribe algo en la publicación.")
      : setErrorDescription(null);

    event.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err && description) {
        setLoading(true);
        let postData = new FormData();
        if (file) {
          postData.append("picture", file);
        }
        postData.append("title", title);
        postData.append("description", description);
        postData.append("owner", user.id);

        const csrftoken = Cookies.get("csrftoken");

        api
          .patch(`/api/post/${id}/`, postData, {
            headers: {
              "Content-type": "multipart/form-data",
              "X-CSRFToken": csrftoken
            }
          })
          .then(res => {
            message.config({
              top: 90
            });
            message.success("Publicación editada correctamente.", 5);

            Router.push("/post/[id]", `/post/${res.data.id}`);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  function onCloseDescription() {
    setErrorDescription(null);
  }

  return (
    <div className="container-fluid">
      <Header user={user} />
      <div className={`${styles.wrapper_card} pl-4`}>
        <Form onSubmit={e => handleSubmit(e, fileRef)} colon={false}>
          <Row justify="center" type="flex">
            <h1 className={styles.sectionTitle}>Editar publicación</h1>
          </Row>

          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
              <Form.Item label="Imagen de la publicación:">
                <Files ref={fileRef} upload="image"></Files>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
              <Form.Item label="Título de la publicación:">
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "Ponle un título a tu publicación",
                      type: "string"
                    }
                  ],
                  initialValue: title
                })(<Input placeholder="Título" size="large" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" type="flex">
            <Col xs={24} sm={24} md={20} lg={15} xl={17} xxl={15}>
              <Form.Item label="Descripción de la publicación:">
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
                      data={description}
                      editor={DecoupledEditor}
                    />
                  </div>
                ) : (
                  <Skeleton active />
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
                  key="Preview"
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
                loading={loading}
                block
                className={styles.defaultButton}
              >
                Guardar cambios
              </Button>
            </Col>
            <Col xs={20} sm={12} md={10} lg={6} xl={6} xxl={5}>
              <Button
                block
                loading={loadingCancel}
                onClick={() => {
                  setLoadingCancel(true);
                  Router.push("/post/[id]", `/post/${id}`);
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

EditPost.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(true)(ctx);
  const res = await api.get(`/api/post/${ctx.query.id}`);

  return { auth, data: res.data };
};

const Edit = Form.create({ name: "edit" })(EditPost);
export default Edit;
