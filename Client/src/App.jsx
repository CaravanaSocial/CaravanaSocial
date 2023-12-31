import React from "react";
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
import DetailOffer from "./Views/Offers/Detail/DetailOffer.jsx";
import ProfileUser from "./Views/UpdateProfile/ProfileUser.jsx";
import ProfileCompany from "./Views/UpdateProfile/ProfileCompany.jsx";
import VideosTrainings from "./Views/CreateTrainings/videosTrainings.jsx";
import FreelancerDetail from "./Views/Users/FreelancerDetail.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailTrainings from "./Views/Trainings/TrainingDatail.jsx";
import CompanyDetail from "./Views/CompanyDetail/CompanyDetail.jsx";
import CreateSuccesCase from "./Views/CreateSuccessCase/CreateSuccesCase.jsx";
import Freelancers from "./Views/Freelancers/Freelancers.jsx";
import AdminDashboard from "./Views/Admin/AdminDashboard.jsx";
import PresetBlog from "./components/Blog/PresetBlog.jsx";
import BlogDetail from "./components/Blog/BlogDetail.jsx";
import BlogHub from "./components/Blog/BlogHub.jsx";
import Faq from "./Views/Faq/Faq.jsx";
import PasswordChange from "./Views/UpdateProfile/PasswordChange.jsx";
import TerminosYCondiciones from "./Views/Terms/TerminosYCondiciones.jsx";

import Verification from "./Views/Verification/Verification.jsx";
import PasswordRecovery from "./Views/PasswordRecovery/PasswordRecovery.jsx";
import NotFound from "./components/NotFound.jsx";
import AcercaDeNosotros from "./Views/About/AboutUs.jsx";
import Index from "./Views/Developers/Developers.jsx";
import jwtDecode from 'jwt-decode';


function App() {
  const account =
    localStorage.length !== 0 ? JSON.parse(localStorage.account) : "notFound";
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const decodedToken = localStorage?.authorization ? jwtDecode(localStorage.authorization) : localStorage.clear()
    if(localStorage?.type && (localStorage.type !== decodedToken.type)){
      localStorage.setItem("type",decodedToken.type)
    }
  }, [location]);

  return (
    <div className="flex w-full flex-col h-[1000px]">
      <NavBar />
      <div className="flex-grow  flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/create-trainings" element={<CreateTrainings />} />
          <Route path="/create-jobs" element={<CreateJobs />} />
          <Route path="/create-success" element={<CreateSuccesCase />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-trainings" element={<Trainings />} />
          <Route path="/home-offers" element={<Offer />} />
          <Route path="/home-freelancers" element={<Freelancers />} />
          <Route path="/home-offers/:title" element={<DetailOffer />} />
          <Route path="/trainings/:id" element={<TrainingVideosPage />} />
          <Route path="/trainings/video/:id" element={<VideosTrainings />} />
          <Route path="/blog-create" element={<PresetBlog />} />
          <Route path="/blogs" element={<BlogHub />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/terms" element={<TerminosYCondiciones />} />

          <Route
            path={
              localStorage.length !== 0
                ? `/${account.name + account.lastName}`
                : "/login"
            }
            element={<ProfileUser />}
          />

          <Route path="/profile-company" element={<ProfileCompany />} />
          <Route path="/training/detail/:id" element={<DetailTrainings />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/freelancer/:id" element={<FreelancerDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/faq" element={<Faq />} />

          <Route path="/verification/:id" element={<Verification />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path=":name/changePassUser/:id" element={<PasswordChange />} />

          <Route path="/verification/:id/:code" element={<Verification />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />

          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<AcercaDeNosotros />} />
          <Route path="/developers" element={<Index />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
