import api from "../api.js";
import cookie from "js-cookie";
import nextCookie from "next-cookies";
import Router from "next/router";

export const loginUser = async (email, password) => {
  api
    .post(`/rest-auth/login/`, JSON.stringify({ email, password }), {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      cookie.set("userdata", res.data);
      if (typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = res.data.user || {};
      }
      Router.push("/Blog");
    })
    .catch(err => {
      console.log(err);
    });
};

export const getClientSideToken = () => {
  if (typeof window !== "undefined") {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
    return { user };
  }
  return { user: {} };
};

export const getServerSideToken = ctx => {
  const { userdata = {} } = nextCookie(ctx);
  if (!userdata) {
    return {};
  } else if (!userdata.user) {
    return {};
  } else {
    return { user: userdata.user };
  }
};

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export const getUserScript = user => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};

export const authInitialProps = () => ({ ctx }) => {
  const auth = ctx.req ? getServerSideToken(ctx) : getClientSideToken();
  return { auth };
};

export const logoutUser = async () => {
  if (typeof window !== "undefined") {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }
  const csrftoken = cookie.get("csrftoken");
  api.post("/rest-auth/logout/", {}, { headers: { "X-CSRFToken": csrftoken } });
  cookie.remove("userdata");
  Router.push("/ingresar");
};
