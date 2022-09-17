import { React, useEffect, useState } from "react";
import FireStoreService from "../utils/services/trails/FireStoreService";
import UserFireStoreService from "../utils/services/user/FireStoreService";
import { Button, Card, Alert, Modal } from "react-bootstrap";
import { FaCheckCircle, FaStar, FaHeart } from "react-icons/fa";
import GetNearbyPlaces from "./GetNearbyPlaces";
import DataTable from "react-data-table-component";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BodyContent } from "../globalStyles";
import { height } from "@mui/system";
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

export default function DisplayTrail() {
  var url = document.location.href;
  var id = url.toString().split("/")[4];
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [userID, setUserID] = useState(null);
  const [trailID, setTrailID] = useState(null);
  let logInButton = (
    <Link className="text-center" to="/login">
      <div className="btn btn-outline-primary">Log in</div>
    </Link>
  );
  const [trailDetails, setTrailDetails] = useState({});
  const [checkIn, setCheckInResult] = useState("");

  const [ratings, setRatings] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const [reviewResult, setReviewResult] = useState("");
  const [rateResult, setRateResult] = useState("");
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
    FireStoreService.addRatings(trailID, value)
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
    FireStoreService.addCheckins(userID, trailID)
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

  const onClickAddFavourite = async (e, trailid) => {
    setCheckInResult("Waiting");

    e.preventDefault();

    FireStoreService.setTrailFavourite(trailid)
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

  const setCheckInStates = async (trailId) => {
    const data1 = await FireStoreService.check_ChekedIn(userID, trailId);
    setChekedIn(data1);
    const data2 = await FireStoreService.check_Completed(userID, trailId);
    setCompleted(data2);
    const data3 = await FireStoreService.check_Favourite(userID, trailId);
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
    setTrailID(id);
    setCheckInStates(id);
    UserFireStoreService.getUserType(currentUser.uid)
      .then((res) => {
        setUserType(res.data().type);
      })
      .catch((e) => {
        console.log(e);
      });
    FireStoreService.getTrail(id)
      .then((response) => {
        setTrailDetails(response.data());
        FireStoreService.getReviews(id)
          .then((resRev) => {
            getAllReviews(
              resRev.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          })
          .catch((e) => {
            console.log(e);
          });
        const pathBanner = response.data().trailName;
        FireStoreService.getTrailImages(
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

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
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

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
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

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
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

        FireStoreService.getTrailImages(
          "parking/" + response.data().trailName,
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

        FireStoreService.getTrailImages(
          "trailMap/" + response.data().trailName,
          response.data().trailMapName
        )
          .then((trailMapImg) => {
            if (currentUser) {
              const trailMapImage = document.getElementById("trailMapImage");
              trailMapImage.setAttribute("src", trailMapImg);
            }
          })
          .catch((e) => {
            console.log(e);
          });

        if (currentUser) {
          displayTrailUsers("hikers", response.data().hikers);
          displayTrailUsers("dogs", response.data().dogs);
          displayTrailUsers("atvOrOffroad", response.data().atvOrOffroad);
          displayObstacles(response.data().obstaclesCheck.obstacles);
          displayTrailHeads(response.data().trailHeadCheck.trailHead);
        }
        displayTrailUsers("bikers", response.data().bikers);
        displaySeasons(response.data().bestSeasonsCheck.bestSeasons);

        FireStoreService.getRating(id)
          .then((res) => {
            setRatings(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            displayRating(
              res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          })
          .catch((e) => {
            console.log(e);
          });

        if (currentUser) {
          const trailMapLink = document.getElementById("trailMapLink");
          trailMapLink.setAttribute("href", response.data().trailMapLink);
        }
      })
      .catch((e) => console.log(e));
  }, [userID]);

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

  const onClickCompleted = async (e, trailid) => {
    setCheckInResult("Waiting");
    e.preventDefault();
    FireStoreService.updateTrailCheckinState(trailid, "Completed")
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
    FireStoreService.addReview(userID, trailID, review)
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

  const deleteReview = (id) => {
    FireStoreService.deleteReview(id)
      .then(() => {
        window.location.reload(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => setShow(false);
  function handleShowDelete() {
    setShow(true);
  }

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
          {userType === "admin" ? (
            <>
              <Button
                className="btn btn-danger btn-sm"
                onClick={handleShowDelete}
              >
                <FaTrash />
                {console.log(show)}
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
          ) : null}
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
        {trailDetails.length != 0 ? (
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
                      {trailDetails.trailName}
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
                    {trailDetails.parkName} | {trailDetails.trailType} |{" "}
                    {trailDetails.state}
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
              <div className="col md-2 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <div>
                      <h1>
                        {trailDetails.miles}&nbsp;
                        <span style={{ fontSize: "15px" }}>MILES</span>
                      </h1>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    {currentUser ? (
                      <div>
                        <h2>{trailDetails.elevationGain}</h2>
                        <span style={{ fontSize: "15px" }}>ELEVATION GAIN</span>
                      </div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-7 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>TRAIL HEAD</Card.Title>
                    {currentUser ? (
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
                    <Card.Title>TRAIL USERS</Card.Title>
                    <div className="row">
                      <div className="col md-3">
                        <img alt="Bikers" id="bikers"></img>
                      </div>
                      {currentUser ? (
                        <>
                          <div className="col md-3">
                            <img alt="Hikers" id="hikers"></img>
                          </div>
                          <div className="col md-3">
                            <img alt="Dogs" id="dogs"></img>
                          </div>
                          <div className="col md-3">
                            <img alt="ATV or OffRoad" id="atvOrOffroad"></img>
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
                    <Card.Title>OBSTACLES</Card.Title>
                    {currentUser ? (
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
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-4 m-3">
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
            </div>
            <br></br>
            <div className="row text-center">
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Trail Description</Card.Title>
                    {currentUser ? (
                      <div>{trailDetails.description}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Trail Notes</Card.Title>
                    {currentUser ? (
                      <div>{trailDetails.trailNotes}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Restrictions</Card.Title>
                    {currentUser ? (
                      <div>{trailDetails.restrictions}</div>
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
                    <Card.Title>Parking Spots</Card.Title>
                    {currentUser ? (
                      <div>{trailDetails.parkingSpots}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Parking Notes</Card.Title>
                    {currentUser ? (
                      <div>{trailDetails.parkingNotes}</div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Keywords/Trail Tags</Card.Title>
                    <div>{trailDetails.keywords}</div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col md-3 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Trail Map Link</Card.Title>
                    {currentUser ? (
                      <div>
                        <a
                          id="trailMapLink"
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          Click Here
                        </a>
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
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Trail Map</Card.Title>
                    {currentUser ? (
                      <img
                        alt="Trail map Image"
                        id="trailMapImage"
                        style={{
                          display: "block",
                          width: "30%",
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
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Parking Image</Card.Title>
                    {currentUser ? (
                      <img
                        alt="Parking Image"
                        id="parkingImage"
                        style={{
                          display: "block",
                          width: "30%",
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
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Trail Reviews</Card.Title>
                    <DataTable
                      responsive
                      columns={columns}
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
              <div className="col md-4 m-3">
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Card.Title>Nearby Horse Camping</Card.Title>
                    {currentUser ? (
                      <div>
                        <GetNearbyPlaces id={trailID} type="trail" />
                      </div>
                    ) : (
                      logInButton
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br></br>
            <div className="row text-center p-2">
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Title>TRAIL GALLERY</Card.Title>
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
                              width: "100%",
                              height: "100%",
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
                              width: "100%",
                              height: "100%",
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
                              width: "100%",
                              height: "100%",
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
                fav && completed && !checkedIn ? null : !fav &&
                  completed &&
                  !checkedIn ? (
                  <>
                    <Card>
                      {completed ? (
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
                                {rateResult ? (
                                  <div class="alert alert-info" role="alert">
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
                                      required
                                      name="review"
                                      className="form-control"
                                      onChange={(e) => {
                                        setReview(e.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                  {reviewResult ? (
                                    <div class="alert alert-info" role="alert">
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
                        </div>
                      ) : null}
                      <div
                        type="button"
                        className="btn btn-outline-danger m-2 btn-sm"
                        onClick={(event) => onClickAddFavourite(event, trailID)}
                      >
                        Add to favourites&nbsp;
                        <FaHeart className="justify-content-center" />
                      </div>
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
                            Change has been saved successfully.
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
                      onClick={(event) => onClickCompleted(event, trailID)}
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
                        Change has been saved successfully. Please referesh the
                        page.
                      </div>
                    ) : null}
                    {checkIn == "Error" ? (
                      <div class="alert alert-danger mt-4" role="alert">
                        Error occurred! Please try again.
                      </div>
                    ) : null}
                  </>
                )
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
