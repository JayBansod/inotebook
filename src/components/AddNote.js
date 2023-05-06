import React, { useContext, useState } from "react";
import noteConText from "../context/notes/noteContext";

const AddNote = () => {
  //to access add note function written in NoteState.js
  const conText = useContext(noteConText);
  const { addNote } = conText;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handelClick = (e) => {
    console.log("adding note");
    addNote(note.title, note.description, note.tag);
    e.preventDefault();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h1>Add a Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handelClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
