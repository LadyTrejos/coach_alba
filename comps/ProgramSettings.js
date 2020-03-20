import React, { useState } from "react";
import { Menu, Dropdown, Icon, Form } from "antd";

import ModalCreate from "./ModalCreate";
import ModalEdit from "./ModalEdit";
import Delete from "../comps/Delete";
import styles from "../styles/styles.scss";

function ProgramSettingsForm(props) {
  const { editTo, type, newSon, create } = props;
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);

  function handleCancel(e) {
    e.stopPropagation();
    setVisibleEditModal(false);
    props.form.resetFields();
  }

  function showEditModal() {
    setVisibleEditModal(true);
  }

  function showCreateModal(e) {
    // e.stopPropagation();
    setVisibleCreateModal(true);
  }

  function closeEditModal() {
    setVisibleEditModal(false);
  }

  function closeCreateModal() {
    setVisibleCreateModal(false);
  }

  const menu = id => (
    <Menu>
      <Menu.Item key="1">
        <a onClick={e => showCreateModal(e)}>{`Nuevo ${newSon}`}</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={e => showEditModal(e)}>Cambiar nombre</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Delete
          type={editTo}
          handleCancel={handleCancel}
          loadData={props.loadData}
          id={id}
          block={false}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {visibleEditModal ? (
        <ModalEdit
          id={props.id}
          editTo={editTo}
          type={type}
          father={props.father}
          loadData={props.loadData}
          title={props.title}
          closeModal={closeEditModal}
          visible={visibleEditModal}
        />
      ) : null}
      {visibleCreateModal ? (
        <ModalCreate
          id={props.id}
          postTo={create}
          newSon={newSon}
          loadData={props.loadData}
          closeModal={closeCreateModal}
          visible={visibleCreateModal}
          {...props}
        />
      ) : null}
      <Dropdown
        overlay={menu(props.id)}
        trigger={["click"]}
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      >
        <i
          className={`fa fa-cogs ${styles.config_icon}`}
          aria-hidden="true"
        ></i>
      </Dropdown>
    </div>
  );
}

const ProgramSettings = Form.create({ name: "ProgramSetting" })(
  ProgramSettingsForm
);
export default ProgramSettings;
