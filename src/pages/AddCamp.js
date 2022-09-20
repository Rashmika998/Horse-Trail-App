import React, { useEffect, useState } from "react";
import FireStoreService from "../utils/services/camps/FireStoreService";
import { useAuth } from "../contexts/AuthContext";
import "../components/AuthPages/Auth.css";
import { Card } from "react-bootstrap";

export default function AddCamp() {
  const { currentUser } = useAuth();
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    if (currentUser) {
      setUserID(currentUser.uid);
    } else {
      setUserID(null);
    }
  }, []);

  const [campDescription, setCampDescription] = useState("");
  const [campName, setCampName] = useState("");
  const [campNotes, setCampNotes] = useState("");
  const [campType, setCampType] = useState("Any Camp Type");
  const [city, setCity] = useState("");
  const [costPerNight, setCostPerNight] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [horseSite, setHorseSite] = useState("");
  const [instagram, setInstagram] = useState("Yes");
  const [reservation, setReservation] = useState("Yes");
  const [keywords, setKeywords] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [paperworkRequired, setPaperworkRequired] = useState("Yes");
  const [parkName, setParkName] = useState("");
  const [petPolicy, setPetPolicy] = useState("");
  const [phone, setPhone] = useState("");
  const [reservationCall, setReservationCall] = useState("");
  const [reservationDescription, setReservationDescription] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationLink, setReservationLink] = useState("");
  const [resOrPricing, setResOrPricing] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [roadToCamp, setRoadToCamp] = useState("Paved Road to Camp");
  const [state, setState] = useState("Alabama");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [campAdded, setCampAdded] = useState("");
  const [campSiteTypesCheck, setCampSiteTypes] = useState({
    campSiteTypes: [],
  });
  const [amenitiesCheckTemp, setAmenities] = useState({
    amenities: [],
  });
  const [bestSeasonsCheck, setBestSeasons] = useState({
    bestSeasons: [],
  });

  const [imageGal1, setImageGal1] = useState("");
  const [imageGal2, setImageGal2] = useState("");
  const [imageGal3, setImageGal3] = useState("");
  const [banner, setBanner] = useState("");
  const [parkingImage, setParkingImage] = useState("");

  const [loading, setLoading] = useState(false);
  const handleCheckChangeOne = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { campSiteTypes } = campSiteTypesCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setCampSiteTypes({
        campSiteTypes: [...campSiteTypes, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setCampSiteTypes({
        campSiteTypes: campSiteTypes.filter((e) => e !== value),
      });
    }
  };

  const handleCheckChangeTwo = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { amenities } = amenitiesCheckTemp;

    // Case 1 : The user checks the box
    if (checked) {
      setAmenities({
        amenities: [...amenities, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setAmenities({
        amenities: amenities.filter((e) => e !== value),
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

  function validateLatLng(lat, lng) {
    return (
      isFinite(lat) &&
      Math.abs(lat) <= 90 &&
      isFinite(lng) &&
      Math.abs(lng) <= 180
    );
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
        parkingImage.type === "image/png" ||
        parkingImage.type === "image/jpg" ||
        parkingImage.type === "image/jpeg"
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
              FireStoreService.addCampImages("banners/" + campName, banner)
                .then(() => {
                  FireStoreService.addCampImages(
                    "parking/" + campName,
                    parkingImage
                  )
                    .then(() => {
                      FireStoreService.addCampImages(
                        "gallery/" + campName,
                        imageGal1
                      )
                        .then(() => {
                          FireStoreService.addCampImages(
                            "gallery/" + campName,
                            imageGal2
                          )
                            .then(() => {
                              FireStoreService.addCampImages(
                                "gallery/" + campName,
                                imageGal3
                              )
                                .then(() => {
                                  const tempObj = {};
                                  let tempArr = amenitiesCheckTemp.amenities;
                                  tempObj.Corrals = false;
                                  tempObj.Water = false;
                                  tempObj.Restrooms = false;
                                  tempObj.Restaurants = false;
                                  tempObj.Hookup = false;
                                  tempObj.None = false;

                                  for (var i = 0; i < tempArr.length; i++) {
                                    if (
                                      amenitiesCheckTemp.amenities[i] ===
                                      "Corrals"
                                    ) {
                                      tempObj.Corrals = true;
                                    } else if (
                                      amenitiesCheckTemp.amenities[i] ===
                                      "Water"
                                    ) {
                                      tempObj.Water = true;
                                    } else if (
                                      amenitiesCheckTemp.amenities[i] ===
                                      "Restrooms"
                                    ) {
                                      tempObj.Restrooms = true;
                                    } else if (
                                      amenitiesCheckTemp.amenities[i] ===
                                      "Restaurants"
                                    ) {
                                      tempObj.Restaurants = true;
                                    } else if (
                                      amenitiesCheckTemp.amenities[i] ===
                                      "Hookup"
                                    ) {
                                      tempObj.Hookup = true;
                                    } else if (
                                      amenitiesCheckTemp.amenities[i] === "None"
                                    ) {
                                      tempObj.None = true;
                                    }
                                  }
                                  const amenitiesCheck = {};
                                  amenitiesCheck.amenities = tempObj;

                                  var rePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
                                  /* Allowed phn number formats
                                  (123) 456-7890. (123)456-7890, 123-456-7890, 1234567890 */
                                  if (
                                    rePhone.test(phone) &&
                                    rePhone.test(reservationCall)
                                  ) {
                                    var reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                                    if (
                                      reEmail.test(email) &&
                                      reEmail.test(reservationEmail)
                                    ) {
                                      if (validateLatLng(latitude, longitude)) {
                                        FireStoreService.addCamp(
                                          amenitiesCheck,
                                          banner.name,
                                          bestSeasonsCheck,
                                          campDescription,
                                          campName,
                                          campNotes,
                                          campSiteTypesCheck,
                                          campType,
                                          city,
                                          costPerNight,
                                          email,
                                          facebook,
                                          horseSite,
                                          imageGal1.name,
                                          imageGal2.name,
                                          imageGal3.name,
                                          instagram,
                                          keywords,
                                          longitude,
                                          latitude,
                                          paperworkRequired,
                                          parkingImage.name,
                                          parkName,
                                          petPolicy,
                                          phone,
                                          reservation,
                                          reservationCall,
                                          reservationDescription,
                                          reservationEmail,
                                          reservationLink,
                                          resOrPricing,
                                          restrictions,
                                          roadToCamp,
                                          state,
                                          twitter,
                                          userID,
                                          website
                                        )
                                          .then(() => {
                                            setError("");
                                            setCampAdded(
                                              "Camp added successfully!"
                                            );
                                            setCampDescription("");
                                            setCampName("");
                                            setCampNotes("");
                                            setBestSeasons({});
                                            setCostPerNight("");
                                            setCity("");
                                            setEmail("");
                                            setWebsite("");
                                            setInstagram("");
                                            setFacebook("");
                                            setHorseSite("");
                                            setImageGal1("");
                                            setImageGal2("");
                                            setImageGal3("");
                                            setKeywords("");
                                            setLongitude("");
                                            setLatitude("");
                                            setReservation("Yes");
                                            setReservationCall("");
                                            setReservationDescription("");
                                            setReservationEmail("");
                                            setReservationLink("");
                                            setRoadToCamp("");
                                            setResOrPricing("");
                                            setCampSiteTypes("");
                                            setParkName("");
                                            setParkingImage("");
                                            setTwitter("");
                                            setAmenities("");
                                            setPetPolicy("");
                                            setPhone("");
                                            setRestrictions("");
                                            setState("");
                                            setReservation("");
                                            setPaperworkRequired("Yes");
                                            setCampType();
                                            setCampAdded(
                                              "Camp added successfully!"
                                            );
                                          })
                                          .catch((e) => {
                                            setError(
                                              "Error occured: " + e.message
                                            );
                                            console.log(e);
                                          });
                                      } else {
                                        setError(
                                          "Error! Entered longitude or latitude values are invalid"
                                        );
                                      }
                                    } else {
                                      setError(
                                        "Error! Entered email address format is invalid"
                                      );
                                    }
                                  } else {
                                    setError(
                                      "Error! Entered phone number or reservation call format is invalid"
                                    );
                                  }
                                })
                                .catch((e) => {
                                  setError("Error occured!");
                                  console.log(e);
                                });
                            })
                            .catch((e) => {
                              setError("Error occured!");
                              console.log(e);
                            });
                        })
                        .catch((e) => {
                          setError("Error occured!");
                          console.log(e);
                        });
                    })
                    .catch((e) => {
                      setError("Error occured!");
                      console.log(e);
                    });
                })
                .catch((e) => {
                  setError("Error occured!");
                  console.log(e);
                });
            } else {
              setError("Uploaded gallery image format is invalid!");
            }
          } else {
            setError("Uploaded gallery image format is invalid!");
          }
        } else {
          setError("Uploaded gallery image format is invalid!");
        }
      } else {
        setError("Uploaded parking image format is invalid!");
      }
    } else {
      setError("Uploaded banner image format is invalid!");
    }
  }

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
          <h1 className="h3 mb-3 font-weight-normal">Add Camp</h1>
          <form className="needs-validation" encType="multipart/form-data">
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Camp Type</label>
                  <select
                    className="form-control"
                    name="campType"
                    onChange={(e) => {
                      setCampType(e.target.value);
                    }}
                  >
                    <option value="Any Camp Type">Any Camp Type</option>
                    <option value="Public Campground">Public Campground</option>
                    <option value="Private Campground">
                      Private Campground
                    </option>
                  </select>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Road to Camp</label>
                  <select
                    className="form-control"
                    name="roadToCamp"
                    onChange={(e) => {
                      setRoadToCamp(e.target.value);
                    }}
                  >
                    <option value="Paved Road to Camp">
                      Paved Road to Camp
                    </option>
                    <option value="Paved+ some dirt road">
                      Paved+ some dirt road
                    </option>
                    <option value="Lots of bumpy roads">
                      Lots of bumpy roads
                    </option>
                  </select>
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
                  <label style={{ marginBottom: "5px" }}>Camp Name</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="campName"
                    placeholder="Enter the Camp name"
                    onChange={(e) => {
                      setCampName(e.target.value);
                    }}
                  ></input>
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
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Phone</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Enter the Phone Number"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Paperwork Required
                  </label>
                  <select
                    className="form-control"
                    name="paperworkRequired"
                    onChange={(e) => {
                      setPaperworkRequired(e.target.value);
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
                  <label style={{ marginBottom: "5px" }}>Email</label>
                  <input
                    required={true}
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter the Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Pet Policy</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="petPolicy"
                    placeholder="Enter the Pet Policy"
                    onChange={(e) => {
                      setPetPolicy(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Website</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="website"
                    placeholder="Enter the Website"
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  ></input>
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
                  <label style={{ marginBottom: "5px" }}>Facebook</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="facebook"
                    placeholder="Enter the Facebook Link"
                    onChange={(e) => {
                      setFacebook(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Reservation</label>
                  <select
                    className="form-control"
                    name="reservation"
                    onChange={(e) => {
                      setReservation(e.target.value);
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
                  <label style={{ marginBottom: "5px" }}>Twitter</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="twitter"
                    placeholder="Enter the Twitter Link"
                    onChange={(e) => {
                      setTwitter(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Reservation Link
                  </label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="reservationLink"
                    placeholder="Enter the Reservation Link"
                    onChange={(e) => {
                      setReservationLink(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Instagram</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="instagram"
                    placeholder="Enter the Instagram Link"
                    onChange={(e) => {
                      setInstagram(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Reservation Call
                  </label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="reservationCall"
                    placeholder="Enter the Reservation Call"
                    onChange={(e) => {
                      setReservationCall(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Reservation Description
                  </label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="reservationDescription"
                    placeholder="Enter the Total Site"
                    onChange={(e) => {
                      setReservationDescription(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Reservation Email
                  </label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="reservationEmail"
                    placeholder="Enter the Reservation Email"
                    onChange={(e) => {
                      setReservationEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Horse Site</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="horseSite"
                    placeholder="Enter the Horse Site"
                    onChange={(e) => {
                      setHorseSite(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-6">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Cost per Night</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="costPerNight"
                    placeholder="Enter the Cost Per Night"
                    onChange={(e) => {
                      setCostPerNight(e.target.value);
                    }}
                  ></input>
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
              <label style={{ marginBottom: "5px" }}>Camp Site Types</label>
              <div className="row">
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="campSiteTypes"
                      value="Dispersed"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Dispersed
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="campSiteTypes"
                      value="Tent Site"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Tent Site
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="campSiteTypes"
                      value="Rv Site"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Rv Site
                  </label>
                </div>
                <div className="col md-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="campSiteTypes"
                      value="Cabins"
                      onChange={handleCheckChangeOne}
                    />
                    &nbsp;Cabins
                  </label>
                </div>
              </div>
            </div>
            <div className="form-check" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Amenities</label>
              <div className="row">
                <div className="col md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="amenities"
                      value="Corrals"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Corrals
                  </label>
                </div>
                <div className="col md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="amenities"
                      value="Water"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Water
                  </label>
                </div>
                <div className="col md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="amenities"
                      value="Restrooms"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Restrooms
                  </label>
                </div>
                <div className="col md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="amenities"
                      value="Restaurants"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Restaurants
                  </label>
                </div>
                <div className="col md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="amenities"
                      value="Hookup"
                      onChange={handleCheckChangeTwo}
                    />
                    &nbsp;Hookup
                  </label>
                </div>
                <div className="col md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="amenities"
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
              <div className="col md-3">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Camp Notes</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="campNotes"
                    placeholder="Enter the Camp Notes"
                    onChange={(e) => {
                      setCampNotes(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-3">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Main Banner Photo
                  </label>
                  <input
                    required={true}
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
              <div className="col md-3">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Parking Image</label>
                  <input
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
            <div className="row">
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Reservation and Pricing
                  </label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="resOrPricing"
                    placeholder="Reservation or Pricing"
                    onChange={(e) => {
                      setResOrPricing(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-4">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Camp Description
                  </label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="campDescription"
                    placeholder="Camp Description"
                    onChange={(e) => {
                      setCampDescription(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="col md-4">
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
                  <span style={{ fontSize: "12px" }}>
                    Add keywords in comma separated
                  </span>
                </div>
              </div>
            </div>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <div className="d-grid">
              {loading && error.length == 0 && campAdded.length == 0 ? (
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
                Add Camp
              </button>
              <br></br>
              {campAdded ? (
                <div className="alert alert-success" role="alert">
                  {campAdded}
                </div>
              ) : null}
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
