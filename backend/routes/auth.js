const express = require("express");
const router = express.Router();
const User = require("../models/User");

// create a user using : POST "/api/auth/".Dosent require Auth
router.post("/", (req, res) => {
  console.log(req.body);
  const user = User(req.body);
  res.send(req.body);
  user.save();
});
module.exports = router;
