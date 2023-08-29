import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Views/Login";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
