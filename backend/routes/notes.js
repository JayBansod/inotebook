const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

// for validation
const { body, validationResult } = require("express-validator");

//Route 1:fetch all notes GET /api/notes/fetchallnotes/ login required
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

//ROUTE 2: Add a new node using POST "/api/notes/addnote" login required
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
      const { title, description, tag } = req.body;
      //If there are errors , return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur");
    }
  }
);

//ROUTE 3: Update a new node using PUT "/api/notes/updatenote" login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create newnote object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not Found");
    }

    //find user has access to it
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occur");
  }
});

//ROUTE 4: DELETE a new node using DELETE "/api/notes/deletenote" login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not Found");
    }

    //find user has access to it
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "deleted successfuly", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occur");
  }
});

module.exports = router;
