import { React, useEffect, useState } from "react";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { Button, Card } from "react-bootstrap";
import { FaCheckCircle, FaStar, FaMarker, FaHeart } from "react-icons/fa";
import GetNearbyPlaces from "./GetNearbyPlaces";
import DataTable from "react-data-table-component";
import { useAuth } from "../contexts/AuthContext";

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
  const { currentUser} = useAuth();
  const [userID, setUserID] = useState();

  const [trailID, setTrailID] = useState(null);

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

  const handleClick = (value) => {
    setCurrentValue(value);
    FireStoreService.addRatings(trailID, value)
      .then(() => {
        setRateResult("Rate submitted successfully");
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
        setCheckInResult("Success");
      })
      .catch((e) => {
        setCheckInResult("Error");
      });
  }

  const onClickAddFavourite = async (event, trailid) => {
    FireStoreService.setTrailFavourite(trailid);
  };

  const setCheckInStates = async (trailId) => {
    const data1 = await FireStoreService.check_ChekedIn(userID, trailId);
    setChekedIn(data1);
    const data2 = await FireStoreService.check_Completed(userID, trailId);
    setCompleted(data2);
    console.log(data2);
    const data3 = await FireStoreService.check_Favourite(userID, trailId);
    setFav(data3);
  };

  useEffect(() => {
    if(currentUser){setUserID(currentUser.uid)}else{setUserID(null)}; 
    setTrailID(id);
    setCheckInStates(id);
    FireStoreService.getTrail(id)
      .then((response) => {
        console.log(response.data());
        setTrailDetails(response.data());
        FireStoreService.getReviews(trailID)
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
            const imageGal1 = document.getElementById("imageGal1");
            imageGal1.setAttribute("src", gal1);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
          response.data().imageGal2Name
        )
          .then((gal2) => {
            const imageGal2 = document.getElementById("imageGal2");
            imageGal2.setAttribute("src", gal2);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
          response.data().imageGal3Name
        )
          .then((gal3) => {
            const imageGal3 = document.getElementById("imageGal3");
            imageGal3.setAttribute("src", gal3);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "parking/" + response.data().trailName,
          response.data().parkingImageName
        )
          .then((parkingImg) => {
            const parkingImage = document.getElementById("parkingImage");
            parkingImage.setAttribute("src", parkingImg);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "trailMap/" + response.data().trailName,
          response.data().trailMapName
        )
          .then((trailMapImg) => {
            const trailMapImage = document.getElementById("trailMapImage");
            trailMapImage.setAttribute("src", trailMapImg);
          })
          .catch((e) => {
            console.log(e);
          });

        displayTrailUsers("hikers", response.data().hikers);
        displayTrailUsers("dogs", response.data().dogs);
        displayTrailUsers("bikers", response.data().bikers);
        displayTrailUsers("atvOrOffroad", response.data().atvOrOffroad);
        displayObstacles(response.data().obstaclesCheck.obstacles);
        displaySeasons(response.data().bestSeasonsCheck.bestSeasons);
        displayTrailHeads(response.data().trailHeadCheck.trailHead);

        FireStoreService.getRating(trailID)
          .then((res) => {
            setRatings(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            displayRating();
          })
          .catch((e) => {
            console.log(e);
          });
        const trailMapLink = document.getElementById("trailMapLink");
        trailMapLink.setAttribute("href", response.data().trailMapLink);
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

  const columns = [
    {
      selector: (row) => row.review,
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
    <div
      className="container"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      {trailDetails.length != 0 ? (
        <Card style={{ border: "none" }}>
          <Card.Body>
            <Card.Title>
              <h1 className="text-center">{trailDetails.trailName}</h1>
              <h2 className="text-center">{trailDetails.parkName}</h2>
              <h3 className="text-center">{trailDetails.trailType}</h3>
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
                      Trail Notes
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
                      Keywords/Trail Tags
                    </Card.Title>
                    <div>{trailDetails.keywords}</div>
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
                      Trail Map Link
                    </Card.Title>
                    <div>
                      <a
                        id="trailMapLink"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        Click Here
                      </a>
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
                      Trail Map
                    </Card.Title>
                    <img
                      alt="Trail map Image"
                      id="trailMapImage"
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
                      Trail Reviews
                    </Card.Title>
                    <DataTable
                      responsive
                      subHeader
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
                      Nearby Horse Camping
                    </Card.Title>

                    <div>
                      <GetNearbyPlaces id={trailID} type="trail" />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
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
              {checkedIn == false ? (
                <div>
                  {
                    completed ? (
                      <div>
                        <div>
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

              {fav == false && completed == true ? (
                <div
                  className="btn btn-danger col-lg-3 mx-2 mt-1"
                  onClick={(event) => onClickAddFavourite(event, trailID)}
                >
                  <FaHeart /> Add to Fav
                </div>
              ) : (
                ""
              )}
              {fav == true && completed == true ? (
                <div
                  className="btn btn-danger col-lg-3 mx-2 mt-1"
                  disabled={true}
                >
                  <FaHeart /> Added to Favourites
                </div>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="mt-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
}
