const express = require("express");

const router = express.Router();

// get all
router.get("/", (req, res) => {
  res.send("hello world");
});

// get one

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

// update one
router.patch("/:id", (req, res) => {});

// create one
router.post("/", (req, res) => {});

// delete one
router.delete("/:id", (req, res) => {});

module.exports = router;
