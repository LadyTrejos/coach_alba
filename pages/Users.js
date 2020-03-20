import React, { useState } from "react";
import { Card, List, Typography, BackTop, Row, Icon } from "antd";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

import Header from "../comps/Header";
import styles from "../styles/styles.scss";
import api from "../api";
import { authInitialProps } from "../utils/auth";

const { Text } = Typography;

let a = [
  {
    name: "Jorge ivan villada lizarazooooooooooooo",
    email: "prueba@gmail.commmmmmmmmmmmmmmmmmmmmmmm",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombiaaaaaaaaaaaaaaaaaaaaaaaaa",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "ivan",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lady johanna trejos hernandez calvo",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "johanna",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lina",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    country: "Colombia",
    state: "Risaralda",
    city: "Pereira"
  }
];

function Users(props) {
  const { user = {} } = props.auth || {};
  const data = props.data.filter(user => !user.is_admin);
  // const data = a;
  return (
    <div className="container pb-3">
      <Header user={user} />
      <BackTop />
      <Row justify="center" type="flex" className={styles.sectionTitle}>
        Usuarios
      </Row>
      <List
        itemLayout="horizontal"
        grid={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3
        }}
        pagination={{
          pageSize: 6,
          position: "both",
          total: data.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} usuarios.`
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: " 5px"
            }}
          >
            <div className={styles.user_card}>
              <div className={styles.user_card__head}>
                {item.name.length > 35 ? (
                  <div className={styles.marquee}>
                    <div className={styles.marquee__inner}>
                      <div className={styles.marquee__content}>
                        <div className={styles.user_card__title}>
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.user_card__title}>{item.name}</div>
                )}
              </div>
              <div className={styles.user_card__content}>
                <Text strong>
                  <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                  Correo electrónico:
                </Text>
                <br />
                <Text>{item.email}</Text>
                <br />
                <br />
                <Text strong>
                  <i className="fa fa-phone mr-2" aria-hidden="true"></i>
                  Teléfono:
                </Text>
                <br />
                <a
                  href={`https://wa.me/${item.id_phone}${item.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`+${item.id_phone} ${item.phone}`}
                </a>
                <br />
                <br />
                <Text strong>
                  <i className="fa fa-globe mr-2" aria-hidden="true"></i>
                  Ubicación:
                </Text>
                <br />
                <Text>{`${item.city}, ${item.state}, ${item.country}`}</Text>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

Users.getInitialProps = async ctx => {
  const { auth } = authInitialProps(true)(true)(ctx);
  const { csrftoken, userdata } = nextCookie(ctx);
  const res = await api.get(`/api/users/`, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${userdata.key}`
    }
  });

  // api
  //   .get(`/api/users/`, {
  //     withCredentials: true,
  //     headers: {
  //       "X-CSRFToken": csrftoken,
  //       Authorization: `Token ${userdata.key}`
  //     }
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(res => console.log(res));

  return { auth, data: res.data };
};

export default Users;
