import React, { useState } from "react";
import { Card, List, Typography, BackTop, Row, Skeleton } from "antd";
import styles from "../styles/styles.scss";
import api from "../api";

const { Text, Title } = Typography;

let a = [
  {
    name: "Jorge ivan villada lizarazo",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "ivan",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "johanna",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lina",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  },
  {
    name: "lady johanna trejos hernandez",
    email: "prueba@gmail.com",
    id_phone: "57",
    phone: "3214567890",
    location: { country: "Colombia", state: "Risaralda", city: "Pereira" }
  }
];
export default function Users(props) {
  const [data, setData] = useState(null);

  function checkAdmin(user) {
    return !user.is_admin;
  }

  function loadData() {
    api.get(`/api/users/`).then(res => {
      setData(res.data.filter(checkAdmin));
    });
  }

  return data ? (
    <div style={{ padding: "10px" }}>
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
          xl: 4,
          xxl: 4
        }}
        pagination={{
          pageSize: 8,
          position: "both"
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
            {item.is_admin == false ? (
              <Card
                title={
                  item.name.length > 27 ? (
                    <div className={styles.marquee}>
                      <div className={styles.marquee__inner}>
                        <div className={styles.marquee__content}>
                          {item.name}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>{item.name}</div>
                  )
                }
                headStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)"
                }}
                bordered={true}
                style={{
                  wordWrap: "break-word",
                  background: "#02DDCC",
                  width: "90%",
                  boxShadow:
                    " 0 5px 8px 0 rgba(0, 0, 0, 0.5), 0 9px 26px 0 rgba(0, 0, 0, 0.5)",
                  borderRadius: "7px"
                }}
              >
                <Text strong>Correo:</Text>
                <br />
                <Text>{item.email}</Text>

                <br />
                <br />
                <Text strong>Teléfono:</Text>
                <br />

                <a
                  href={`https://wa.me/${item.id_phone}${item.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>
                    {"+"}
                    {item.id_phone} {item.phone}
                  </Text>
                </a>

                <br />
                <br />
                <Text strong>Dirección:</Text>
                <br />
                <Text>
                  {item.city}
                  {", "} {item.state}
                  {", "}
                  {item.country}
                </Text>
              </Card>
            ) : null}
          </List.Item>
        )}
      />
    </div>
  ) : (
    <Skeleton active>{data == null ? loadData() : null}</Skeleton>
  );
}
