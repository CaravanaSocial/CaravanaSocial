import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Views/Login/Login";
import RegisterUser from "./Views/RegisterUser/RegisterUser";
import RegisterCompany from "./Views/RegisterCompany/RegisterCompany";
import LandingPage from "./Views/LandingPage";
import Footer from "./components/Footer";
import CreateTrainings from "./Views/CreateTrainings/CreateTrainings";
import Home from "./Views/Home/Home";
import CreateJobs from "./Views/CreateJobs/CreateJobs";
import Trainings from "./Views/Trainings/Trainings";
import TrainingVideosPage from "./Views/Trainings/TrainingVideosPage";
import Offer from "./Views/Offers/Offers";
import ProfileUser from "./Views/UpdateProfile/ProfileUser";
import ProfileCompany from "./Views/UpdateProfile/ProfileCompany";

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
