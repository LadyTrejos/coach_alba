import React, { useState } from "react";
import Router from "next/router";
import style from "../../styles/styles.scss";
import api from "../../api";
import ProgramSettings from "../../comps/ProgramSettings";
import ModalProgram from "../../comps/ModalProgram";
import { Collapse, Row, Button, Col, Typography, Form, Skeleton } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

let a = {
  day: ["Día 1", "Día 2"]
};

let Data = {};

//funcion principal
function IndexProgram(props) {
  const { user } = props;
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  const [programs, setPrograms] = useState(null);
  const [ready, setReady] = useState(false);

  function showModal(e, modal) {
    setVisible(true);
    setTypeModal(modal);
  }

  function loadData() {
    api
      .get(`/api/programs/`)
      .then(res => {
        setPrograms(res);
        setReady(true);
      })
      .then(res => {
        setVisible(false);
        props.form.resetFields();
      })
      .catch(err => console.log("error al cargar los programas ", err));
  }

  function daySelected(day) {
    Router.push("/programs/day/[day]", `/programs/day/${day}`);
  }

  const genExtra = (id, title) => (
    <ProgramSettings
      id={id}
      loadData={loadData}
      {...props}
      title={title}
    ></ProgramSettings>
  );

  function falseVisible() {
    setVisible(false);
  }

  return (
    <Row style={{ padding: "20px 0" }}>
      {visible ? (
        <ModalProgram
          visible={visible}
          loadData={loadData}
          falseVisible={falseVisible}
          typeModal={typeModal}
          {...props}
        ></ModalProgram>
      ) : null}

      <Col
        className="gutter-row"
        className="offset-sm-3 offset-md-2 offset-lg-2 offset-xl-2 col-12 col-sm-6 col-md-8 col-lg-8 col-xl-8"
      >
        <Row justify="center" type="flex">
          <Title> Programas</Title>
        </Row>
        {user.is_admin ? (
          <Button type="primary" onClick={e => showModal(e, "program")}>
            Nuevo programa
          </Button>
        ) : null}
        <br />
        <br />
        {ready ? (
          <Collapse accordion style={{ wordWrap: "break-word" }}>
            {programs.data.map(data => {
              return (
                <Panel
                  header={`${data.title} `}
                  key={`${data.id}`}
                  extra={user.is_admin ? genExtra(data.id, data.title) : null}
                  className={user.is_admin ? style.panel : null}
                >
                  {data.modules.map(module => {
                    return (
                      <div>
                        <Button
                          type="primary"
                          onClick={() => daySelected(module.id)}
                        >
                          {module.title}
                        </Button>
                        <br />
                        <br />
                      </div>
                    );
                  })}
                </Panel>
              );
            })}
          </Collapse>
        ) : (
          <div className="container">
            <Skeleton active>{ready == false ? loadData() : null}</Skeleton>
          </div>
        )}
      </Col>
    </Row>
  );
}

const Index = Form.create({ name: "Index" })(IndexProgram);
export default Index;
