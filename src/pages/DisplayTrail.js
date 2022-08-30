import { React, useEffect, useState } from "react";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const styles = {
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default function DisplayTrail() {
  const [trailDetails, setTrailDetails] = useState({});
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const [reviewResult, setReviewResult] = useState("");

  const [ratings, setRatings] = useState([]);
  const [rateFilled, setRateFilled] = useState(0);

  const handleClick = (value) => {
    setCurrentValue(value);
    FireStoreService.addRatings("tTXVdpQDIEaipok5TJPV", value)
      .then(() => {
        setReviewResult("Review submitted successfully");
      })
      .catch((e) => {
        setReviewResult("Error occurred! Please try again.");
      });
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  useEffect(() => {
    FireStoreService.getTrail("tTXVdpQDIEaipok5TJPV")
      .then((response) => {
        console.log(response.data());
        setTrailDetails(response.data());
        const pathBanner = trailDetails.trailName;
        FireStoreService.getTrailImages(
          "banners/" + pathBanner,
          trailDetails.bannerName
        )
          .then((res) => {
            const bannerImg = document.getElementById("banner");
            bannerImg.setAttribute("src", res);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + trailDetails.trailName,
          trailDetails.imageGal1Name
        )
          .then((gal1) => {
            const imageGal1 = document.getElementById("imageGal1");
            imageGal1.setAttribute("src", gal1);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + trailDetails.trailName,
          trailDetails.imageGal2Name
        )
          .then((gal2) => {
            const imageGal2 = document.getElementById("imageGal2");
            imageGal2.setAttribute("src", gal2);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + trailDetails.trailName,
          trailDetails.imageGal3Name
        )
          .then((gal3) => {
            const imageGal3 = document.getElementById("imageGal3");
            imageGal3.setAttribute("src", gal3);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "parking/" + trailDetails.trailName,
          trailDetails.parkingImageName
        )
          .then((parkingImg) => {
            const parkingImage = document.getElementById("parkingImage");
            parkingImage.setAttribute("src", parkingImg);
          })
          .catch((e) => {
            console.log(e);
          });
        displayTrailUsers("hikers", trailDetails.hikers);
        displayTrailUsers("dogs", trailDetails.dogs);
        displayTrailUsers("bikers", trailDetails.bikers);
        displayTrailUsers("atvOrOffroad", trailDetails.atvOrOffroad);
        displayObstacles(trailDetails.obstaclesCheck.obstacles);
        displaySeasons(trailDetails.bestSeasonsCheck.bestSeasons);
        displayTrailHeads(trailDetails.trailHeadCheck.trailHead);

        FireStoreService.getRating("tTXVdpQDIEaipok5TJPV")
          .then((response) => {
            setRatings(
              response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            displayRating();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => console.log(e));
  }, []);

  function displayTrailUsers(name, value) {
    const hikers = document.getElementById("hikers");
    const dogs = document.getElementById("dogs");
    const bikers = document.getElementById("bikers");
    const atvOrOffroad = document.getElementById("atvOrOffroad");
    if (name === "hikers" && value === "Yes") {
      hikers.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/trekking.png"
      );
    } else if (name === "hikers" && value === "No") {
      hikers.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/trekking.png"
      );
    }

    if (name === "bikers" && value === "Yes") {
      bikers.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/cycling-mountain-bike.png"
      );
    } else if (name === "bikers" && value === "No") {
      bikers.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/cycling-mountain-bike.png"
      );
    }

    if (name === "dogs" && value === "Yes") {
      dogs.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/dog--v1.png"
      );
    } else if (name === "dogs" && value === "No") {
      dogs.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/dog--v1.png"
      );
    }

    if (name === "atvOrOffroad" && value === "Yes") {
      atvOrOffroad.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/utv.png"
      );
    } else if (name === "atvOrOffroad" && value === "No") {
      atvOrOffroad.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/utv.png"
      );
    }
  }

  function displayObstacles(check) {
    const bridges = document.getElementById("bridges");
    const waterCrossing = document.getElementById("waterCrossing");
    const rocks = document.getElementById("rocks");
    bridges.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/bridge.png"
    );
    waterCrossing.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/wave-lines.png"
    );
    rocks.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/landslide.png"
    );

    for (var i = 0; i < check.length; i++) {
      if (check[i] === "Bridges") {
        bridges.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/bridge.png"
        );
      } else {
      }
      if (check[i] === "Water Crossings") {
        waterCrossing.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/wave-lines.png"
        );
      } else if (check[i] === "Rocks") {
        rocks.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/landslide.png"
        );
      }
    }
  }

  function displaySeasons(check) {
    const spring = document.getElementById("spring");
    const summer = document.getElementById("summer");
    const fall = document.getElementById("fall");
    const winter = document.getElementById("winter");
    spring.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/spring.png"
    );
    summer.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/summer--v1.png"
    );
    fall.setAttribute("src", "https://img.icons8.com/ios/50/000000/autumn.png");
    winter.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/winter.png"
    );
    for (var i = 0; i < check.length; i++) {
      if (check[i] === "Spring") {
        console.log("lk");
        spring.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/spring.png"
        );
      } else if (check[i] === "Summer") {
        summer.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/summer.png"
        );
      } else if (check[i] === "Fall") {
        fall.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/autumn.png"
        );
      } else if (check[i] === "Winter") {
        winter.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/winter.png"
        );
      }
    }
  }

  function displayTrailHeads(check) {
    const restroom = document.getElementById("restrooms");
    const water = document.getElementById("water");
    const corrals = document.getElementById("corrals");
    restroom.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/cottage--v1.png"
    );
    water.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/bottle-of-water.png"
    );
    corrals.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/coral.png"
    );

    for (var i = 0; i < check.length; i++) {
      if (check[i] === "Restrooms") {
        restroom.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/cottage--v1.png"
        );
      } else if (check[i] === "Water") {
        water.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/bottle-of-water.png"
        );
      } else if (check[i] === "Corrals") {
        corrals.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/coral.png"
        );
      }
    }
  }

  function displayRating() {
    var tot = 0;
    for (var i = 0; i < ratings.length; i++) {
      tot = tot + ratings[i].rate;
    }

    var overall = tot / ratings.length;
    if (overall % 2 == 0) {
      setRateFilled(overall);
    } else {
      if (overall - parseInt(overall) >= 0.5) {
        setRateFilled(parseInt(overall) + 1);
      } else {
        setRateFilled(parseInt(overall));
      }
    }
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center">{trailDetails.trailName}</h1>
            <h2 className="text-center">{trailDetails.parkName}</h2>
            <h3 className="text-center">{trailDetails.trailType}</h3>
            <div style={styles.stars} className="justify-content-center">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    color={rateFilled > index ? colors.orange : colors.grey}
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          </Card.Title>
          <div className="row p-3">
            <img
              alt="Banner Image"
              id="banner"
              style={{
                display: "block",
                width: "20%",
                height: "auto",
                margin: "0px auto",
              }}
            ></img>
          </div>
          <div className="row text-center">
            <div className="col md-3">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Miles
                  </Card.Title>
                  <div>
                    <h5>{trailDetails.miles}</h5>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-3">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Elevation Gain
                  </Card.Title>
                  <div>{trailDetails.elevationGain}</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-6">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Trail Head
                  </Card.Title>
                  <div className="row">
                    <div className="col md-4">
                      <img alt="Restrooms" id="restrooms"></img>
                    </div>
                    <div className="col md-4">
                      <img alt="Water" id="water"></img>
                    </div>
                    <div className="col md-4">
                      <img alt="Corrals" id="corrals"></img>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            <div className="col md-4">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Trail Users
                  </Card.Title>
                  <div className="row">
                    <div className="col md-3">
                      <img alt="Hikers" id="hikers"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Dogs" id="dogs"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Bikers" id="bikers"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="ATV or OffRoad" id="atvOrOffroad"></img>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-4">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Obstacles
                  </Card.Title>
                  <div className="row">
                    <div className="col md-4">
                      <img alt="Bridges" id="bridges"></img>
                    </div>
                    <div className="col md-4">
                      <img alt="Water Crossings" id="waterCrossing"></img>
                    </div>
                    <div className="col md-4">
                      <img alt="Rocks" id="rocks"></img>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-4">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Seasons
                  </Card.Title>
                  <div className="row">
                    <div className="col md-3">
                      <img alt="Spring" id="spring"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Summer" id="summer"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Fall" id="fall"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Winter" id="winter"></img>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            <div className="col md-4">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Trail Description
                  </Card.Title>
                  <div>{trailDetails.description}</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-4">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    TrailNotes
                  </Card.Title>
                  <div>{trailDetails.trailNotes}</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-4">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Restrictions
                  </Card.Title>
                  <div>{trailDetails.restrictions}</div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            <div className="col md-3">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Parking Spots
                  </Card.Title>
                  <div>{trailDetails.parkingSpots}</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-3">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Parking Notes
                  </Card.Title>
                  <div>{trailDetails.parkingNotes}</div>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-3">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Keywords
                  </Card.Title>
                  <div>{trailDetails.keywords}</div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            <div className="col md-6">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Trail Map
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col md-6">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Parking Image
                  </Card.Title>
                  <img
                    alt="Parking Image"
                    id="parkingImage"
                    style={{
                      display: "block",
                      width: "20%",
                      height: "auto",
                      margin: "0px auto",
                    }}
                  ></img>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            <Card style={{ border: "none" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    backgroundColor: "#101522",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  Trail Gallery
                </Card.Title>
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="true"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        alt="Gallery Image 01"
                        id="imageGal1"
                        className="d-block w-25"
                        alt="..."
                        style={{
                          height: "auto",
                          margin: "0px auto",
                        }}
                      ></img>
                    </div>
                    <div className="carousel-item">
                      <img
                        alt="Gallery Image 02"
                        id="imageGal2"
                        className="d-block w-25"
                        alt="..."
                        style={{
                          height: "auto",
                          margin: "0px auto",
                        }}
                      ></img>
                    </div>
                    <div className="carousel-item">
                      <img
                        alt="Gallery Image 03"
                        id="imageGal3"
                        className="d-block w-25"
                        alt="..."
                        style={{
                          height: "auto",
                          margin: "0px auto",
                        }}
                      ></img>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <br></br>
          <form className="needs-validation">
            <div className="row">
              <div className="form-radio" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <h4>Rate the Trail</h4>(submit the rate by clicking the
                  required stars)
                </label>
                <div style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </div>
                <br></br>
                {reviewResult ? (
                  <div class="alert alert-info" role="alert">
                    {reviewResult}
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
