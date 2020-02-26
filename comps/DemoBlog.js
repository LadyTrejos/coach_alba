import React from "react";
import styles from "../styles/styles.scss";
import { List, Row, Card, Button } from "antd";
import Link from "next/link";

class DemoBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: null,
      visible: false,
      item: {
        title: "",
        description: "",
        src: ""
      }
    };
  }

  componentDidMount() {
    this.props.pagination
      ? this.setState({
          pagination: {
            pageSize: 6,
            position: null
          }
        })
      : null;
  }

  render() {
    console.log("Blog Props: ", this.props);
    return (
      <div style={{ padding: "10px" }}>
        {this.props.demo ? null : (
          <Button type="primary" href="/post/create">
            Nueva publicación
          </Button>
        )}
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
          pagination={this.state.pagination}
          dataSource={
            this.props.demo ? this.props.post.slice(0, 3) : this.props.post
          }
          renderItem={item => (
            <List.Item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: " 5px"
              }}
            >
              <Row className={`${styles.postcard} ${styles.card}`}>
                <div className={styles.wrapper}>
                  {console.log("item.title: ", item.title)}
                  <Link href="/post/[id]" as={`/post/${item.title}`}>
                    <img src={item.src} className={styles.thumbnail} />
                  </Link>
                  <div className={styles.date}>
                    <span className={styles.day}>12</span>
                    <span className={styles.month}>Aug</span>
                    <span className={styles.year}>2016</span>
                  </div>
                  <div className={styles.data}>
                    <div className={styles.content}>
                      <span className={styles.author}>Jane Doe</span>
                      <h1 className={styles.postTitle}>
                        <Link href="/post/[id]" as={`/post/${item.title}`}>
                          Boxing icon has the will for a couple more fights
                        </Link>
                      </h1>
                      <p className={styles.text}>
                        Dolore minim ad anim adipisicing quis. Tempor eu sint
                        irure minim. Nostrud ad excepteur eiusmod veniam commodo
                        sit amet aute occaecat minim eu. Sint ipsum sint ex
                        tempor cillum officia reprehenderit dolor in fugiat
                        nulla quis tempor. Sit nostrud consectetur id incididunt
                        ex dolor. Sunt laboris enim ipsum et ad. Do veniam nulla
                        proident proident proident reprehenderit anim amet. Anim
                        in minim ad consequat ad laborum eu voluptate in
                        consequat. Cillum occaecat magna excepteur cupidatat qui
                        proident. Consequat velit amet id Lorem commodo eiusmod.
                        Do enim exercitation sunt esse aliqua sit aute enim
                        laboris ipsum. Dolor excepteur dolore anim esse sit
                        labore nulla. Tempor nulla Lorem incididunt sunt labore
                        et nulla ad sint pariatur consectetur dolore culpa. Quis
                        id ut do officia anim nulla cupidatat amet tempor dolor.
                        Qui ad eu excepteur adipisicing qui veniam voluptate.
                        Nulla officia et adipisicing commodo duis ipsum dolor
                        laboris reprehenderit aliquip. Ullamco in mollit
                        consectetur ullamco elit ullamco ipsum voluptate qui.
                        Aliqua dolore labore magna velit culpa commodo excepteur
                        mollit occaecat. Mollit sunt dolore quis nulla aliqua
                        tempor occaecat commodo ea. Duis nostrud ipsum
                        adipisicing mollit ad sunt.
                      </p>
                    </div>
                  </div>
                </div>
              </Row>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default DemoBlog;
