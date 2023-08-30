import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Views/Login";
import NavBar from "./components/NavBar";


//****Todo lo relacionado con el tema del color debera pasarse a la NavBar****
function App() {
  const {pathname} = useLocation();
  
  return (
    <div>
      {pathname !== "/" && <NavBar/>}
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
    </div>
  );
}

export default App;
