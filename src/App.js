import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homee from "./components/Homee";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import NoteState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  const [alert, setAlert] = useState("null");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert("null");
    }, 3500);
  };
  return (
    <>
      <NoteState>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Homee showAlert={showAlert} />} />
            <Route
              exact
              path="/home"
              element={<Homee showAlert={showAlert} />}
            />
            <Route
              exact
              path="/inotebook"
              element={<Homee showAlert={showAlert} />}
            />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            <Route exact path="*" element={<Error />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
