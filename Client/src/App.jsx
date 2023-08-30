import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Views/Login";
import { useState, useEffect } from "react";
//****Todo lo relacionado con el tema del color debera pasarse a la NavBar****
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark"){
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  
  return (
    <div>
      <button class="text-white" onClick={handleThemeSwitch}>Dark Mode</button>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
