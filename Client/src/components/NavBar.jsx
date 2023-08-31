import { useState, useEffect } from "react";

export default function NavBar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between bg-white dark:bg-zinc-900 border-b-2 border-b-zinc-100 dark:border-b-zinc-800 p-2">
      <button className="text-gray-500 font-medium text-sm max-sm:text-xs bg-gray-300 dark:bg-gray-300 rounded-3xl">
        Home
      </button>

      <div className="relative flex items-center w-30 h-5 mt-2.5 lg:w-64 group">
        <div className="absolute z-50 flex items-center justify-center w-30 h-10 p-3 pr-2 text-sm text-gray-500 cursor-pointer sm:hidden">
          <svg
            className="relative w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <svg
          className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
        <input
          className="block w-30 py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
          placeholder="Search"
          type="text"
        />
      </div>

      <div className="mt-1.5">
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            className="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            type="checkbox"
            name="toggle"
            id="toggle"
            onClick={handleThemeSwitch}
          />

          <label
            className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
            htmlFor="toggle"
          ></label>
        </div>
        <span className="font-medium text-gray-400">{theme}</span>
      </div>
    </div>
  );
}
