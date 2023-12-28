const express = require("express");
const router = express.Router();
const Mydata = require("../model/mongo");
const isAuth = require("../auth/isAuth");

// route to index page
router.get("/", (req, res) => {
  console.log("user:", req.user);
  res.render("events/home");
  // console.log(req.session);
});

// route to create page
router.get("/create", isAuth, (req, res) => {
  res.render("events/create", {});
});

// route to alert page
router.get("/alert", (req, res) => {
  res.render("events/alert");
});

// Create event
router.post("/create", isAuth, async (req, res) => {
  const check1 = await Mydata.Mydata.findOne({
    timeH: req.body.timeH,
    day: req.body.day,
    group: req.body.group,
  });
  const check2 = await Mydata.Mydata.findOne({
    timeH: req.body.timeH,
    day: req.body.day,
    location: req.body.location,
  });
  // const check3 = await Mydata.Mydata.findOne({
  //   timeH: req.body.timeH,
  //   day: req.body.day,
  //   location: req.body.location,
  // });
  if (check2 || check1) {
    res.redirect("/events/alert");
  } else {
    const creatdata = new Mydata.Mydata({
      lectureName: req.body.lectureName,
      instractor: req.body.instractor,
      location: req.body.location,
      group: req.body.group,
      day: req.body.day,
      timeH: req.body.timeH,
      timeM: 0,
    })
      .save()
      .then(() => {
        console.log("data created");
        res.redirect("/events");
      })
      .catch((e) => {
        console.log(e);
      });
  }
});

// // route to show event page
// router.get("/:id", async (req, res) => {
//   // console.log(req.params.id);
//   const event = await Mydata.findOne({ _id: req.params.id });
//   if (event) {
//     res.render("events/show", {
//       event: event,
//     });
//   }
// });

// route to edit page
router.get("/edit/:id", isAuth, async (req, res) => {
  const event = await Mydata.Mydata.findOne({ _id: req.params.id });
  if (event) {
    res.render("events/edit", {
      event: event,
    });
  }
});

// Update event
router.post("/update/:id", isAuth, async (req, res) => {
  try {
    const check1 = await Mydata.Mydata.findOne({
      timeH: req.body.timeH,
      day: req.body.day,
      group: req.body.group,
    });
    const check2 = await Mydata.Mydata.findOne({
      timeH: req.body.timeH,
      day: req.body.day,
      location: req.body.location,
    });
    if (check2 || check1) {
      res.redirect("/events/alert");
    } else {
      const event_id = { _id: req.params.id };
      const newevent = {
        $set: {
          lectureName: req.body.lectureName,
          instractor: req.body.instractor,
          location: req.body.location,
          group: req.body.group,
          day: req.body.day,
          timeH: req.body.timeH,
          timeM: req.body.timeM,
        },
      };
      await Mydata.Mydata.updateOne(event_id, newevent).then(() => {
        console.log("event updated");
        res.redirect("/events");
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// route to delete page
router.get("/delete/:id", async (req, res) => {
  // res.render("/events/delete");
  const event = await Mydata.Mydata.findOne({ _id: req.params.id });
  if (event) {
    res.render("events/delete", {
      event: event,
    });
  }
});

// Delete event
router.post("/delete/:id", async (req, res) => {
  const event_id = { _id: req.params.id };
  await Mydata.Mydata.deleteOne(event_id)
    .then(() => {
      console.log("event deleted");
      res.redirect("/events");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
