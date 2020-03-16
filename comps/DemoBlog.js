import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { List, Row, Button } from "antd";
import ReactHtmlParser from "react-html-parser";

import styles from "../styles/styles.scss";

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

  function getButton() {
    if (!props.demo && user.is_admin) {
      return (
        <Button
          onClick={() => toCreate()}
          className={`${styles.defaultButton} ml-4`}
          loading={loading}
        >
          Nueva publicación
        </Button>
      );
    } else {
      return null;
    }
  }

  function toCreate() {
    setLoading(true);
    Router.push("/post/create");
  }

  return (
    <div>
      {getButton()}
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
                  <div className={styles.imgWrapper}>
                    <a>
                      <img
                        style={{
                          height: "100%",
                          width: "100%"
                        }}
                        src={item.picture}
                        className={styles.thumbnail}
                        alt="Imagen de la publicación"
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
                    <br />
                    <Link href="/post/[id]" as={`/post/${item.id}`}>
                      <a className={styles.postTitle}>{item.title}</a>
                    </Link>
                    <div className={styles.blockWithText}>
                      <p class={styles.readMore}>
                        <Link href="/post/[id]" as={`/post/${item.id}`}>
                          <a className={styles.readMoreButton}>Leer más</a>
                        </Link>
                      </p>
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
