import React, { useState } from "react";
import ModalCreate from "./ModalCreate";
import ModalEdit from "./ModalEdit";
import Delete from "../comps/Delete";
import { Menu, Dropdown, Icon, Form } from "antd";

function ProgramSettingsForm(props) {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { editTo, type, newSon, create } = props;

  function showModalModule(e) {
    // e.stopPropagation();
    setVisibleModal(true);
  }

  function handleCancel(e) {
    e.stopPropagation();
    console.log("handle Cancel: ", e);
    setVisible(false);
    props.form.resetFields();
  }

  function showModal() {
    setVisible(true);
  }

  function falseVisibleModal() {
    setVisibleModal(false);
  }

  function falseVisible() {
    setVisible(false);
  }

  const menu = id => (
    <Menu>
      <Menu.Item key="1">
        <a onClick={e => showModalModule(e)}>{`Nuevo ${newSon}`}</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={e => showModal(e)}>Cambiar nombre</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Delete
          type={editTo}
          handleCancel={handleCancel}
          loadData={props.loadData}
          id={id}
        />
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {visible ? (
        <ModalEdit
          visible={visible}
          editTo={editTo}
          id={props.id}
          title={props.title}
          falseVisible={falseVisible}
          loadData={props.loadData}
          type={type}
          father={props.father}
        />
      ) : null}
      {visibleModal ? (
        <ModalCreate
          visible={visibleModal}
          loadData={props.loadData}
          falseVisibleModal={falseVisibleModal}
          postTo={create}
          id={props.id}
          newSon={newSon}
          {...props}
        ></ModalCreate>
      ) : null}
      <Dropdown
        overlay={menu(props.id)}
        trigger={["click"]}
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      >
        <span>
          <Icon
            type="setting"
            style={{ fontSize: "23px", color: "#3949c6", marginRight: "3px" }}
            theme="filled"
          />
          Opciones
        </span>
      </Dropdown>
    </div>
  );
}

const ProgramSettings = Form.create({ name: "ProgramSetting" })(
  ProgramSettingsForm
);
export default ProgramSettings;
