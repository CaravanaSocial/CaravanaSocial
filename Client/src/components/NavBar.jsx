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
        <div class="bg-light-1 dark:bg-dark-1">
            <button class="text-white dark:text-black">Home</button>
            <button class="text-white" onClick={handleThemeSwitch}>Dark Mode</button>
        </div>
    )
}