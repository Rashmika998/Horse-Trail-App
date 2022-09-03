import { React, useEffect, useState } from "react";
import FireStoreService from "../utils/services/camps/FireStoreService";
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

export default function DisplayCamp() {
  const [userID, setUserID] = useState("AAAAAAA");

  const [campID, setCampID] = useState(null);

  const [campDetails, setCampDetails] = useState({});

  const [ratings, setRatings] = useState([]);
  const [checkIn, setCheckInResult] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const [reviewResult, setReviewResult] = useState("");
  const [review, setReview] = useState("");
  const [checkedIn, setChekedIn] = useState(true); //checked in state
  const [completed, setCompleted] = useState(true); //completed state
  const [fav, setFav] = useState(false); //fav state

  const handleClick = (value) => {
    setCurrentValue(value);
    FireStoreService.addRatings(campID, value)
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

  function addCheckIn(e) {
    setCheckInResult("Waiting");

    e.preventDefault();
    FireStoreService.addCheckins(userID, campID)
      .then(() => {
        setCheckInResult("Success");
      })
      .catch((e) => {
        setCheckInResult("Error");
      });
  }

  useEffect(() => {
    var url = document.location.href;
    var id = url.toString().split("/")[4];
    setCampID(id);
    FireStoreService.getCamp(campID)
      .then((response) => {
        setCampDetails(response.data());
        const website = document.getElementById("website");
        website.setAttribute("href", campDetails.website);
        const fb = document.getElementById("fb");
        fb.setAttribute("href", campDetails.facebook);
        const twitter = document.getElementById("twitter");
        twitter.setAttribute("href", campDetails.twitter);
        const insta = document.getElementById("insta");
        insta.setAttribute("href", campDetails.instagram);

        const pathBanner = campDetails.campName;
        FireStoreService.getCampImages(
          "banners/" + pathBanner,
          campDetails.bannerName
        )
          .then((res) => {
            const bannerImg = document.getElementById("banner");
            bannerImg.setAttribute("src", res);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + campDetails.campName,
          campDetails.imageGal1Name
        )
          .then((gal1) => {
            const imageGal1 = document.getElementById("imageGal1");
            imageGal1.setAttribute("src", gal1);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + campDetails.campName,
          campDetails.imageGal2Name
        )
          .then((gal2) => {
            const imageGal2 = document.getElementById("imageGal2");
            imageGal2.setAttribute("src", gal2);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + campDetails.campName,
          campDetails.imageGal3Name
        )
          .then((gal3) => {
            const imageGal3 = document.getElementById("imageGal3");
            imageGal3.setAttribute("src", gal3);
          })
          .catch((e) => {
            console.log(e);
          });

        displayCampUsers("reservation", campDetails.reservation);
        displayCampUsers("paperworkRequired", campDetails.paperworkRequired);
        displayCampSites(campDetails.campSiteTypesCheck.campSiteTypes);
        displaySeasons(campDetails.bestSeasonsCheck.bestSeasons);
        displayAmenities(campDetails.amenitiesCheck.amenities);

        FireStoreService.getRating(campID)
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

  function displayCampUsers(name, value) {
    const reservation = document.getElementById("reservation");
    const paperWork = document.getElementById("paperWorkRequired");
    if (name === "reservation" && value === "Yes") {
      reservation.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/reservation.png"
      );
    } else if (name === "reservation" && value === "No") {
      reservation.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/reservation.png"
      );
    }

    if (name === "paperworkRequired" && value === "Yes") {
      paperWork.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/assignment-turned-in.png"
      );
    } else if (name === "paperworkRequired" && value === "No") {
      paperWork.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/assignment-turned-in.png"
      );
    }
  }

  function displayCampSites(check) {
    const dispersed = document.getElementById("dispersed");
    const tentSite = document.getElementById("tentSite");
    const rvSite = document.getElementById("rvSite");
    const cabins = document.getElementById("cabins");
    dispersed.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/spade.png"
    );
    tentSite.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/camping-tent.png"
    );
    rvSite.setAttribute(
      "src",
      "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-caravan-camping-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
    );
    cabins.setAttribute("src", "https://img.icons8.com/ios/50/000000/home.png");

    for (var i = 0; i < check.length; i++) {
      if (check[i] === "Dispersed") {
        dispersed.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/spade.png"
        );
      } else {
      }
      if (check[i] === "Tent Site") {
        tentSite.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/camping-tent.png"
        );
      } else if (check[i] === "Rv Site") {
        rvSite.setAttribute(
          "src",
          "https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-caravan-camping-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
        );
      } else if (check[i] === "Cabins") {
        cabins.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/home.png"
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

  function displayAmenities(check) {
    const restroom = document.getElementById("restrooms");
    const water = document.getElementById("water");
    const corrals = document.getElementById("corrals");
    const restaurant = document.getElementById("restaurant");
    const hookup = document.getElementById("hookup");
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
    restaurant.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/restaurant--v1.png"
    );
    hookup.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/wired-network-connection.png"
    );
    if (check.Restrooms == true) {
      restroom.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/cottage--v1.png"
      );
    }
    if (check.Water == true) {
      water.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/bottle-of-water.png"
      );
    }
    if (check.Corrals == true) {
      corrals.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/coral.png"
      );
    }
    if (check.Restaurants == true) {
      restaurant.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/restaurant--v1.png"
      );
    }
    if (check.Hookup == true) {
      hookup.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/wired-network-connection.png"
      );
    }
  }

  function displayRating() {
    var tot = 0;
    for (var i = 0; i < ratings.length; i++) {
      tot = tot + ratings[i].rate;
    }

    var overall = tot / ratings.length;
    const starRate = document.getElementById("starRate");
    isNaN(overall) ? (starRate.innerHTML = 0) : (starRate.innerHTML = overall);
  }

  function submitReview() {
    FireStoreService.addReview(userID, campID, review)
      .then(() => {
        setReviewResult("Review submitted successfully");
      })
      .catch((e) => {
        setReviewResult("Error occurred! Please try again.");
      });
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center">{campDetails.campName}</h1>
            <h2 className="text-center">
              {campDetails.city}&nbsp;{campDetails.state}
            </h2>
            <h3 className="text-center">{campDetails.campType}</h3>
            <div style={styles.stars} className="justify-content-center">
              <FaStar
                size={24}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                  color: "orange",
                }}
              />
              <div id="starRate"></div>
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
                    Road to Camp
                  </Card.Title>
                  <div>
                    <h5>{campDetails.roadToCamp}</h5>
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
                    Park Name
                  </Card.Title>
                  <div>{campDetails.parkName}</div>
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
                    Phone
                  </Card.Title>
                  <div>{campDetails.phone}</div>
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
                    Email
                  </Card.Title>
                  <div>{campDetails.email}</div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            <div className="col md-8">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title
                    style={{
                      backgroundColor: "#101522",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Amenities
                  </Card.Title>
                  <div className="row">
                    <div className="col md-2">
                      <img alt="Restrooms" id="restrooms"></img>
                    </div>
                    <div className="col md-2">
                      <img alt="Water" id="water"></img>
                    </div>
                    <div className="col md-2">
                      <img alt="Corrals" id="corrals"></img>
                    </div>
                    <div className="col md-2">
                      <img alt="Restaurant" id="restaurant"></img>
                    </div>
                    <div className="col md-2">
                      <img alt="Hookup" id="hookup"></img>
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
                    Camp Users
                  </Card.Title>
                  <div className="row">
                    <div className="col md-2">
                      <img alt="Reservation" id="reservation"></img>
                    </div>
                    <div className="col md-2">
                      <img
                        alt="PaperWork Required"
                        id="paperWorkRequired"
                      ></img>
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
                    Camp Site Types
                  </Card.Title>
                  <div className="row">
                    <div className="col md-3">
                      <img alt="Dispersed" id="dispersed"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Tent Site" id="tentSite"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Rv Site" id="rvSite"></img>
                    </div>
                    <div className="col md-3">
                      <img alt="Cabins" id="cabins"></img>
                    </div>
                  </div>
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
                    Restrictions
                  </Card.Title>
                  <div>{campDetails.restrictions}</div>
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
                    Pet policy
                  </Card.Title>
                  <div>{campDetails.petPolicy}</div>
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
                    Reservation Link
                  </Card.Title>
                  <div>{campDetails.reservationLink}</div>
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
                    Reservation Call
                  </Card.Title>
                  <div>{campDetails.reservationCall}</div>
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
                    Reservation Description
                  </Card.Title>
                  <div>{campDetails.reservationDescription}</div>
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
                    Reservation Email
                  </Card.Title>
                  <div>{campDetails.reservationEmail}</div>
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
                    Horse Site
                  </Card.Title>
                  <div>{campDetails.horseSite}</div>
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
                    Cost Per Night
                  </Card.Title>
                  <div>{campDetails.costPerNight}</div>
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
                    Links
                  </Card.Title>
                  <a id="website">
                    <img
                      alt="Website"
                      src="https://img.icons8.com/ios-filled/50/000000/internet.png"
                    ></img>
                  </a>

                  <a id="fb">
                    <img
                      alt="Facebook"
                      src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"
                    ></img>
                  </a>

                  <a id="twitter">
                    <img
                      alt="Twitter"
                      src="https://img.icons8.com/ios-filled/50/000000/twitter.png"
                    ></img>
                  </a>

                  <a id="insta">
                    <img
                      alt="Instagram"
                      src="https://img.icons8.com/ios-filled/50/000000/instagram-new--v1.png"
                    ></img>
                  </a>
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
                    Camp Notes
                  </Card.Title>
                  <div>{campDetails.campNotes}</div>
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
                    Camp Description
                  </Card.Title>
                  <div>{campDetails.campDescription}</div>
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
                    Reviews
                  </Card.Title>
                  <div>{campDetails.reviews}</div>
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
                    Reservations and Pricing
                  </Card.Title>
                  <div>{campDetails.resPricing}</div>
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
                    Nearby Places to Ride
                  </Card.Title>
                  <div>{campDetails.nearbyPlaces}</div>
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
                  Camp Gallery
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
          <div>
            {checkedIn ? (
              <div>
                {
                  completed ? (
                    <div>
                      {fav ? null /**display it as a fav */ : (
                        <div>
                          <form className="needs-validation">
                            <div className="row">
                              <div
                                className="form-radio col-md-5"
                                style={{ marginBottom: "15px" }}
                              >
                                <label style={{ marginBottom: "5px" }}>
                                  <h4>Rate the Trail</h4>(submit the rate by
                                  clicking the required stars)
                                </label>
                                <div style={styles.stars}>
                                  {stars.map((_, index) => {
                                    return (
                                      <FaStar
                                        key={index}
                                        size={24}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() =>
                                          handleMouseOver(index + 1)
                                        }
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
                              <div className="col-md-7">
                                <div
                                  className="form-group"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <label style={{ marginBottom: "5px" }}>
                                    Add Review
                                  </label>
                                  <textarea
                                    name="review"
                                    className="form-control"
                                    onChange={(e) => {
                                      setReview(e.target.value);
                                    }}
                                  ></textarea>
                                </div>

                                <div className="d-grid">
                                  <button
                                    className="btn btn-block"
                                    type="submit"
                                    style={{
                                      marginTop: "15px",
                                      backgroundColor: "#071c2f",
                                      color: "white",
                                    }}
                                    onSubmit={submitReview}
                                  >
                                    Add Review
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  ) : null /**display it as checked in */
                }
              </div>
            ) : (
              <form className="needs-validation">
                <div className="row">
                  <div className="col-md-5">
                    <button className="btn btn-primary" onClick={addCheckIn}>
                      Check In
                    </button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    {checkIn == "Waiting" ? (
                      <div
                        class="spinner-border text-primary "
                        role="status"
                      ></div>
                    ) : null}
                    {checkIn == "Success" ? (
                      <div class="alert alert-success mt-4" role="alert">
                        Checked In Successfully
                      </div>
                    ) : null}
                    {checkIn == "Error" ? (
                      <div class="alert alert-danger mt-4" role="alert">
                        Error occurred! Please try again.
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
