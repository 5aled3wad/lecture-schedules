const express = require("express");
const router = express.Router();
const Userdata = require("../model/mongo");
const bcrypt = require("bcrypt-nodejs");
const { validationResult } = require("express-validator");
const passport = require("passport");
const salt = bcrypt.genSaltSync(10);
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const userValidator = require("../validator/user");

const API_KEY =
  "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";
const SINGLE_SENDER = '"table" sara.momo7112@gmail.com';

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: API_KEY,
    },
  })
);

// router to login page
router.get("/login", (req, res) => {
  res.render("users/login", {
    errorMessage: null,
    validationErrors: [],
  });
});

// post to login page
router.post("/login", userValidator.login, async (req, res) => {
  const email = req.body.email;
  const errors = validationResult(req);
  console.log("validateErrors:", errors);
  if (!errors.isEmpty()) {
    return res.render("users/login", {
      email: email,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  try {
    const check_user = await Userdata.Userdata.findOne({
      email: req.body.email,
    });

    if (!check_user) {
      return res.redirect("/users/alert_user");
    } else {
      const matchpass = bcrypt.compareSync(
        req.body.password,
        check_user.password
      );
      if (matchpass) {
        //session
        req.session.isLoggedIn = true;
        req.session.user = check_user;
        req.session.save((err) => {
          console.log(err);
          console.log("1------------------------------");
          return res.redirect("/events");
        });
      } else {
        return res.redirect("/users/alert_user");
      }
    }
  } catch (error) {
    return res.send(error);
  }
});

// router to sign page
router.get("/sign", (req, res) => {
  res.render("users/sign", {
    errorMessage: null,
    validationErrors: [],
  });
});

// router to alert page
router.get("/alert_user", (req, res) => {
  res.render("users/alert_user");
});

// post to sign page
router.post("/signup", userValidator.signup, async (req, res) => {
  const { email } = req.body;

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.render("users/sign", {
      email: email,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  try {
    const finduser = await Userdata.Userdata.findOne({
      email: email,
    });
    if (finduser) {
      res.redirect("/users/alert_user");
    } else {
      const hashpass = bcrypt.hashSync(req.body.password, salt, null);

      //generate token
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
          return res.redirect("/signup");
        }
        const token = buffer.toString("hex");
        const datauser = new Userdata.Userdata({
          email: req.body.email,
          password: hashpass,
          confirmToken: token,
          confirmTokenExpiration: Date.now() + 60000 * 120,
          isConfirmed: false,
        });

        datauser.save();

        //send confirmation messsage
        transporter
          .sendMail({
            to: email,
            from: SINGLE_SENDER,
            subject: "Confirm your signup.",
            html: `<h2>Dear ${email}</h2>

            <p>Thank you for signing up for our platform! </p>
            <p>To ensure that you have provided a valid email address</p>
            <p> please click on the link below to verify your account: <a href='http://localhost:3000/users/confirm/${token}'> Verify </a> </p>
            <p>If you did not sign up for our platform, please ignore this email.</p>
            <p>Thank you for your cooperation.</p>
            <p>Best regards,</p>
            <p>College Team</p>

            `,
          })
          .then((params) => {
            return res.redirect("/users/login");
          })
          .catch((err) => console.log("asdfa", err));
        // console.log("user data is add in database");
        // res.redirect("/users/login");
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get("/confirm/:token", async (req, res, next) => {
  const token = req.params.token;
  console.log(token);

  const user = await Userdata.Userdata.findOne({
    confirmToken: token,
    confirmTokenExpiration: { $gt: Date.now() },
  });
  user.isConfirmed = true;
  user.confirmToken = undefined;
  user.confirmTokenExpiration = undefined;
  user.save().then(() => {
    res.render("users/confirmSignup");
  });
});
// router to profil page
router.get("/profil", (req, res) => {
  res.render("users/profil");
});

// get to logout page
router.post("/logout", (req, res) => {
  console.log("logout");
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/events");
  });
});

module.exports = router;
