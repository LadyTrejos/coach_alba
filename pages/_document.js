import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { getServerSideToken, getUserScript } from "../utils/auth";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);
    const userData = await getServerSideToken(ctx);
    // const { inspect } = require("util");
    // console.log(inspect(ctx));
    // console.log(ctx.req.headers.cookie);
    return { ...props, userData };
  }
  render() {
    const { user = {} } = this.props.userData;
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
