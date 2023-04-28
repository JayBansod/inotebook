import "./App.css";
import Navbar from "./components/Navbar";
import Homee from "./components/Homee";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import NoteState from "./context/notes/NotesState";
function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homee />} />
          <Route exact path="/home" element={<Homee />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
