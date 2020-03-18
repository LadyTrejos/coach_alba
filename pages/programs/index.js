import React, { useState } from "react";
import Link from "next/link";
import Header from "../../comps/Header";
import style from "../../styles/styles.scss";
import api from "../../api";
import ProgramSettings from "../../comps/ProgramSettings";
import ModalCreate from "../../comps/ModalCreate";
import { authInitialProps } from "../../utils/auth";
import {
  Collapse,
  Row,
  Button,
  Col,
  Typography,
  Form,
  Skeleton,
  Divider
} from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

//funcion principal
function IndexProgram(props) {
  const { user = {} } = props.auth || {};
  const { data } = props;
  const [visible, setVisible] = useState(false);
  const [programs, setPrograms] = useState(data);

  function showModal(e) {
    setVisible(true);
  }

  function loadData() {
    api
      .get(`/api/programs/`)
      .then(res => {
        setPrograms(res.data);
      })
      .then(res => {
        setVisible(false);
        props.form.resetFields();
      })
      .catch(err => console.log("error al cargar los programas ", err));
  }

  const genExtra = (id, title) => (
    <ProgramSettings
      id={id}
      loadData={loadData}
      {...props}
      title={title}
      editTo="programs"
      create="modules"
      type="programa"
      newSon="módulo"
    ></ProgramSettings>
  );

  function falseVisibleModal() {
    setVisible(false);
  }

  return (
    <Row style={{ padding: "20px 0" }}>
      <Header user={user} />
      {visible ? (
        <ModalCreate
          visible={visible}
          loadData={loadData}
          falseVisibleModal={falseVisibleModal}
          newSon="programa"
          postTo="programs"
          {...props}
        ></ModalCreate>
      ) : null}

      <Col
        className="gutter-row"
        className="offset-sm-3 offset-md-2 offset-lg-2 offset-xl-2 col-12 col-sm-6 col-md-8 col-lg-8 col-xl-8"
      >
        <Row justify="center" type="flex">
          <Title> Programas</Title>
        </Row>
        {user.is_admin ? (
          <Button type="primary" onClick={e => showModal(e)}>
            Nuevo programa
          </Button>
        ) : null}
        <br />
        <br />

        <Collapse
          accordion
          style={{ wordWrap: "break-word" }}
          defaultActiveKey={["0"]}
        >
          {programs.map((data, idx) => {
            return (
              <Panel
                header={`${data.title} `}
                key={idx}
                extra={user.is_admin ? genExtra(data.id, data.title) : null}
                className={user.is_admin ? style.panel : null}
              >
                {data.modules.map((module, index) => {
                  return (
                    <div key={module.id}>
                      <Link
                        href="/programs/program/[father]/[module]"
                        as={`/programs/program/${data.id}/${module.id}`}
                      >
                        <a>{module.title}</a>
                      </Link>
                      {index < data.modules.length - 1 ? <hr /> : null}
                    </div>
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </Col>
    </Row>
  );
}

IndexProgram.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(false)(ctx);
  const res = await api.get(`/api/programs/`);

  return { auth, data: res.data };
};

const Index = Form.create({ name: "Index" })(IndexProgram);
export default Index;
