const express = require("express");
const router = express.Router();
const User = require("../models/User");
// for validation
const { body, validationResult } = require("express-validator");

// create a user using : POST "/api/auth/".Dosent require Auth
router.post(
  "/",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  (req, res) => {
    // for save without validation
    // console.log(req.body);
    // const user = User(req.body);
    // res.send(req.body);
    // user.save();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch(
        (err) => console.log(err),
        res.json({ error: "Enter unique value" })
      );
  }
);
module.exports = router;
