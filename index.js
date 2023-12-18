const express = require("express");
const app = express();
const path = require("path");
const Mydata = require("./model/mongo");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");

// ejs connection
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//
// app.use(passport.initialize());
// app.use(passport.session());

// عشان اقدر اوصل للملف
app.use(express.static("public"));
app.use(express.static("node_modules"));

// routes connection
const event = require("./routes/events");
app.use("/events", event);

const users = require("./routes/user_route");
app.use("/users", users);

const tables = require("./routes/tables");
app.use("/tables", tables);

app.listen(3000, () => {
  console.log("port connected");
});
