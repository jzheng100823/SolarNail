import logo from "./logo.svg";
import "./App.css";
import Header from "./templates/header";


import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useState} from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import Booking from "./pages/booking";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Footer from "./templates/footer";
import {UserAuthContextProvider} from './pages/auth/userAuthContext';
import WalkIn from "./pages/walk-in";
import AdminPage from "./pages/admin/admin";
import SchedulePage from "./pages/admin/schedule";
import Availability from "./pages/admin/availability";
import MakeAppointment from "./pages/makeAppointment";
import 'devextreme/dist/css/dx.light.css';


function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
    <div className="page-container">
      <div className="content-wrap">
    <div class="mainbackground">
      <div class="childDiv"></div>
      <Header></Header>
      <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Booking />} /> 
          <Route path="/login" element={<Login /> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bookings/walk-in" element={<WalkIn />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/bookings/appointment" element={<MakeAppointment />} />
        </Routes>
      </Router>

      {/* <Footer/> */}
  </UserAuthContextProvider>
      
      </div>
      </div>
      </div>
      <Footer />
      </div>
  );
}

export default App;
