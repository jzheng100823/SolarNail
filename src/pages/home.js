import React, { useState } from "react";
import Gallery from "./components/gallery";
import "./home.css";
import ControlledCarousel from "./components/carousel";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Footer from "../templates/footer";

const Home = () => {
  return (
    <div class="main">
      <div class="homeMain">
        <ControlledCarousel />
        <div className="homeMainChil">
          <Row className="row">
            <Col>
              <h3 style={{}}>Welcome to</h3>
              <h2 style={{ fontWeight: "bold", fontSize: 40 }}>Solar Nails</h2>
              <p>
                Established in 2007, we provide the highest quality of services
                in the nail beauty industry in Ohio. At Solar Nails, we make
                sure that the customer comes first in satifcation within our
                services as proven in our testamonials on google reviews. By
                understand and embracing our customers needs and with only the
                most experienced technicians, only the highest quality of
                services are available at this location. Come walk-in, book an
                appointment, or call for detail and see for yourself!
              </p>
            </Col>
            <Col>
              <img
                className="image"
                src="https://lh3.googleusercontent.com/p/AF1QipNHqNcJ2PDoFYk0UJRbipkS-vK8BYLr_-z_Ack=s680-w680-h510"
                alt="Second slide"
              />
            </Col>
          </Row>

          <div>
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
