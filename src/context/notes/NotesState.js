import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
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

  const noteInitiate = [
    {
      _id: "644ad00e567aa3bccc28d6a7",
      user: "644acfce567aa3bccc28d6a5",
      title: "hello",
      description: "this is new no",
      tag: "general",
      date: "2023-04-27T19:42:06.734Z",
      __v: 0,
    },
    {
      _id: "644c1c8815ac8f7e8f9c136d",
      user: "644acfce567aa3bccc28d6a5",
      title: "123",
      description: "this is new no",
      tag: "general",
      date: "2023-04-28T19:20:40.224Z",
      __v: 0,
    },
    {
      _id: "644c1c8f15ac8f7e8f9c136f",
      user: "644acfce567aa3bccc28d6a5",
      title: "456",
      description: "this is new no",
      tag: "general",
      date: "2023-04-28T19:20:47.482Z",
      __v: 0,
    },
    {
      _id: "644c1c9515ac8f7e8f9c1371",
      user: "644acfce567aa3bccc28d6a5",
      title: "789",
      description: "this is new no",
      tag: "general",
      date: "2023-04-28T19:20:53.072Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(noteInitiate);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
