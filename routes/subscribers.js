const express = require("express");
const Subscriber = require("../models/subscriberModel");

const router = express.Router();

// middle ware function to get a sub and handles cases where they don't exist
const getSub = async (req, res, next) => {
  let sub;
  try {
    sub = await Subscriber.findById(req.params.id);
    if (sub === null) {
      return res
        .status(404)
        .json({ message: "User with that ID does not exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = sub;
  next();
};

// get all
router.get("/", async (req, res) => {
  try {
    const subs = await Subscriber.find();
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one
router.get("/:id", getSub, (req, res) => {
  res.json(res.subscriber);
});

// update one
router.patch("/:id", getSub, async (req, res) => {
  if (req.body.name !== null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedTo !== null) {
    res.subscriber.subscribedTo = req.body.subscribedTo;
  }
  try {
    const updatedSub = await res.subscriber.save();
    res.json(updatedSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create one
router.post("/", async (req, res) => {
  const sub = new Subscriber({
    name: req.body.name,
    subscribedTo: req.body.subscribedTo,
  });
  try {
    const newSub = await sub.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete one
router.delete("/:id", getSub, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).message({ message: err.message });
  }
});

module.exports = router;
