const express = require("express");
const router = express.Router();
const User = require("../models/User");
// for validation
const { body, validationResult } = require("express-validator");

// create a user using : POST "/api/auth/createuser".no lofin required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // for save without validation
    // console.log(req.body);
    // const user = User(req.body);
    // res.send(req.body);
    // user.save();

    //If there are errors , return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check weather the email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email exist" });
      }
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      // .then((user) => res.json(user))
      // .catch(
      //   (err) => console.log(err),
      //   res.json({ error: "Enter unique value" })
      // );
      res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur");
    }
  }
);
module.exports = router;
