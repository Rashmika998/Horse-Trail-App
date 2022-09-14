import { React, useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/camps/FireStoreService";
import { Card, Col, Alert, Modal, Button } from "react-bootstrap";
import { FaCheckCircle, FaStar, FaMarker, FaHeart } from "react-icons/fa";
import { red } from "@mui/material/colors";
import { useAuth } from "../contexts/AuthContext";

function MyCampsList() {
  const [pageLoading, setPageLoading] = useState(true);
  const { currentUser} = useAuth();
  const [userID, setUserID] = useState(null);


  const [campsType, setCampsType] = useState(null);
  const [campIDs, setCampIDsList] = useState([]);
  const [camps, setCampsList] = useState([]);
  const [favCamps, setfavCampsList] = useState({});

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [completedError, setCompletedError] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [imageURL, setImageURL] = useState({});

  const getList = async (campsType) => {
    setPageLoading(true);

    const data = await FireStoreService.getCampIDsList(campsType, userID);
    const IDarr = data.docs.map((doc) => doc.data().campID);
    setCampIDsList(IDarr);
    const favourites = {};

    for (const doc of data.docs) {
      // if counter has element with given ID, increase the counter, otherwise initialize to 1
      favourites[doc.data().campID] = doc.data().favourite;
    }
    const snapshot = await FireStoreService.getAllCamps();
    const campsArr = [];
    snapshot.docs.map((doc) => {
      if (IDarr.includes(doc.id)) {
        campsArr.push({ ...doc.data(), id: doc.id });
      }
    });

    await snapshot.docs.map(async (doc) => {
      const ImgURL = await getImageURL(
        doc.data().campName,
        doc.data().bannerName
      );
      setImageURL((imageURL) => ({
        ...imageURL,
        [doc.id]: ImgURL,
      }));
    });
    setCampsList(campsArr);
    setfavCampsList(favourites);
    setPageLoading(false);
  };

  const getImageURL = async (campName, bannerName) => {
    const url = await FireStoreService.getCampImageURL(campName, bannerName);
    return url;
  };

  useEffect(() => {
    if(currentUser){setUserID(currentUser.uid)}else{setUserID(null)}; 
    var url = document.location.href;
    var type = url.toString().split("/")[4];
    setCampsType(type);
    getList(type);
  }, []);

  const onClickCompleted = async (event, campid) => {
    setLoading(true);
    FireStoreService.updateCampCheckinState(campid, "Completed")
      .then(function () {
        setShow(true);
        setMarkCompleted(true);
        setCompletedError(false);
        setLoading(false);
      })
      .catch(function () {
        setShow(true);
        setCompletedError(true);
        setMarkCompleted(false);
        setLoading(false);
      });
  };

  const onClickAddRating = async (event, campid) => {};

  const onClickAddReview = async (event, campid) => {};

  const onClickAddFavourite = async (event, campid) => {
    setLoading(true);
    FireStoreService.setCampFavourite(campid)
      .then(function () {
        setLoading(false);
        window.location.reload();
      })
      .catch(function () {
        setLoading(false);
      });
  };

  return (
    <BodyContent>
      <div className="text-center">
        {campsType == "checkedIn" ? <h3>Camps to Visit</h3> : ""}
        {campsType == "completed" ? <h3>Completed Camps</h3> : ""}
        {campsType == "favourites" ? <h3>Favourite Camps</h3> : ""}
        {pageLoading == true ? (
          <div className="mt-3 mx-auto text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          ""
        )}

        {pageLoading == false && camps.length == 0 ? (
          <div className="mt-3 mx-auto text-center">No camps added</div>
        ) : (
          ""
        )}
      </div>
      <div className="row text-center">
        <div className="col-5 mx-auto">
          {show && completedError && !loading ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <p>Error in marking the camp as completed</p>
            </Alert>
          ) : (
            ""
          )}

          {show && markCompleted && !loading ? (
            <Modal
              show={markCompleted}
              backdrop="static"
              keyboard={false}
              className="mt-5 pt-5"
            >
              <Modal.Body className="text-center">
                Added the camp to completed list
                <Button
                  className="mt-3"
                  style={{ width: "60%" }}
                  variant="success"
                  onClick={() => {
                    setShow(false);
                    window.location.reload();
                  }}
                >
                  Ok
                </Button>
              </Modal.Body>
            </Modal>
          ) : (
            ""
          )}

          {loading ? (
            <Alert variant="info">
              <p>Processing the action</p>
            </Alert>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="row text-center">
        {camps.map((camp) => {
          return (
            <Col xs={12} md={6} lg={4} key={camp.id}>
              <Card key={camp.id} className="mt-5 ms-3">
                <Card.Img
                  variant="top"
                  src={imageURL[camp.id]}
                  height="300vh"
                />
                <Card.Body>
                  <Card.Title>
                    <a
                      href={"/display-camp/" + camp.id}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h1 className="text-center">{camp.campName}</h1>
                    </a>
                  </Card.Title>
                  <h4 className="text-center">{camp.parkName}</h4>
                  <Card.Text className="text-center">
                    {camp.city} | {camp.state}
                  </Card.Text>
                  {campsType == "checkedIn" ? (
                    <div
                      className="btn btn-success"
                      onClick={(event) => onClickCompleted(event, camp.id)}
                    >
                      <FaCheckCircle /> &nbsp;Mark As Completed
                    </div>
                  ) : (
                    ""
                  )}

                  {campsType == "completed" ? (
                    <div className="row">
                      {favCamps[camp.id] == false ? (
                        <div className="mx-2 mt-1">
                          <div
                            className="btn btn-danger  mx-2 mt-1"
                            onClick={(event) =>
                              onClickAddFavourite(event, camp.id)
                            }
                          >
                       Add to Favourites
                          </div>
                        </div>
                      ) : (
                        <div className="mx-2 mt-1">
                          <div className="btn btn-danger  mx-2 mt-1">
                            <FaHeart /> Added to Favourites
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </div>
    </BodyContent>
  );
}

export default MyCampsList;
