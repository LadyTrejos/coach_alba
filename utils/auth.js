import api from "../api.js";
import cookie from "js-cookie";
import nextCookie from "next-cookies";
import Router from "next/router";

export const loginUser = async (email, password) => {
  console.log("loginUser");
  const csrftoken = cookie.get("csrftoken");
  api
    .post(`/rest-auth/login/`, JSON.stringify({ email, password }), {
      headers: { "Content-type": "application/json", "X-CSRFToken": csrftoken }
    })
    .then(res => {
      Router.push("/blog", "/blog", { shallow: true });
      cookie.set("userdata", res.data);
      if (typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = res.data.user || {};
      }
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

export const authInitialProps = isProtectedRoute => isAdminRoute => ctx => {
  const { req = {} } = ctx;
  // const { inspect } = require("util");
  // console.log(inspect(ctx));
  const auth = req ? getServerSideToken(ctx) : getClientSideToken();
  const currentPath = req ? req.url : window.location.pathname;
  const user = auth.user;
  const isAnonymous = !user;

  if (isProtectedRoute && isAnonymous && currentPath !== "/ingresar") {
    console.log("ingresar");
    return redirectUser(ctx.res, "/ingresar");
  } else if (isProtectedRoute && isAdminRoute && !user.is_admin) {
    console.log("programs: ", ctx.res);
    return redirectUser(ctx.res, "/programs");
  }

  return { auth };
};

export const redirectUser = (res, path) => {
  if (res) {
    console.log(path);
    res.writeHead(302, {
      Location: path
    });
    res.end();
    return {};
  }
  console.log(path);
  Router.replace(path);
  return {};
};

export const logoutUser = async => {
  if (typeof window !== "undefined") {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }
  const csrftoken = cookie.get("csrftoken");
  api.post("/rest-auth/logout/", {}, { headers: { "X-CSRFToken": csrftoken } });
  cookie.remove("userdata");

  Router.push("/ingresar", "/ingresar", { shallow: true });
};
