import React, { useContext } from "react";
import noteConText from "../context/notes/noteContext";
const Homee = () => {
  // we created notecontext for accessing the valuse anywhere in the app
  // we use useContext for these
  const conText = useContext(noteConText);
  const { notes, setNotes } = conText;
  return (
    <>
      <div className="container my-3">
        <h1>Add a Notes</h1>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <h1>Your Notes</h1>
      {notes.map((notes) => {
        return notes.title;
      })}
    </>
  );
};

export default Homee;
