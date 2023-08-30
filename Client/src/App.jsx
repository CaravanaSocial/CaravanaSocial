import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Views/Login";
import NavBar from "./components/NavBar";
import RegisterCompany from "./Views/RegisterCompany";

function App() {
  const {pathname} = useLocation();
  
  return (
    <div>
      {pathname !== "/" && <NavBar/>}
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register-company" element={<RegisterCompany/>}/>
        </Routes>
    </div>
  );
}

export default App;
