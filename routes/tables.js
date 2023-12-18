const express = require("express");
const router = express.Router();
const Mydata = require("../model/mongo");

// route to First_group table
router.get("/table1", async (req, res) => {
  const groups = ["First", "Second", "Third", "Fourth"];
  const group_num = await Mydata.Mydata.find({ group: groups[0] });
  const week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const houres = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  const a = 0;

  if (group_num) {
    res.render("tables/table1", {
      group_num: group_num,
      a: a,
      week: week,
      houres: houres,
    });
  }
});

// route to Second_group table
router.get("/table2", async (req, res) => {
  const groups = ["First", "Second", "Third", "Fourth"];
  const group_num = await Mydata.Mydata.find({ group: groups[1] });
  const week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const houres = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  const a = 0;

  if (group_num) {
    res.render("tables/table2", {
      group_num: group_num,
      a: a,
      week: week,
      houres: houres,
    });
  }
});

// route to Third_group table
router.get("/table3", async (req, res) => {
  const groups = ["First", "Second", "Third", "Fourth"];
  const group_num = await Mydata.Mydata.find({ group: groups[2] });
  const week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const houres = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  const a = 0;

  if (group_num) {
    res.render("tables/table3", {
      group_num: group_num,
      a: a,
      week: week,
      houres: houres,
    });
  }
});

// route to Fourth_group table
router.get("/table4", async (req, res) => {
  const groups = ["First", "Second", "Third", "Fourth"];
  const group_num = await Mydata.Mydata.find({ group: groups[3] });
  const week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const houres = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  const a = 0;

  if (group_num) {
    res.render("tables/table4", {
      group_num: group_num,
      a: a,
      week: week,
      houres: houres,
    });
  }
});

module.exports = router;
