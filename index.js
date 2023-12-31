const express = require("express");
const app = express();
const path = require("path");
const Mydata = require("./model/mongo");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const Userdata = require("./model/mongo");
const MONGODB_URL = "mongodb://localhost:27017/lectureTable";

const store = new MongoDBStore({ uri: MONGODB_URL, collection: "session" });

// ejs connection
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//
// app.use(passport.initialize());
// app.use(passport.session());

// عشان اقدر اوصل للملف
app.use(express.static("public"));
app.use(express.static("node_modules"));

//session
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//user
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  Userdata.Userdata.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//local views variabls passed to every view.
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});
// routes connection
const event = require("./routes/events");
app.use("/events", event);

const users = require("./routes/user_route");
app.use("/users", users);

const tables = require("./routes/tables");
app.use("/tables", tables);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("mongodb connected");
    app.listen(3000, () => {
      console.log("port connected");
    });
  })
  .catch(() => {
    console.log("Failed connect");
  });

// app.listen(3000, "192.168.1.16", () => {
