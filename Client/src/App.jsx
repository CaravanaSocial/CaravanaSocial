import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname}
      <Routes>
        <Route path='/landing' element=""/>
      </Routes>
    </div>
  )
}

export default App
