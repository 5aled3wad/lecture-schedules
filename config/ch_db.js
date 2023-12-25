const mongoose = require("mongoose");
const Mydata = require("../model/mongo");
// const Userdata = require("../model/mongo");

const new_event = [
  new Mydata({
    lectureName: "arabic",
    instractor: "khaled",
    location: "nader",
    group: "First",
    day: "Satrday",
    timeH: 12,
    timeM: 30,
  }),
];

// const user = [
//   new Userdata({
//     email: "awad@gmail",
//     password: "kh2001",
//   }),
//   new Userdata({
//     email: "awad@gmail",
//     password: "kh2001",
//   }),
// ];

new_event.forEach((event) => {
  event
    .save()
    .then(() => {
      console.log("data is saved");
    })
    .catch((e) => {
      console.log(e);
    });
});

// user.forEach((userdata) => {
//   userdata
//     .save()
//     .then(() => {
//       console.log("user data is saved");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

// user
//   .save()
//   .then(() => {
//     console.log("user data is saved");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
