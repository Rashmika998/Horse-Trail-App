import { React, useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/camps/FireStoreService";
import { Card, Col, Alert, Modal, Button } from "react-bootstrap";
import { FaCheckCircle, FaStar, FaMarker, FaHeart } from "react-icons/fa";
import { red } from "@mui/material/colors";

function MyCampsList() {
  const [pageLoading, setPageLoading] = useState(true);
  const [userID, setUserID] = useState("AAAAAAA");

  const [campsType, setCampsType] = useState(null);
  const [campIDs, setCampIDsList] = useState([]);
  const [camps, setCampsList] = useState([]);
  const [favCamps, setfavCampsList] = useState({});

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [completedError, setCompletedError] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);

  const getList = async (campsType) => {
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

    setCampsList(campsArr);
    setfavCampsList(favourites);
  };

  useEffect(() => {
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

    const onClickAddRating = async (event, campid) => {
      
  };

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
        {camps.length == 0 ? (
          <div className="mt-5">
            <div class="spinner-border" role="status"></div>&nbsp;&nbsp;
            <div class="spinner-grow" role="status"></div>
          </div>
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
          //   getImageURL(camp);
          return (
            <Col xs={12} md={6} lg={4} key={camp.id}>
              <Card key={camp.id} className="mt-5 ms-3">
                <Card.Img variant="top" src="" />
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
                      <div
                        className="btn btn-info col-lg-4 mx-2 mt-1"
                        onClick={(event) => onClickAddRating(event, camp.id)}
                      >
                        <FaStar /> &nbsp;Add Rating
                      </div>
                      <div
                        className="btn btn-secondary col-lg-4 mx-2 mt-1"
                        onClick={(event) => onClickAddReview(event, camp.id)}
                      >
                        <FaMarker /> &nbsp;Add Review
                        {favCamps[camp.id]}
                      </div>
                      {favCamps[camp.id] == false ? (
                        <div
                          className="btn btn-danger col-lg-3 mx-2 mt-1"
                          onClick={(event) =>
                            onClickAddFavourite(event, camp.id)
                          }
                        >
                          <FaHeart /> Add to Fav
                        </div>
                      ) : (
                        <div className="col-lg-3 mx-2 mt-1">
                          <FaHeart size={35} color={"#ae0000 "} />
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
