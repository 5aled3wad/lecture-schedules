const mongoose = require("mongoose");

// table schema
const eventSchema = mongoose.Schema({
  lectureName: {
    type: String,
    required: true,
  },
  instractor: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  timeH: {
    type: Number,
    required: true,
  },
  timeM: {
    type: Number,
    required: true,
  },
});
// table model
const Mydata = mongoose.model("Mydata", eventSchema);

// user schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmToken: String,
  confirmTokenExpiration: Date,
  isConfirmed: Boolean,
});

// user model
const Userdata = mongoose.model("Userdata", userSchema);

// export the models
module.exports = { Mydata, Userdata };
