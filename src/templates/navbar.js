import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Icon from "./icon";
import "./navbarstyle.css";
import isAdminUser from '../services/admin';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    isAdminUser().then(x => {
      if (x != "loading")
        setIsAdmin(x)
    });
  });

   const auth = getAuth();
   const [username, setUsername] = useState('');

  onAuthStateChanged(auth, (user) => {
    user != null ? setUsername(user.displayName ?? user.email) : setUsername(null);
  });

  const LogOut = () => {
    auth.signOut().then(() => {
      alert("You have signed out");
    }).catch(x => {
      console.log(x);
    })
  }

  const [page, setPage] = useState("");
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <Icon/>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarControl"
        aria-controls="navbarControl"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarControl">
        <ul class="navbar-nav" id="navbar">
          <li class="nav-item active">
            <a href="/">Home</a>
          </li>
          <li class="nav-item">
            <a href="/services">Services</a>
          </li>
          <li class="nav-item">
            <a href="/bookings">Bookings</a>
          </li>
          <li class="nav-item">
            <a href="/about">Technicians</a>
          </li>
          {isAdmin &&
          <li class="nav-item">
            <a href="/admin">Admin</a>
          </li>
          } 
          {isAdmin &&
            <li class="nav-item">
              <a href="/availability">Availability</a>
            </li>
          }
          {isAdmin &&
            <li class="nav-item">
              <a href="/schedule">Schedule</a>
            </li>
          }
        </ul>
      </div>

      {username &&
            <div class="collapse navbar-collapse" id="navbarControl">
              <ul class="navbar-nav" id="navbar">
              <li class="nav-item">
                <p style={{color: 'white'}}>Welcome {username}</p>
              </li>
              <li class="nav-item">
                <a style={{color: 'white'}} onClick={LogOut}>Log Out</a>
              </li>
              </ul>
            </div>
      }

      {!username &&
      <div class="collapse navbar-collapse" id="navbarControl">
        <ul class="navbar-nav" id="navbar">
        <li class="nav-item">
        <a style={{color: 'white'}} href="/login">Login</a>
        </li>
        </ul>
      </div>   
    } 
    </nav>
  );
};

export default Navbar;
