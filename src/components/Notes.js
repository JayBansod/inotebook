import React, { useContext } from "react";
import noteConText from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  // we created notecontext for accessing the valuse anywhere in the app
  // we use useContext for these
  const conText = useContext(noteConText);
  const { notes, addNote } = conText;
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <Noteitem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
