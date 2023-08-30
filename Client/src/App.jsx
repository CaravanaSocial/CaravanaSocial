import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Views/Login";
import RegisterCompany from "./Views/RegisterCompany";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register-company" element={<RegisterCompany/>}/>
      </Routes>
    </div>
  );
}

export default App;
