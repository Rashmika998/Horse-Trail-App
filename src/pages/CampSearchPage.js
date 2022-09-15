import { React, useState, useEffect } from "react";
import { BodyContent } from "../globalStyles";
import { FaListUl, FaMapMarkedAlt } from "react-icons/fa";
import FireStoreService from "../utils/services/camps/FireStoreService";
import { Card,Col, Alert } from "react-bootstrap";
import GoogleMapPage from "./GoogleMapCampsPage";
import { useAuth } from "../contexts/AuthContext";
import Background from "../components/AddPage/CampsSearchPage.jpg";

function SearchPage() {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    inputCampType: "Any",
    inputSeason: "Any",
    inputCorrals: "Any",
    inputCampParkName: "",
    inputRVHookUps: "Any",
    inputState: "Any",
    inputParkOrTrail: "trail",
  });
  const [camps, setCampsList] = useState([]);
  const [retrived, setRetrived] = useState(false);

  const [markers, setMarkers] = useState([]);

  const [imageURL, setImageURL] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchList();
  };

  const getList = async () => {
    const data = await FireStoreService.getAllCamps();
    setCampsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    setRetrived(true);
    data.docs.map((doc) => {
      const marker = {
        id: doc.id,
        name: doc.data().campName,
        position: {
          lat: Number(doc.data().latitude),
          lng: Number(doc.data().longitude),
        },
      };
      if (!markers.includes(marker)) {
        markers.push(marker);
      }
    });

      await data.docs.map(async (doc) => {
        const ImgURL = await getImageURL(
          doc.data().campName,
          doc.data().bannerName
        );
        setImageURL((imageURL) => ({
          ...imageURL,
          [doc.id]: ImgURL,
        }));
      });
  };

  const getImageURL = async (campName, bannerName) => {
    const url = await FireStoreService.getCampImageURL(campName, bannerName);
    return url;
  };

  const getSearchList = async () => {
    const data = await FireStoreService.searchCamps(
      inputs.inputCampType,
      inputs.inputSeason,
      inputs.inputCampParkName,
      inputs.inputState,
      inputs.inputParkOrTrail,
      inputs.inputRVHookUps,
      inputs.inputCorrals
    );
    setCampsList([]);
    const campsArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCampsList(campsArray);
    setRetrived(true);
  };

  useEffect(() => {
    if(currentUser){setError("");}else{setError("You are not logged in");}
    getList();
  }, []);

  return (
    <>
      <BodyContent
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div
          className=" shadow-lg bg-white rounded container"
          style={{ padding: "50px" }}
        >
          {error && (
            <Alert className="text-center" variant="danger">
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-6  col mb-4">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inputParkOrTrail"
                    id="inlineRadio1"
                    value="trail"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    defaultChecked
                  />
                  <label className="form-check-label">Camp</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inputParkOrTrail"
                    id="inlineRadio2"
                    value="park"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />

                  <label className="form-check-label">Park</label>
                </div>
                <input
                  type="text"
                  name="inputCampParkName"
                  className="form-control"
                  placeholder="Park/Camp Name"
                  value={inputs.inputCampParkName || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-group col-6 mb-4 mt-4">
                <select
                  id="inputCampType"
                  name="inputCampType"
                  className="form-select"
                  value={inputs.inputCampType || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option defaultValue value="Any">
                    Any Camp Type
                  </option>
                  <option value="Public CampGround">Public CampGround</option>
                  <option value="Private CampGround">Private CampGround</option>
                </select>
              </div>
            </div>
            <div className="row text-center">
              <div className="form-group col-lg-3 col-md-6  mb-4">
                <select
                  id="inputSeason"
                  name="inputSeason"
                  className="form-select"
                  value={inputs.inputSeason || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option defaultValue value="Any">
                    Any Season
                  </option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter"> Winter</option>
                </select>
              </div>

              <div className="form-group col-lg-3 col-md-6  mb-4">
                <select
                  id="inputCorrals"
                  name="inputCorrals"
                  className="form-select"
                  value={inputs.inputCorrals || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option defaultValue value="Any">
                    Corrals
                  </option>
                  <option value="Required">Required</option>
                  <option value="Not Required">Not Required </option>
                </select>
              </div>

              <div className="form-group col-lg-3 col-md-6  mb-4">
                <select
                  id="inputRVHookUps"
                  name="inputRVHookUps"
                  className="form-select"
                  value={inputs.inputRVHookUps || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option defaultValue value="Any">
                    RV Hookups
                  </option>
                  <option value="Required">Required</option>
                  <option value="Not Required">Not Required </option>
                </select>
              </div>

              <div className="form-group col-lg-3 col-md-6  mb-4">
                <select
                  id="inputState"
                  name="inputState"
                  className="form-select"
                  value={inputs.inputState || ""}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option defaultValue value="Any">
                    State
                  </option>
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
                  <option value="Georgia">Georgia</option>
                  <option value="Guam">Guam</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Indiana">Indiana</option>
                  <option value="Iowa">Iowa</option>
                  <option value="Kansas">Kansas</option>
                  <option value="Kentucky">Kentucky</option>
                  <option value="Louisiana">Louisiana</option>
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
                  <option value="Northern Marianas Islands">
                    Northern Marianas Islands
                  </option>
                  <option value="Ohio">Ohio</option>
                  <option value="Oklahoma">Oklahoma</option>
                  <option value="Oregon">Oregon</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Rhode Island">Rhode Island</option>
                  <option value="South Carolina">South Carolina</option>
                  <option value="South Dakota">South Dakota</option>
                  <option value="Tennessee">Tennessee</option>
                  <option value="Texas">Texas</option>
                  <option value="Utah">Utah</option>
                  <option value="Vermont">Vermont</option>
                  <option value="Virginia">Virginia</option>
                  <option value="Virgin Islands">Virgin Islands</option>
                  <option value="Washington">Washington</option>
                  <option value="West Virginia">West Virginia</option>
                  <option value="Wisconsin">Wisconsin</option>
                  <option value="Wyoming">Wyoming</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="text-center col">
                <input
                  className="btn"
                  type="submit"
                  value="Search for Camps"
                  style={{
                    backgroundColor: "#071c2f",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <br></br>
            <div
              className="btn-group btn-group-toggle col-12"
              data-toggle="buttons"
            ></div>
          </form>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item col-6" role="presentation">
              <button
                className="btn active col-12"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                style={{
                  borderRadius: "4px",
                  backgroundColor: "#071c2f",
                  color: "white",
                }}
              >
                <FaMapMarkedAlt /> &nbsp;Map&nbsp;
              </button>
            </li>
            <li className="nav-item col-6" role="presentation">
              <button
                className=" btn col-12"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                style={{
                  borderRadius: "4px",
                  backgroundColor: "#071c2f",
                  color: "white",
                }}
              >
                <FaListUl /> &nbsp; List &nbsp;
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <BodyContent>
                {camps.length == 0 && retrived == false ? (
                  <div className="mt-3 mx-auto text-center">
                    <div className="spinner-border" role="status"></div>
                  </div>
                ) : (
                  ""
                )}
                {camps.length == 0 && retrived == true ? "No Camps Found" : ""}
                {camps.length > 0 ? (
                  <GoogleMapPage markers={markers} camps={camps} />
                ) : (
                  ""
                )}
              </BodyContent>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              {camps.length == 0 ? "No Camps Found" : ""}
              <div className="row text-center">
                {camps.map((camp) => {
                  // getImageURL(camp);
                  return (
                    <Col xs={12} md={6} lg={4} key={camp.id}>
                      <Card key={camp.id} className="mt-5 ms-3">
                        <Card.Img
                          variant="top"
                          src={imageURL[camp.id]}
                          height="200vh"
                        />
                        <Card.Body>
                          <Card.Title>
                            <a
                              href={"/display-camp/" + camp.id}
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              <h1 className="text-center">{camp.campName}</h1>
                            </a>
                          </Card.Title>
                          <h4 className="text-center">{camp.parkName}</h4>

                          <Card.Text className="text-center">
                            {camp.city} | {camp.state}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
       
        
      </BodyContent>
    </>
  );
}

export default SearchPage;
