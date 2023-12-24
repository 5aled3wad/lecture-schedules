const { check, body } = require("express-validator");
const Userdata = require("../model/mongo");

module.exports.signup = [
  body("email")
    .isEmail()
    .withMessage("email is not valid.")
    .trim()
    // .custom((value, { req }) => {
    //   Userdata.Userdata.findOne({ email: value }).then((useDoc) => {
    //     if (!useDoc){
    //       console.log("Email already exists.");
    //       //this reject will be stored as an error message.
    //       return Promise.reject("Email already exists.");
    //     }
    //   })
    // }),
    ,
    body(
      "password",
      "Plese enter a pass with lenth more than or equal 5 ch."
    ).isLength({ min: 1 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
];
