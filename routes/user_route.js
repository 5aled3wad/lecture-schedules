const express = require("express");
const router = express.Router();
const Userdata = require("../model/mongo");
const bcrypt = require("bcrypt-nodejs");
const { validationResult } = require("express-validator");
const passport = require("passport");
const salt = bcrypt.genSaltSync(10);
const userValidator = require('../validator/user')
// router to login page
router.get("/login", (req, res) => {
  res.render("users/login");
});

// post to login page
router.post("/login", async (req, res) => {
  try {
    const check_user = await Userdata.Userdata.findOne({
      email: req.body.email,
    });

    if (!check_user) {
      res.redirect("/users/alert_user");
    } else {
      const matchpass = bcrypt.compareSync(
        req.body.password,
        check_user.password
      );
      if (matchpass) {
        res.redirect("/users/profil");
        console.log("Login successfully");
      } else {
        res.redirect("/users/alert_user");
      }
    }
  } catch (error) {
    res.send(error);
  }
});

// router to sign page
router.get("/sign", (req, res) => {
  res.render("users/sign");
});

// router to alert page
router.get("/alert_user", (req, res) => {
  res.render("users/alert_user");
});

// post to sign page
router.post("/signup",userValidator.signup, async (req, res) => {
  const {email} = req.body;

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()){
    return res.render('users/sign',{
      email: email,
      errorMessage:errors.array()[0].msg,
      validationErrors: errors.array(),
    })
  }

  try {
    const finduser = await Userdata.Userdata.findOne({
      email: email,
    });
    if (finduser) {
      res.redirect("/users/alert_user");
    } else {
      const hashpass = bcrypt.hashSync(req.body.password, salt, null);
      const datauser = new Userdata.Userdata({
        email: req.body.email,
        password: hashpass,
      })
        .save()
        .then(() => {
          console.log("user data is add in database");
          res.redirect("/users/login");
        });
    }
  } catch (error) {
    res.send(error);
  }
});

// router to profil page
router.get("/profil", (req, res) => {
  res.render("users/profil");
});

// // get to logout page
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/users/login");
// });

module.exports = router;
