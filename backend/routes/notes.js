const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

// for validation
const { body, validationResult } = require("express-validator");

//Route 1:fetch all notes get /api/notes/fetchallnotes/ login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    console.log(req.user.id);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occur");
  }
});

//ROUTE 2: Add a new node using posr "/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must have 5 charecter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // const [title, description, tag] = req.body;
      //If there are errors , return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.body.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur");
    }
  }
);
module.exports = router;
