const router = require("express").Router();
const { Invoice } = require("../models/invoice");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    Invoice.find({
      date: {
        $gte: new Date(req.body.date1),
        $lt: new Date(req.body.date2),
      },
    }).then((r) => {
      res.json(r);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

module.exports = router;
