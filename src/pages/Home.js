import React from "react";
import { HomeContent } from "../globalStyles";
import Carousel from "react-bootstrap/Carousel";

import Background1 from "../components/AddPage/Horse.jpg";
import Background2 from "../components/AddPage/MyTrails.jpg";
import Background3 from "../components/AddPage/MyCamps.jpg";

const Home = () => {
  return (
    <>
      <HomeContent>
        <div className=" mb-3 mx-auto " style={{ width: "100%" }}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Background1}
                alt="First slide"
              />

              <Carousel.Caption
                style={{
                  bottom: "50%",
                }}
              >
                <h1 style={{ fontSize: "10vw" }}>Predictive</h1>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Background2}
                alt="Second slide"
              />
              <Carousel.Caption
                style={{
                  bottom: "50%",
                }}
              >
                <h1 style={{ fontSize: "10vw" }}>Adoptive</h1>
              </Carousel.Caption>{" "}
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Background3}
                alt="Third slide"
              />
              <Carousel.Caption
                style={{
                  bottom: "50%",
                }}
              >
                <h1 style={{ fontSize: "10vw" }}>Result Oriented</h1>
              </Carousel.Caption>{" "}
            </Carousel.Item>
          </Carousel>
          <br></br>
          <h2 style={{ textAlign: "center" }}>About Us</h2>
          <div style={{ padding: "10px" }}>
            California has hundreds of camps and thousands of trails open to
            horses. Finding trails to ride and places to camp with your horse
            shouldn't be difficult. Hoof-it is a crowd source app where
            equestrians can share their favorite places to ride. The goal is to
            create a comprehensive list that makes it easy to search for your
            next adventure and share the most current information.
          </div>
          <br></br>
          <h2 style={{ textAlign: "center" }}>Mission</h2>
          <div style={{ textAlign: "center" }}>
            "To enable more people to use the trails so they can be maintained
            and sustained  for the future."
          </div>
        </div>
      </HomeContent>
    </>
  );
};

export default Home;
