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
        </div>
      </HomeContent>
    </>
  );
};

export default Home;
