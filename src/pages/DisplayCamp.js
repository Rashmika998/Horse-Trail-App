import { React, useEffect, useState } from "react";
import FireStoreService from "../utils/services/camps/FireStoreService";
import UserFireStoreService from "../utils/services/user/FireStoreService";
import { Card, Alert, Button, Modal } from "react-bootstrap";
import { FaStar, FaCheckCircle, FaHeart } from "react-icons/fa";
import DataTable from "react-data-table-component";
import GetNearbyPlaces from "./GetNearbyPlaces";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BodyContent } from "../globalStyles";
import { FaTrash } from "react-icons/fa";

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
  var url = document.location.href;
  var id = url.toString().split("/")[4];
  let logInButton = (
    <Link className="text-center" to="/login">
      <div className="btn btn-outline-primary">Log in</div>
    </Link>
  );
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [userID, setUserID] = useState(null);

  const [campID, setCampID] = useState(null);

  const [campDetails, setCampDetails] = useState({});

  const [ratings, setRatings] = useState([]);
  const [checkIn, setCheckInResult] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const [rateResult, setRateResult] = useState("");
  const [reviewResult, setReviewResult] = useState("");
  const [review, setReview] = useState("");
  const [allReviews, getAllReviews] = useState([]);
  const [checkedIn, setChekedIn] = useState(false); //checked in state
  const [completed, setCompleted] = useState(false); //completed state
  const [fav, setFav] = useState(false); //fav state
  const [bannerURL, setBannerURL] = useState("");
  const [userType, setUserType] = useState([]);
  const [show, setShow] = useState(false);

  const handleClick = (value) => {
    setCurrentValue(value);
    FireStoreService.addRatings(campID, value)
      .then(() => {
        setTimeout(() => {
          setRateResult("Rate submitted successfully");
        }, 3000);
        window.location.reload(true);
      })
      .catch((e) => {
        setRateResult("Error occurred! Please try again.");
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
        setTimeout(() => {
          setCheckInResult("Success");
        }, 3000);
        window.location.reload(true);
      })
      .catch((e) => {
        setCheckInResult("Error");
      });
  }
  const onClickAddFavourite = async (e, campid) => {
    setCheckInResult("Waiting");

    e.preventDefault();

    FireStoreService.setCampFavourite(campid)
      .then(() => {
        setTimeout(() => {
          setCheckInResult("Success");
        }, 3000);
        window.location.reload(true);
      })
      .catch((e) => {
        setCheckInResult("Error");
      });
  };

  const setCheckInStates = async (campId) => {
    const data1 = await FireStoreService.check_ChekedIn(userID, campId);
    setChekedIn(data1);
    const data2 = await FireStoreService.check_Completed(userID, campId);
    setCompleted(data2);
    const data3 = await FireStoreService.check_Favourite(userID, campId);
    setFav(data3);
  };

  useEffect(() => {
    if (currentUser) {
      setUserID(currentUser.uid);
    } else {
      setUserID(null);
    }
    if (currentUser) {
      setError("");
    } else {
      setError("You are not logged in. Please log in to view all details.");
    }
    setCampID(id);
    setCheckInStates(id);
    if (currentUser) {
      UserFireStoreService.getUserType(currentUser.uid)
        .then((res) => {
          setUserType(res.data().type);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    FireStoreService.getCamp(id)
      .then((response) => {
        setCampDetails(response.data());
        FireStoreService.getReviews(id)
          .then((res) => {
            getAllReviews(
              res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          })
          .catch((e) => {
            console.log(e);
          });
        if (currentUser) {
          const website = document.getElementById("website");
          website.setAttribute("href", response.data().website);
          const fb = document.getElementById("fb");
          fb.setAttribute("href", response.data().facebook);
          const twitter = document.getElementById("twitter");
          twitter.setAttribute("href", response.data().twitter);
          const insta = document.getElementById("insta");
          insta.setAttribute("href", response.data().instagram);
        }

        const pathBanner = response.data().campName;
        FireStoreService.getCampImages(
          "banners/" + pathBanner,
          response.data().bannerName
        )
          .then((res) => {
            const bannerImg = document.getElementById("banner");
            setBannerURL(res);

            bannerImg.setAttribute("src", res);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + response.data().campName,
          response.data().imageGal1Name
        )
          .then((gal1) => {
            if (currentUser) {
              const imageGal1 = document.getElementById("imageGal1");
              imageGal1.setAttribute("src", gal1);
            }
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + response.data().campName,
          response.data().imageGal2Name
        )
          .then((gal2) => {
            if (currentUser) {
              const imageGal2 = document.getElementById("imageGal2");
              imageGal2.setAttribute("src", gal2);
            }
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + response.data().campName,
          response.data().imageGal3Name
        )
          .then((gal3) => {
            if (currentUser) {
              const imageGal3 = document.getElementById("imageGal3");
              imageGal3.setAttribute("src", gal3);
            }
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "parking/" + response.data().campName,
          response.data().parkingImageName
        )
          .then((parkingImg) => {
            if (currentUser) {
              const parkingImage = document.getElementById("parkingImage");
              parkingImage.setAttribute("src", parkingImg);
            }
          })
          .catch((e) => {
            console.log(e);
          });

        if (currentUser) {
          displayCampUsers("reservation", response.data().reservation);
          displayCampUsers(
            "paperworkRequired",
            response.data().paperworkRequired
          );
          displayCampSites(response.data().campSiteTypesCheck.campSiteTypes);
        }
        displaySeasons(response.data().bestSeasonsCheck.bestSeasons);
        displayAmenities(response.data().amenitiesCheck.amenities);

        FireStoreService.getRating(id)
          .then((resRating) => {
            setRatings(
              resRating.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            displayRating(
              resRating.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => console.log(e));
  }, [userID]);

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

  const onClickCompleted = async (e, trailid) => {
    setCheckInResult("Waiting");
    e.preventDefault();
    FireStoreService.updateCampCheckinState(trailid, "Completed")
      .then(() => {
        setCheckInResult("Success");
      })
      .catch((e) => {
        setCheckInResult("Error");
      });
  };

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
    if (currentUser) {
      const restroom = document.getElementById("restrooms");
      const water = document.getElementById("water");
      const restaurant = document.getElementById("restaurant");
      restroom.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/cottage--v1.png"
      );
      water.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/bottle-of-water.png"
      );
      restaurant.setAttribute(
        "src",
        "https://img.icons8.com/ios/50/000000/restaurant--v1.png"
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
      if (check.Restaurants == true) {
        restaurant.setAttribute(
          "src",
          "https://img.icons8.com/ios-filled/50/000000/restaurant--v1.png"
        );
      }
    }
    const hookup = document.getElementById("hookup");
    const corrals = document.getElementById("corrals");
    corrals.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/coral.png"
    );
    hookup.setAttribute(
      "src",
      "https://img.icons8.com/ios/50/000000/wired-network-connection.png"
    );
    if (check.Corrals == true) {
      corrals.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/coral.png"
      );
    }
    if (check.Hookup == true) {
      hookup.setAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/wired-network-connection.png"
      );
    }
  }

  function displayRating(rate) {
    var tot = 0;
    for (var i = 0; i < rate.length; i++) {
      tot = tot + rate[i].rate;
    }

    var overall = tot / rate.length;
    const starRate = document.getElementById("starRate");
    isNaN(overall) ? (starRate.innerHTML = 0) : (starRate.innerHTML = overall);
  }

  function submitReview(e) {
    e.preventDefault();
    FireStoreService.addReview(userID, campID, review)
      .then(() => {
        setReviewResult("Review submitted successfully");
      })
      .catch((e) => {
        setReviewResult("Error occurred! Please try again.");
        console.log(e);
      });
  }

  function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 1; i <= pages; i++) {
      results.push(i);
    }

    return results;
  }

  const handleClose = () => setShow(false);
  function handleShowDelete() {
    setShow(true);
  }

  function deleteReview(id) {
    FireStoreService.deleteReview(id)
      .then(() => {
        window.location.reload(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const columnsUser = [
    {
      name: "Review",
      selector: (row) => (
        <div className="row">
          <li>{row.review}</li>
        </div>
      ),
    },
  ];

  const columns = [
    {
      name: "Review",
      selector: (row) => (
        <div className="row">
          <li>{row.review}</li>
        </div>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <Button
            className="btn btn-danger btn-sm"
            onClick={deleteReview(row.id)}
          >
            <FaTrash />
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: "#C41E3A",
                color: "white",
              }}
            >
              <Modal.Title> Delete Review</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
              Delete this review?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => deleteReview(row.id)}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ),
    },
  ];

  function BootyPagination({
    rowsPerPage,
    rowCount,
    onChangePage,
    currentPage,
  }) {
    const handleBackButtonClick = () => {
      onChangePage(currentPage - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
    };

    const handlePageNumber = (e) => {
      onChangePage(Number(e.target.value));
    };

    const pages = getNumberOfPages(rowCount, rowsPerPage);
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === pageItems.length;
    const previosDisabled = currentPage === 1;
    return (
      <nav>
        <br></br>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>
          {pageItems.map((page) => {
            const className =
              page === currentPage ? "page-item active" : "page-item";

            return (
              <li key={page} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <BodyContent
      style={{
        backgroundImage: `url(${bannerURL})`,
        height: "100%",
        position: "absolute",
        overflowY: "hidden",
      }}
    >
      {error && (
        <Alert className="text-center" variant="danger">
          {error}
        </Alert>
      )}
      <div className="container">
        {campDetails.length != 0 ? (
          <div
            className="container"
            style={{
              minWidth: "50vw",
              overflowY: "auto",
              height: "1000px",
              paddingBottom: "500px",
            }}
          >
            <Card style={{ border: "none" }} className=" m-3">
              <Card.Body>
                <Card.Title>
                  <div className="row">
                    <h1 className="text-center">
                      {campDetails.campName}
                      <span style={{ fontSize: "30px", float: "right" }}>
                        {fav && completed && !checkedIn ? (
                          <FaHeart
                            className="justify-content-center"
                            color="red"
                          />
                        ) : null}
                      </span>
                    </h1>
                  </div>
                  <p className="text-center">
                    {campDetails.parkName} | {campDetails.campType} |{" "}
                    {campDetails.state}
                  </p>
                  <p>
                    <div
                      style={styles.stars}
                      className="justify-content-center"
                    >
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
                  </p>
                </Card.Title>
              </Card.Body>
            </Card>
            <div className="row text-center">
              <div className="col md-3  m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>ROAD TO CAMP</Card.Title>
                    <div>
                      {currentUser ? (
                        <h5>{campDetails.roadToCamp}</h5>
                      ) : (
                        logInButton
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>CITY</Card.Title>

                    {currentUser ? <div>{campDetails.city}</div> : logInButton}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>PHONE</Card.Title>
                    {currentUser ? <div>{campDetails.phone}</div> : logInButton}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>EMAIL</Card.Title>
                    {currentUser ? <div>{campDetails.email}</div> : logInButton}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center">
              <div className="col md-8 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>AMENITIES</Card.Title>
                    <div className="row">
                      <div className="col md-2">
                        <img alt="Corrals" id="corrals"></img>
                      </div>

                      <div className="col md-2">
                        <img alt="Hookup" id="hookup"></img>
                      </div>
                      {currentUser ? (
                        <>
                          <div className="col md-2">
                            <img alt="Restrooms" id="restrooms"></img>
                          </div>
                          <div className="col md-2">
                            <img alt="Water" id="water"></img>
                          </div>
                          <div className="col md-2">
                            <img alt="Restaurant" id="restaurant"></img>
                          </div>
                        </>
                      ) : (
                        logInButton
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>CAMP USERS</Card.Title>
                    {currentUser ? (
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
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center">
              <div className="col md-4">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>SEASONS</Card.Title>
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
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>CAMP SITE TYPES</Card.Title>
                    {currentUser ? (
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
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>

            <br></br>
            <div className="row text-center">
              <div className="col md-3  m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>RESTRICTIONS</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.restrictions}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>PET POLICY</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.petPolicy}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>RESERVATION LINK</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.reservationLink}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>RESERVATION CALL</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.reservationCall}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center">
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>RESERVATION DESCRIPTION</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.reservationDescription}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>RESERVATION EMAIL</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.reservationEmail}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>HORSE SITE</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.horseSite}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>COST PER NIGHT</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.costPerNight}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center">
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>LINKS</Card.Title>
                    {currentUser ? (
                      <>
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
                      </>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>CAMP NOTES</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.campNotes}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>

              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>RESERVATION & PRICING</Card.Title>
                    {currentUser ? (
                      <div>{campDetails.resPricing}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center">
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Keywords/Tags</Card.Title>
                    {currentUser ? (
                      <div>
                        {campDetails.keywords.split(",").map((keyword) => {
                          return (
                            <span
                              className="btn btn-info m-2"
                              style={{ borderRadius: "30px" }}
                            >
                              {keyword}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>CAMP DESCRIPTION</Card.Title>
                    {currentUser ? (
                      <div
                        style={{
                          overflowY: "auto",
                          height: "200px",
                          textAlign: "left",
                        }}
                      >
                        {campDetails.campDescription}
                      </div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <br></br>
            </div>
            <div className="row text-center">
              <div className="col md-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>CAMP REVIEWS</Card.Title>
                    <DataTable
                      responsive
                      columns={userType === "admin" ? columns : columnsUser}
                      data={allReviews}
                      striped={true}
                      highlightOnHover={true}
                      pagination
                      paginationComponent={BootyPagination}
                      defaultSortFieldID={1}
                    />
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>NEARBY PLACES TO RIDE</Card.Title>
                    {currentUser ? (
                      <GetNearbyPlaces id={campID} type="camp" />
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-4">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Parking Image</Card.Title>
                    {currentUser ? (
                      <img
                        alt="Parking Image"
                        id="parkingImage"
                        style={{
                          display: "block",
                          width: "50%",
                          height: "auto",
                          margin: "0px auto",
                        }}
                      ></img>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title>Camp Gallery</Card.Title>
                  {currentUser ? (
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
                              display: "block",
                              width: "50%",
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
                              display: "block",
                              width: "50%",
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
                              display: "block",
                              width: "50%",
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
                  ) : (
                    logInButton
                  )}
                </Card.Body>
              </Card>
            </div>
            <br></br>
            <div>
              {currentUser ? (
                userType === "user" ? (
                  fav && completed && !checkedIn ? null : !fav &&
                    completed &&
                    !checkedIn ? (
                    <>
                      <Card style={{ border: "none" }} className="p-3">
                        {
                          completed ? (
                            <div>
                              <div>
                                <div className="row m-2">
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
                                            onClick={() =>
                                              handleClick(index + 1)
                                            }
                                            onMouseOver={() =>
                                              handleMouseOver(index + 1)
                                            }
                                            onMouseLeave={handleMouseLeave}
                                            color={
                                              (hoverValue || currentValue) >
                                              index
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
                                    {rateResult ? (
                                      <div
                                        class="alert alert-info"
                                        role="alert"
                                      >
                                        {rateResult}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-7">
                                    <form className="needs-validation">
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
                                      {reviewResult ? (
                                        <div
                                          class="alert alert-info"
                                          role="alert"
                                        >
                                          {reviewResult}
                                        </div>
                                      ) : null}
                                      <div className="d-grid">
                                        <button
                                          className="btn btn-block"
                                          type="submit"
                                          style={{
                                            marginTop: "15px",
                                            backgroundColor: "#071c2f",
                                            color: "white",
                                          }}
                                          onClick={submitReview}
                                        >
                                          Add Review
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="btn btn-outline-danger"
                                onClick={(event) =>
                                  onClickAddFavourite(event, campID)
                                }
                              >
                                Add to favourites&nbsp;
                                <FaHeart className="justify-content-center" />
                              </div>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                            </div>
                          ) : null /**display it as checked in */
                        }
                      </Card>
                      {checkIn == "Waiting" ? (
                        <div
                          class="spinner-border text-primary "
                          role="status"
                        ></div>
                      ) : null}
                      {checkIn == "Success" ? (
                        <div class="alert alert-success mt-4" role="alert">
                          Change has been saved successfully.
                        </div>
                      ) : null}
                      {checkIn == "Error" ? (
                        <div class="alert alert-danger mt-4" role="alert">
                          Error occurred! Please try again.
                        </div>
                      ) : null}
                    </>
                  ) : checkedIn == false ? (
                    <form className="needs-validation">
                      <div className="row">
                        <div className="col-md-5">
                          <button
                            className="btn btn-primary"
                            onClick={addCheckIn}
                          >
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
                              Change has been saved successfully. Please
                              referesh the page.
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
                  ) : (
                    <>
                      <button className="btn btn-secondary">Checked In</button>
                      &nbsp;&nbsp;
                      <div
                        className="btn btn-success"
                        onClick={(event) => onClickCompleted(event, campID)}
                      >
                        <FaCheckCircle /> &nbsp;Mark As Completed
                      </div>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      {checkIn == "Waiting" ? (
                        <div
                          class="spinner-border text-primary "
                          role="status"
                        ></div>
                      ) : null}
                      {checkIn == "Success" ? (
                        <div class="alert alert-success mt-4" role="alert">
                          Change has been saved successfully.
                        </div>
                      ) : null}
                      {checkIn == "Error" ? (
                        <div class="alert alert-danger mt-4" role="alert">
                          Error occurred! Please try again.
                        </div>
                      ) : null}
                    </>
                  )
                ) : null
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </BodyContent>
  );
}
