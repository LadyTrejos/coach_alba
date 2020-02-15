import React from "react";
import { Card, List, Typography, BackTop } from "antd";

const { Text, Title } = Typography;

class Users extends React.Component {
  a = [
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
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <BackTop />
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
          dataSource={this.a}
          renderItem={item => (
            <List.Item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: " 5px"
              }}
            >
              <Card
                title={
                  <marquee behavior="alternate" scrolldelay="500">
                    {" "}
                    {item.name}
                  </marquee>
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
                <Text>
                  {"+"}
                  {item.id_phone} {item.phone}
                </Text>
                <br />
                <br />
                <Text strong>Dirección:</Text>
                <br />
                <Text>
                  {item.location.city}
                  {", "} {item.location.state}
                  {", "}
                  {item.location.country}
                </Text>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Users;
