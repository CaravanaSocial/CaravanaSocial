import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Views/Login";
import RegisterUser from "./Views/RegisterUser/RegisterUser";
import RegisterCompany from "./Views/RegisterCompany";


function App() {
  const {pathname} = useLocation();
  
  return (
    <div>
      {pathname !== "/" && <NavBar/>}
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/register-company" element={<RegisterCompany/>}/>
        </Routes>
    </div>
  );
}

export default App;
