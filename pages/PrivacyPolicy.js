import React from "react";
import { Card, Typography } from "antd";

const { Text, Title } = Typography;

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <Card
        style={{
          margin: "1rem",
          marginTop: "2rem",
          boxShadow:
            " 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)",
          borderTopRightRadius: "30px",
          borderBottomLeftRadius: "30px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Text>
            <Title mark>Política de privacidad</Title>
          </Text>
        </div>

        <br />
        <Text>
          Dolore nostrud excepteur excepteur aliquip officia occaecat minim
          laborum qui consectetur occaecat excepteur ut. Enim Lorem mollit
          pariatur consectetur voluptate reprehenderit. Lorem sit esse commodo
          proident ut quis reprehenderit id ad consequat culpa. Consectetur anim
          quis esse dolore eiusmod ut laboris id dolor culpa. Veniam voluptate
          dolore ipsum in exercitation cupidatat nostrud ex officia amet et
          aliquip proident eu. Minim ea id laboris fugiat ex amet minim laborum
          ipsum sit.
        </Text>
        <br />
        <br />
        <Text>
          Dolore nostrud excepteur excepteur aliquip officia occaecat minim
          laborum qui consectetur occaecat excepteur ut. Enim Lorem mollit
          pariatur consectetur voluptate reprehenderit. Lorem sit esse commodo
          proident ut quis reprehenderit id ad consequat culpa. Consectetur anim
          quis esse dolore eiusmod ut laboris id dolor culpa. Veniam voluptate
          dolore ipsum in exercitation cupidatat nostrud ex officia amet et
          aliquip proident eu. Minim ea id laboris fugiat ex amet minim laborum
          ipsum sit.
        </Text>
        <br />
        <br />
        <Text>
          Dolore nostrud excepteur excepteur aliquip officia occaecat minim
          laborum qui consectetur occaecat excepteur ut. Enim Lorem mollit
          pariatur consectetur voluptate reprehenderit. Lorem sit esse commodo
          proident ut quis reprehenderit id ad consequat culpa. Consectetur anim
          quis esse dolore eiusmod ut laboris id dolor culpa. Veniam voluptate
          dolore ipsum in exercitation cupidatat nostrud ex officia amet et
          aliquip proident eu. Minim ea id laboris fugiat ex amet minim laborum
          ipsum sit.
        </Text>
        <br />
        <br />
      </Card>
    );
  }
}

export default PrivacyPolicy;
