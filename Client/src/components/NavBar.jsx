import React from "react";
import { useState, useEffect } from "react";

export default function NavBar () {
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
        <div className="bg-custom-blue">
            <button className="text-custom-white">Home</button>
            <button className="text-custom-white" onClick={handleThemeSwitch}>Dark Mode</button>
        </div>
    )
}