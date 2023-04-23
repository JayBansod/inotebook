const express = require("express");
const router = express.Router();
const User = require("../models/User");
//for password encription
const bcrypt = require("bcryptjs");

// for validation
const { body, validationResult } = require("express-validator");

//importing jwt token
var jwt = require("jsonwebtoken");

//for giving token
const JWT_SECRET = "JayISGoodB$oy";

// Route 1: for create user
// create a user using : POST "/api/auth/createuser".no login required
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

      // password encreption
      const salt = await bcrypt.genSalt(10);
      // create password variable
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create user
      user = await User.create({
        name: req.body.name,
        password: secPass, //encripted password is save
        email: req.body.email,
      });
      // .then((user) => res.json(user))
      // .catch(
      //   (err) => console.log(err),
      //   res.json({ error: "Enter unique value" })
      // );

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur");
    }
  }
);

// Route 2: for  user login
// authintecate a user using /api/auth/login/  no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "cannot blank").exists(),
  ],
  async (req, res) => {
    //If there are errors , return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // array destructuring for getting the email and password from request body
    // const [email, password] = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "sorry no user exist" });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res.status(400).json({ error: "sorry password wrong" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server errors");
    }
  }
);

module.exports = router;
