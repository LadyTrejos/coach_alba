const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

const { mongoose } = require("./database");
const app = express();
const corsOptions = {
  origin: process.env.HOSTNAME,
  credentials: true
};
const isCookieSecure = process.env.NODE_ENV === "production" ? true : false;
// intercept pre-flight check for all routes

require("dotenv").config();

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: null,
      secure: isCookieSecure,
      httpOnly: isCookieSecure
    }
  })
);
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.HOSTNAME);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
// Routes
app.use("/api/users", require("./routes/user.routes"));

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
//Starting the server

app.listen(app.get("port"), () => {
  console.log(`Server is running on port: ${app.get("port")}`);
});
