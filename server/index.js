const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

const { mongoose } = require("./database");
const app = express();

require("dotenv").config();

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

// Express session middleware
app.use(
  session({
    secret: "coachingANG",
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use("/api/users", require("./routes/user.routes"));

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

//Starting the server

app.listen(app.get("port"), () => {
  console.log(`Server is running on port: ${app.get("port")}`);
});
