import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import RegisterUser from "./Views/RegisterUser/RegisterUser";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/registerUser" element={<RegisterUser />} />
      </Routes>
    </div>
  );
}

export default App;
