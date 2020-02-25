import React from "react";
import { Row, Typography, Col, Card } from "antd";

const { Text, Title } = Typography;
import { useRouter } from "next/router";
import styles from "../../styles/styles.scss";

let post = [
  {
    // src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    // src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "prueba titulo",
    patagraph:
      "Magna consectetur dolor cillum deserunt cillum magna ullamco quis nulla excepteur deserunt. Esse incididunt quis deserunt proident consectetur. Nostrud quis nisi sunt veniam consectetur consectetur sit deserunt. Culpa sunt labore sit commodo. Consequat sint aliquip irure magna nisi eiusmod anim. Adipisicing voluptate velit mollit consequat aliquip occaecat cillum. In ex ad nostrud laborum excepteur ut do fugiat cillum ea ad. Laboris consectetur officia magna tempor officia veniam ex sunt consectetur. Quis et qui sit laboris pariatur quis cupidatat minim tempor do minim adipisicing. Do aliqua mollit qui laboris sunt consequat nisi culpa Ea proident velit commodo ipsum consequat dolor cillum ad veniam qui. Consectetur occaecat nostrud minim irure cupidatat id tempor laborum labore in id sunt commodo. Proident cillum proident aute consectetur Lorem occaecat officia eu ut nulla dolore. Cupidatat adipisicing minim exercitation sit anim anim tempor est officia officia elit aliqua eiusmod enim. Sit et proident proident consequat elit officia qui aute nostrud. Non exercitation deserunt ea tempor. Eu labore elit dolor ea cillum ex. Esse enim adipisicing esse elit officia dolor id dolore ullamco voluptate quis reprehenderit cupidatat Lorem. Sit fugiat ea amet officia veniam. Eu elit ex dolore consectetur ut. Non ex commodo ex consectetur cillum deserunt velit officia nulla. Ipsum aliquip in labore aliqua et irure fugiat. Excepteur culpa cillum fugiat ipsum. Sit pariatur quis minim mollit. Nisi aute sit dolor consectetur reprehenderit veniam.Aliquip consectetur dolor ea ut ut minim consequat officia. Do nostrud aute voluptate sunt sunt mollit non dolore ullamco consequat irure nisi amet. Adipisicing esse magna Lorem Lorem. Commodo adipisicing proident labore occaecat duis ullamco adipisicing et Lorem laborum dolor officia. Ullamco velit et est elit occaecat ullamco reprehenderit quis amet laboris cupidatat mollit laboris. Aliquip qui voluptate Lorem ullamco dolor irure mollit labore veniam. Anim consectetur sunt adipisicing laborum deserunt et quis aliquip. Dolor nisi sit duis proident pariatur officia. Eiusmod ad aute sint sint Lorem duis dolor duis sint qui culpa reprehenderit quis duis. Tempor id Lorem ea mollit cillum. Et laborum cupidatat deserunt deserunt excepteur voluptate nisi reprehenderit sit amet. Laboris cillum exercitation fugiat mollit consequat eiusmod labore dolore proident laborum veniam non. Reprehenderit fugiat Lorem ex do et aute. Est consectetur sint irure laborum proident do aliquip reprehenderit sint. Sunt do velit occaecat Lorem. Exercitation mollit labore consequat eiusmod consectetur minim velit eiusmod tempor officia ipsum cillum. Eu officia in consequat pariatur amet commodo. Officia laboris incididunt occaecat reprehenderit anim qui nulla dolor exercitation laboris ipsum aliquip. Adipisicing proident deserunt magna consectetur Lorem. Excepteur aute esse eu dolore occaecat."
  }
];

export default function Post(props) {
  const router = useRouter();
  console.log("router: ", router);
  console.log(post[0].src);
  return (
    <div>
      {/* {router.query.id} */}
      <Row justify="center" type="flex">
        <div
          style={{
            minWidth: "400px",
            minHeight: "350px",
            height: "40vh",
            width: "auto",
            margin: "1rem"
            // boxShadow:
            //   " 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <img
            src={post[0].src}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </Row>
      <Row justify="center" type="flex" style={{ paddingTop: "20px" }}>
        <Title>
          {post[0].title.charAt(0).toUpperCase() + post[0].title.slice(1)}
        </Title>
      </Row>
      <Row justify="center" style={{ fontSize: "17px" }}>
        <Col
          className="gutter-row"
          className="offset-1 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-2 col-10 col-sm-8 col-md-10 col-lg-10 col-xl-8"
        >
          <Text style={{ color: "#454646" }}>{post[0].patagraph}</Text>
        </Col>
      </Row>
    </div>
  );
}
