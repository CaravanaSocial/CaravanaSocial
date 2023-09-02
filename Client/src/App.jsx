import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Views/Login/Login";
import RegisterUser from "./Views/RegisterUser/RegisterUser";
import RegisterCompany from "./Views/RegisterCompany/RegisterCompany";
import LandingPage from "./Views/LandingPage";
import Footer from "./components/Footer";
import CreateTrainings from "./Views/CreateTrainings/CreateTrainings";
import HomeUsers from "./Views/HomeUsers/HomeUsers";
import CreateJobs from "./Views/CreateJobs/CreateJobs";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/create-trainings" element={<CreateTrainings />} />
        <Route path="/create-jobs" element={<CreateJobs />}/>
        <Route path="/homeUsers" element={<HomeUsers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
