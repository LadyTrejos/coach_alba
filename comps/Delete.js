import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import Cookies from "js-cookie";
import api from "../api";

export default function Delete(props) {
  const { type, id } = props;
  const [loadingExtra, setLoadingExtra] = useState(false);
  const [deleteItem, setDeleteItem] = useState(-1);

  function deleteElement(e, id) {
    console.log(`Eliminar el ${type} seleccionado`, id);
    e.stopPropagation();
    setLoadingExtra(true);
    setDeleteItem(id);
    const csrftoken = Cookies.get("csrftoken");

    api
      .delete(`/api/${type}/${id}`, {
        headers: {
          "X-CSRFToken": csrftoken
        }
      })
      .then(res => {
        props.loadData();
        setLoadingExtra(false);
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
      placement={"left" /*cambiar esto cuando se pone formato celular */}
    >
      <Button
        type="default"
        loading={loadingExtra && deleteItem == id}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        Eliminar
      </Button>
    </Popconfirm>
  );
}
