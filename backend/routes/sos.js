const express = require("express");

const router = express.Router();

//GET all users
router.get("/user", (req, res) => {
  res.json({ mssg: "List all users" });
});

//GET a single user
router.get("/user/:id", (req, res) => {
  res.json({ mssg: "GET a single user" });
});

//POST a new user
router.post("/user", (req, res) => {
  res.json({ mssg: "POST a new user" });
});

//DELETE a user
router.delete("/user/:id", (req, res) => {
  res.json({ mssg: "DELETE a user" });
});

//UPDATE a user's data
router.patch("/user/:id", (req, res) => {
  res.json({ mssg: "UPDATE a user's account information" });
});

module.exports = router;
