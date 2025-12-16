import NavBar from "./component/MainPageComponent/NavBar";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import LearnPage from "./component/Learning/LearnPage"; 
import CourseSection from "./component/MainPageComponent/CourseSection";
import Footer from "./component/MainPageComponent/Footer";
import LoginPage from "./component/Login/LoginPage"; 
import RegisterPage from "./component/Login/RegisterPage";
import Quiz from "./component/Learning/Quiz";
import OTPVerification from "./component/Login/OtpVerification"; 
import PageNotFound from "./component/UtilComponents/404Page"; 
import CertificateVerificationPage from "./component/Learning/CertificateVerificationPage";
import AboutPage from "./component/MainPageComponent/AboutPage";
import Contact from "./component/MainPageComponent/Contact";
import HeroSection from "./component/MainPageComponent/Home";
import Profile from "./component/MainPageComponent/Profile";

function App() { 
  const location = useLocation();  
  const hideLayoutRoutes = ["/login", "/userinfo", "/register", "/learn/:language/assessment", "verify-otp", "forgot-password"]; 
  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return ( 
    <>
      {!shouldHideLayout && <NavBar />}
      <Routes>
        <Route path="/" element={<HeroSection />} /> 
        <Route path="/courses" element={<CourseSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/learn/:language" element={<LearnPage />} />
        <Route path="/learn/:language/:topic" element={<LearnPage />} />
        <Route path="/learn/:language/assessment" element={<Quiz />} /> 
        <Route path="/certificates/:certificateId" element={<CertificateVerificationPage/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile/:userid" element={<Profile/>} /> 

        //Auth Routes
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/verify-otp" element={<OTPVerification/>}/>

        // pageNotFound Routes 
        <Route path="*" element={<PageNotFound/>}/> 

      </Routes>
     {!shouldHideLayout && <Footer />} 
     </>
  );
}

export default App;
