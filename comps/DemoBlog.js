import React, { useState } from "react";
import styles from "../styles/styles.scss";
import { List, Row, Card, Button } from "antd";
import Link from "next/link";
import Router from "next/router";
import ReactHtmlParser from "react-html-parser";

export default function Post(props) {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  function getDay(date) {
    const newDate = new Date(date);
    return newDate.getDate();
  }

  function getMonth(date) {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("es-co", { month: "short" });
    return month;
  }

  function getYear(date) {
    const newDate = new Date(date);
    return newDate.getFullYear();
  }

  function toCreate() {
    setLoading(true);
    Router.push("/post/create");
  }

  return (
    <div style={{ padding: "10px" }}>
      {props.demo ? null : user.is_admin ? (
        <Button
          onClick={() => toCreate()}
          className={styles.defaultButton}
          loading={loading}
        >
          Nueva publicación
        </Button>
      ) : null}
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
        pagination={
          props.pagination
            ? {
                pageSize: 6,
                position: null
              }
            : null
        }
        dataSource={props.demo ? props.post.slice(0, 3) : props.post}
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
                <Link href="/post/[id]" as={`/post/${item.id}`}>
                  <div
                    style={{
                      minWidth: "250px",
                      minHeight: "350px",
                      height: "50vh",
                      width: "45vh",
                      margin: "1rem"
                    }}
                  >
                    <a>
                      <img
                        style={{
                          height: "100%",
                          width: "100%"
                        }}
                        src={item.picture}
                        className={styles.thumbnail}
                      />
                    </a>
                  </div>
                </Link>

                <div className={styles.date}>
                  <span className={styles.day}>{getDay(item.created_at)}</span>
                  <span className={styles.month}>
                    {getMonth(item.created_at)}
                  </span>
                  <span className={styles.year}>
                    {getYear(item.created_at)}
                  </span>
                </div>

                <div className={styles.data}>
                  <div className={styles.content}>
                    <span className={styles.author}>Alba Nury Gonzalez L.</span>
                    <h1 className={styles.postTitle}>
                      <Link href="/post/[id]" as={`/post/${item.id}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h1>
                    <div className={styles.text}>
                      {ReactHtmlParser(item.description)}
                    </div>
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
