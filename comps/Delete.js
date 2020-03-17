import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import Router from "next/router";
import Cookies from "js-cookie";
import api from "../api";

export default function Delete(props) {
  const { type, id } = props;
  const [loading, setLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(-1);

  function deleteElement(e, id) {
    console.log(`Eliminar el ${type} seleccionado`, id);
    e.stopPropagation();
    setLoading(true);
    setDeleteItem(id);
    const csrftoken = Cookies.get("csrftoken");

    api
      .delete(`/api/${type}/${id}`, {
        headers: {
          "X-CSRFToken": csrftoken
        }
      })
      .then(res => {
        if (type == "modules") {
          Router.push("/programs");
        } else {
          props.loadData();
        }
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <Popconfirm
      title="¿Eliminar?"
      onConfirm={e => deleteElement(e, id)}
      onCancel={e => props.handleCancel(e)}
      okText="Sí"
      cancelText="No"
      placement={"left"}
    >
      <Button
        type="default"
        loading={loading && deleteItem == id}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        Eliminar
      </Button>
    </Popconfirm>
  );
}
