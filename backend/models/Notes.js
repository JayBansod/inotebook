const mongoose = require("mongoose");
const NotesSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.module("notes", NotesSchema);
