import React, { useContext } from "react";
import noteConText from "../context/notes/noteContext";

const Noteitem = (props) => {
  const conText = useContext(noteConText);
  const { deleteNote } = conText;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text ">{note.description}</p>
            <div className="d-flex align-items-center justify-content-between pt-2 my-2">
              <i
                className="fa-solid fa-trash fa-xl mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square fa-xl mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
