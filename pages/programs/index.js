import React, { useState } from "react";
import Link from "next/link";
import { Button, Collapse, Row, Col, Form, Empty } from "antd";

import Header from "../../comps/Header";
import styles from "../../styles/styles.scss";
import api from "../../api";
import ProgramSettings from "../../comps/ProgramSettings";
import ModalCreate from "../../comps/ModalCreate";
import { authInitialProps } from "../../utils/auth";

const { Panel } = Collapse;

function IndexProgram(props) {
  const { user = {} } = props.auth || {};
  const { data } = props;
  const [visible, setVisible] = useState(false);
  const [programs, setPrograms] = useState(data);

  function showModal() {
    setVisible(true);
  }

  function loadData() {
    api
      .get(`/api/programs/`)
      .then(res => {
        setPrograms(res.data);
        setVisible(false);
        props.form.resetFields();
      })
      .catch(err => console.log("Error al cargar los programas.", err));
  }

  const genExtra = (id, title) => (
    <ProgramSettings
      id={id}
      loadData={loadData}
      title={title}
      editTo="programs"
      create="modules"
      type="programa"
      newSon="módulo"
      {...props}
    />
  );

  function falseVisibleModal() {
    setVisible(false);
  }

  function getModules(modules, father) {
    if (modules.length > 0) {
      const moduleList = modules.map((module, index) => {
        return (
          <div key={module.id}>
            <Link
              href="/programs/program/[father]/[module]"
              as={`/programs/program/${father}/${module.id}`}
            >
              <a>{module.title}</a>
            </Link>
            {index < modules.length - 1 ? <hr /> : null}
          </div>
        );
      });
      return moduleList;
    } else {
      return (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60
          }}
          description={
            <span>Aún no se han creado módulos para este programa.</span>
          }
        ></Empty>
      );
    }
  }

  function getPrograms() {
    if (programs.length > 0) {
      const programList = programs.map((data, idx) => {
        return (
          <Panel
            header={data.title}
            key={idx}
            extra={user.is_admin ? genExtra(data.id, data.title) : null}
            className={styles.panel}
            style={{
              background: "rgba(220, 79, 128, 0.1)"
            }}
          >
            {getModules(data.modules, data.id)}
          </Panel>
        );
      });

      return (
        <Collapse
          accordion
          style={{
            wordWrap: "break-word",
            border: "1px solid rgba(220, 79, 128, 0.1)"
          }}
          defaultActiveKey={["0"]}
        >
          {programList}
        </Collapse>
      );
    } else {
      return (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60
          }}
          description={<span>Aún no se han creado programas.</span>}
        ></Empty>
      );
    }
  }

  return (
    <div className="container-fluid">
      <Header user={user} />
      {visible ? (
        <ModalCreate
          visible={visible}
          loadData={loadData}
          falseVisibleModal={falseVisibleModal}
          newSon="programa"
          postTo="programs"
          {...props}
        />
      ) : null}
      <div className={styles.wrapper_card}>
        <Row justify="center" type="flex">
          <h1 className={styles.sectionTitle}>Programas</h1>
        </Row>

        {user.is_admin ? (
          <Row>
            <Col xs={20} sm={12} md={10} lg={6} xl={6} xxl={5}>
              <Button
                block
                className={styles.defaultButton}
                onClick={() => showModal()}
              >
                Nuevo programa
              </Button>
            </Col>
          </Row>
        ) : null}
        <br />
        <br />

        {getPrograms()}
      </div>
    </div>
  );
}

IndexProgram.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(false)(ctx);
  const res = await api.get(`/api/programs/`);

  return { auth, data: res.data };
};

const Index = Form.create({ name: "Index" })(IndexProgram);
export default Index;
