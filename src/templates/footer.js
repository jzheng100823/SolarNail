import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/*column*/}
          <div className="col">
            <h4>Location</h4>
            <ul className="list-unstyled">
              <li>1235 Boardman Canfield RD</li>
              <li>Youngstown,OH</li>
              <li>44512</li>
            </ul>
          </div>
          <div className="col">
            <iframe
              width="300"
              height="200"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="-1"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=320&amp;height=300&amp;hl=en&amp;q=1235%20Boardman%20Canfield%20Road%20Canfield+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
          {/*column 2*/}
          <div className="col">
            <h4>Hours of Operation</h4>
            <ul className="list-unstyled">
              <li>Monday 10AM-7PM</li>
              <li>Tuesday 10AM-7PM</li>
              <li>Wednesday 10AM-7PM</li>
              <li>Thursday 10AM-7PM</li>
              <li>Friday 10AM-7PM</li>
              <li>Saturday 9AM-PM</li>
              <li>Sunday Closed</li>
            </ul>
          </div>
          <div className="col">
            <h4> Contact Us</h4>
            <ul className="list-unstyled">
              <li>Phone:(330)-758-2988</li>
            </ul>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} | All rights reserved | Terms of
            Services | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
