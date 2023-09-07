import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Login from "./Views/Login/Login.jsx";
import RegisterUser from "./Views/RegisterUser/RegisterUser.jsx";
import RegisterCompany from "./Views/RegisterCompany/RegisterCompany.jsx";
import LandingPage from "./Views/LandingPage.jsx";
import Footer from "./components/Footer.jsx";
import CreateTrainings from "./Views/CreateTrainings/CreateTrainings.jsx";
import Home from "./Views/Home/Home.jsx";
import CreateJobs from "./Views/CreateJobs/CreateJobs.jsx";
import Trainings from "./Views/Trainings/Trainings.jsx";
import TrainingVideosPage from "./Views/Trainings/TrainingVideosPage.jsx";
import Offer from "./Views/Offers/Offers.jsx";
import ProfileUser from "./Views/UpdateProfile/ProfileUser.jsx";
import ProfileCompany from "./Views/UpdateProfile/ProfileCompany.jsx";

function App() {
  const account =
    localStorage.length !== 0 ? JSON.parse(localStorage.account) : "notFound";
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/create-trainings" element={<CreateTrainings />} />
        <Route path="/create-jobs" element={<CreateJobs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-trainings" element={<Trainings />} />
        <Route path="/home-offers" element={<Offer />} />
        <Route path="/trainings/:id" element={<TrainingVideosPage />} />
        <Route
          path={
            localStorage.length !== 0
              ? `/${account.name + account.lastName}`
              : "/login"
          }
          element={<ProfileUser />}
        />
        <Route path="/profile-company" element={<ProfileCompany />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
