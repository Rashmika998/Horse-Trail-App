import React, { useState, useEffect } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { useAuth } from "../contexts/AuthContext";
import "../components/AuthPages/Auth.css";
import { Card } from "react-bootstrap";

export default function AddTrail() {
  const { currentUser } = useAuth();
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.uid);
    } else {
      setUserId(null);
    }
  }, []);
  const [atvOrOffroad, setAtvOrOffroad] = useState("Yes");
  const [bikers, setBikers] = useState("Yes");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [dogs, setDogs] = useState("Yes");
  const [elevationGain, setElevationGain] = useState("");
  const [hikers, setHikers] = useState("Yes");
  const [keywords, setKeywords] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [miles, setMiles] = useState("");
  const [parkName, setParkName] = useState("");
  const [parkingNotes, setParkingNotes] = useState("");
  const [parkingSpots, setParkingSpots] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [state, setState] = useState("Alabama");
  const [trailMap, setTrailMap] = useState("");
  const [trailName, setTrailName] = useState("");
  const [trailNotes, setTrailNotes] = useState("");
  const [trailType, setTrailType] = useState("Loop");
  const [error, setError] = useState("");
  const [trailAdded, setTrailAdded] = useState("");
  const [trailHeadCheck, setTrailHead] = useState({
    trailHead: [],
  });
  const [obstaclesCheck, setObstacles] = useState({
    obstacles: [],
  });
  const [bestSeasonsCheck, setBestSeasons] = useState({
    bestSeasons: [],
  });

  const [imageGal1, setImageGal1] = useState("");
  const [imageGal2, setImageGal2] = useState("");
  const [imageGal3, setImageGal3] = useState("");
  const [banner, setBanner] = useState("");
  const [parkingImage, setParkingImage] = useState("");
  const [trailMapImage, setTrailMapImage] = useState("");
  const [loading, setLoading] = useState(false);

  function validateLatLng(lat, lng) {
    let pattern = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}");

    return pattern.test(lat) && pattern.test(lng);
  }

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (
      banner.type === "image/jpeg" ||
      banner.type === "image/jpg" ||
      banner.type === "image/bmp" ||
      banner.type === "image/png" ||
      banner.type === "image/webp"
    ) {
      if (
        imageGal1.type === "image/png" ||
        imageGal1.type === "image/jpg" ||
        imageGal1.type === "image/jpeg"
      ) {
        if (
          imageGal2.type === "image/png" ||
          imageGal2.type === "image/jpg" ||
          imageGal2.type === "image/jpeg"
        ) {
          if (
            imageGal3.type === "image/png" ||
            imageGal3.type === "image/jpg" ||
            imageGal3.type === "image/jpeg"
          ) {
            if (
              parkingImage.type === "image/png" ||
              parkingImage.type === "image/jpg" ||
              parkingImage.type === "image/jpeg"
            ) {
              if (
                trailMapImage.type === "image/png" ||
                trailMapImage.type === "image/jpg" ||
                trailMapImage.type === "image/jpeg"
              ) {
                FireStoreService.addTrailImages("banners/" + trailName, banner)
                  .then(() => {
                    FireStoreService.addTrailImages(
                      "gallery/" + trailName,
                      imageGal1
                    )
                      .then(() => {
                        FireStoreService.addTrailImages(
                          "gallery/" + trailName,
                          imageGal2
                        )
                          .then(() => {
                            FireStoreService.addTrailImages(
                              "gallery/" + trailName,
                              imageGal3
                            )
                              .then(() => {
                                FireStoreService.addTrailImages(
                                  "parking/" + trailName,
                                  parkingImage
                                )
                                  .then(() => {
                                    FireStoreService.addTrailImages(
                                      "trailMap/" + trailName,
                                      trailMapImage
                                    )
                                      .then(() => {
                                        if (
                                          validateLatLng(
                                            parseFloat(latitude),
                                            parseFloat(longitude)
                                          )
                                        ) {
                                          FireStoreService.addTrail(
                                            atvOrOffroad,
                                            banner.name,
                                            bestSeasonsCheck,
                                            bikers,
                                            city,
                                            country,
                                            description,
                                            dogs,
                                            elevationGain,
                                            hikers,
                                            imageGal1.name,
                                            imageGal2.name,
                                            imageGal3.name,
                                            keywords,
                                            longitude,
                                            latitude,
                                            miles,
                                            obstaclesCheck,
                                            parkName,
                                            parkingImage.name,
                                            parkingNotes,
                                            parkingSpots,
                                            restrictions,
                                            state,
                                            trailHeadCheck,
                                            trailMap,
                                            trailMapImage.name,
                                            trailName,
                                            trailNotes,
                                            trailType,
                                            userId
                                          )
                                            .then(() => {
                                              setTrailAdded(
                                                "Trail added successfully!"
                                              );
                                              setAtvOrOffroad("Yes");
                                              setBanner("");
                                              setBestSeasons({});
                                              setBikers("Yes");
                                              setCity("");
                                              setCountry("");
                                              setDescription("");
                                              setDogs("Yes");
                                              setElevationGain("");
                                              setHikers("Yes");
                                              setImageGal1("");
                                              setImageGal2("");
                                              setImageGal3("");
                                              setKeywords("");
                                              setLongitude("");
                                              setLatitude("");
                                              setMiles("");
                                              setObstacles({});
                                              setParkName("");
                                              setParkingImage("");
                                              setParkingNotes("");
                                              setParkingSpots("");
                                              setRestrictions("");
                                              setState("");
                                              setTrailHead({});
                                              setTrailMap("");
                                              setTrailMapImage("");
                                              setTrailName("");
                                              setTrailNotes("");
                                              setTrailType("");
                                            })
                                            .catch((e) => {
                                              setError(
                                                "Error occured: " + e.message
                                              );
                                            });
                                        } else {
                                          setError(
                                            "Error! Entered longitude and latitude values are invalid"
                                          );
                                        }
                                      })
                                      .catch((e) => {
                                        setError("Error occured: " + e.message);
                                      });
                                  })
                                  .catch((e) => {
                                    setError("Error occured: " + e.message);
                                  });
                              })
                              .catch((e) => {
                                setError("Error occured: " + e.message);
                              });
                          })
                          .catch((e) => {
                            setError("Error occured: " + e.message);
                          });
                      })
                      .catch((e) => {
                        setError("Error occured: " + e.message);
                      });
                  })
                  .catch((e) => {
                    setError("Error occured: " + e.message);
                  });
              } else {
                setError("Uploaded parking image format is invalid!");
              }
            } else {
              setError("Uploaded trail map image format is invalid!");
            }
          } else {
            setError("Uploaded galllery image format is invalid!");
          }
        } else {
          setError("Uploaded gallery format is invalid!");
        }
      } else {
        setError("Uploaded gallery format is invalid!");
      }
    } else {
      setError("Uploaded banner image format is invalid!");
    }
  }

  const handleCheckChangeOne = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { trailHead } = trailHeadCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setTrailHead({
        trailHead: [...trailHead, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setTrailHead({
        trailHead: trailHead.filter((e) => e !== value),
      });
    }
  };

  const handleCheckChangeTwo = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { obstacles } = obstaclesCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setObstacles({
        obstacles: [...obstacles, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setObstacles({
        obstacles: obstacles.filter((e) => e !== value),
      });
    }
  };

  const handleCheckChangeThree = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { bestSeasons } = bestSeasonsCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setBestSeasons({
        bestSeasons: [...bestSeasons, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setBestSeasons({
        bestSeasons: bestSeasons.filter((e) => e !== value),
      });
    }
  };

  return (
    <div
      className="hero-container"
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        backgroundAttachment: "fixed",
      }}
    >
      <Card
        style={{
          minWidth: "50vw",
          overflowY: "auto",
          height: "1000px",
        }}
        className="card"
      >
        <Card.Body>
          <h1 className="h3 mb-3 font-weight-normal">Add Trail</h1>
          <form className="needs-validation" encType="multipart/form-data">
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trial Type</label>
                  <select
                    className="form-control"
                    name="trialType"
                    onChange={(e) => {
                      setTrailType(e.target.value);
                    }}
                  >
                    <option value="Loop">Loop</option>
                    <option value="Out & Back">Out & Back</option>
                    <option value="Lollipop">Lollipop</option>
                    <option value="One Way">One Way</option>
                  </select>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Restrictions</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="restrictions"
                    placeholder="Enter the Restrictions"
                    onChange={(e) => {
                      setRestrictions(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Park Name</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="parkName"
                    placeholder="Enter the Park name"
                    onChange={(e) => {
                      setParkName(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Hikers</label>
                  <select
                    className="form-control"
                    name="hikers"
                    onChange={(e) => {
                      setHikers(e.target.value);
                    }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trail Name</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="trailName"
                    placeholder="Enter the Trail name"
                    onChange={(e) => {
                      setTrailName(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Bikers</label>
                  <select
                    className="form-control"
                    name="bikers"
                    onChange={(e) => {
                      setBikers(e.target.value);
                    }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>City</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="Enter the City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Dogs</label>
                  <select
                    className="form-control"
                    name="dogs"
                    onChange={(e) => {
                      setDogs(e.target.value);
                    }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>State</label>
                  <select
                    className="form-control"
                    name="state"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  >
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District of Columbia">
                      District of Columbia
                    </option>
                    <option value="Florida">Florida</option>
                    <option value="Geogia">Geogia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Lousiana">Lousiana</option>
                    <option value="Geogia">Geogia</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wesconsin">Wesconsin</option>
                    <option value="Wyoming">Wyoming</option>
                  </select>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>ATV/Off-road</label>
                  <select
                    className="form-control"
                    name="atv/off-road"
                    onChange={(e) => {
                      setAtvOrOffroad(e.target.value);
                    }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Country</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="Enter the Country"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Miles</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="miles"
                    placeholder="Enter the Miles"
                    onChange={(e) => {
                      setMiles(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Elevation Gain</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="elevationGain"
                    placeholder="Enter the Elevation Gain"
                    onChange={(e) => {
                      setElevationGain(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trail Map Link</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="trailMap"
                    placeholder="Enter the Trail Map Link"
                    onChange={(e) => {
                      setTrailMap(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trail Map Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="trailMapImage"
                    onChange={(e) => {
                      setTrailMapImage(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Longitude</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="longitude"
                    placeholder="Enter the Longitude"
                    onChange={(e) => {
                      setLongitude(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Latitude</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="latitude"
                    placeholder="Enter the Trail Latitude"
                    onChange={(e) => {
                      setLatitude(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="form-check" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Trailhead</label>
              <div className="row">
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="trailHead"
                      value="Restrooms"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Restrooms
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="trailHead"
                      value="Water"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Water
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="trailHead"
                      value="Corrals"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Corrals
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="trailHead"
                      value="None"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;None
                  </label>
                </div>
              </div>
            </div>
            <div className="form-check" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Obstacles</label>
              <div className="row">
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="obstacles"
                      value="Bridges"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Bridges
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="obstacles"
                      value="Water Crossings"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Water Crossings
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="obstacles"
                      value="Rocks"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Rocks
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="obstacles"
                      value="None"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;None
                  </label>
                </div>
              </div>
            </div>
            <div className="form-check" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Best Seasons</label>
              <div className="row">
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="bestSeasons"
                      value="Spring"
                      onChange={handleCheckChangeThree}
                    />
                    &nbsp;Spring
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="bestSeasons"
                      value="Summer"
                      onChange={handleCheckChangeThree}
                    />
                    &nbsp;Summer
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="bestSeasons"
                      value="Fall"
                      onChange={handleCheckChangeThree}
                    />
                    &nbsp;Fall
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="bestSeasons"
                      value="Winter"
                      onChange={handleCheckChangeThree}
                    />
                    &nbsp;Winter
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Parking Spots</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="parkingSpots"
                    placeholder="Enter the Parking Spots"
                    onChange={(e) => {
                      setParkingSpots(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Parking Notes</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="parkingNotes"
                    placeholder="Enter the Parking Notes"
                    onChange={(e) => {
                      setParkingNotes(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Main Banner Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="banner"
                    onChange={(e) => {
                      setBanner(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg, bmp, png and webp files are allowed
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trail Notes</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="trailNotes"
                    placeholder="Enter the Trail Notes"
                    onChange={(e) => {
                      setTrailNotes(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Parking Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="parkingImage"
                    onChange={(e) => {
                      setParkingImage(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Image 1 for Gallery
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="imageGal1"
                    onChange={(e) => {
                      setImageGal1(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
              </div>
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Image 2 for Gallery
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="imageGal2"
                    onChange={(e) => {
                      setImageGal2(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
              </div>
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Image 3 for Gallery
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="imageGal3"
                    onChange={(e) => {
                      setImageGal3(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Keywords</label>
              <input
                required={true}
                type="text"
                className="form-control"
                name="keywords"
                placeholder="Keywords"
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>
                Trail Description/Comments
              </label>
              <textarea
                name="description"
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <br></br>
            </div>
            {error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <div className="d-grid">
              {loading && error.length == 0 && trailAdded.length == 0 ? (
                <div className="mt-3 mx-auto text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : null}
              <button
                className="btn btn-block"
                type="submit"
                style={{
                  marginTop: "15px",
                  backgroundColor: "#071c2f",
                  color: "white",
                }}
                onClick={onSubmit}
              >
                Add Trail
              </button>
              {trailAdded ? (
                <div class="alert alert-success" role="alert">
                  {trailAdded}
                </div>
              ) : null}
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
