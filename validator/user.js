const { check, body } = require("express-validator");
const Userdata = require("../model/mongo");

module.exports.signup = [
  body("email")
    .isEmail()
    .withMessage("email is not valid.")
    .trim()
    ,
    body(
      "password",
      "Plese enter a pass with lenth more than or equal 5 ch."
    ).isLength({ min: 1 }),
    body("confirmpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
];

module.exports.login = [
  check("email", "Envalid  email.")
    .isEmail()
    .custom((value) => {
      return Userdata.Userdata.findOne({ email: value ,isConfirmed: true }).then((user) => {
        if (!user) {
          return Promise.reject("this email dosen't exists");
        }
      });
    })
    .trim(),
  check("password", "password must be at least 1 characters")
    .isLength({ min: 1 }),
];
