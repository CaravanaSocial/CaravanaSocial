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
        <div className="bg-custom-grey dark:bg-custom-white p-2">
            <button className="text-custom-white bg-custom-black rounded-xl mr-2 w-20 py-2 px-0"
            >Home</button>

            <input className="w-40 max-sm:w-36 px-2 py-2 bg-custom-black rounded-xl text-custom-white"
              type="text" />

            <button className="text-custom-white bg-custom-black rounded-xl ml-2 w-max-24 py-2 px-1"
              onClick={handleThemeSwitch}
            >Dark Mode</button>
        </div>
    )
}