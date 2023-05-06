import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  // const s1 = {
  //   name: "jay",
  //   class: "5c",
  // };
  // const [state, setState] = useState(s1);
  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       name: "dipti",
  //       class: "10c",
  //     });
  //   }, 1000);
  // };

  const noteInitiate = [];
  const [notes, setNotes] = useState(noteInitiate);

  //Get all note
  const getNotes = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWNmY2U1NjdhYTNiY2NjMjhkNmE1In0sImlhdCI6MTY4MjYyNDQ2Mn0.0lLc_-ecMx4GEPiX3p-JJ3_rIeOlOmbAfaZ-F6OF7J8",
      },
    });
    const json = await response.json();
    console.log(json);

    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWNmY2U1NjdhYTNiY2NjMjhkNmE1In0sImlhdCI6MTY4MjYyNDQ2Mn0.0lLc_-ecMx4GEPiX3p-JJ3_rIeOlOmbAfaZ-F6OF7J8",
      },
      body: JSON.stringify([title, description, tag]),
    });
    console.log("adding a note");
    const note = {
      _id: "644ad00e567aa3bccc28d6a7",
      user: "644acfce567aa3bccc28d6a5",
      title: title,
      description: description,
      tag: tag,
      date: "2023-04-27T19:42:06.734Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete Node
  const deleteNote = (id) => {
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
    console.log("deleting " + id);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YWNmY2U1NjdhYTNiY2NjMjhkNmE1In0sImlhdCI6MTY4MjYyNDQ2Mn0.0lLc_-ecMx4GEPiX3p-JJ3_rIeOlOmbAfaZ-F6OF7J8",
      },
      body: JSON.stringify([title, description, tag]),
    });
    // const json = response.json();
    // logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
