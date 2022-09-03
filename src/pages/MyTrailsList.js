import { React, useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { Card, Col, Alert, Modal, Button } from "react-bootstrap";
import { FaCheckCircle, FaStar, FaMarker, FaHeart } from "react-icons/fa";

function MyTrailsList() {
  const [pageLoading, setPageLoading] = useState(true);
  const [userID, setUserID] = useState("AAAAAAA");

  const [trailsType, setTrailsType] = useState(null);
  const [trailIDs, setTrailIDsList] = useState([]);
  const [trails, setTrailsList] = useState([]);
  const [favTrails, setfavTrailsList] = useState({});

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [completedError, setCompletedError] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);

  const [addRating, setAddRating] = useState(false);
  const getList = async (trailsType) => {
    const data = await FireStoreService.getTrailIDsList(trailsType, userID);
    const IDarr = data.docs.map((doc) => doc.data().trailID);
    setTrailIDsList(IDarr);
    const favourites = {};

    for (const doc of data.docs) {
      // if counter has element with given ID, increase the counter, otherwise initialize to 1
      favourites[doc.data().trailID] = doc.data().favourite;
    }
    const snapshot = await FireStoreService.getAllTrails();
    const trailsArr = [];
    snapshot.docs.map((doc) => {
      if (IDarr.includes(doc.id)) {
        trailsArr.push({ ...doc.data(), id: doc.id });
      }
    });

    setTrailsList(trailsArr);
    setfavTrailsList(favourites);
  };

  useEffect(() => {
    var url = document.location.href;
    var type = url.toString().split("/")[4];
    setTrailsType(type);
    getList(type);
  }, []);

  const onClickCompleted = async (event, trailid) => {
    setLoading(true);
    FireStoreService.updateTrailCheckinState(trailid, "Completed")
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

  const onClickAddRating = async (event, trailid) => {
    setAddRating(true);
  };

  const onClickAddReview = async (event, trailid) => {};

  const onClickAddFavourite = async (event, trailid) => {
    setLoading(true);
    FireStoreService.setTrailFavourite(trailid)
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
        {trailsType == "checkedIn" ? <h3>Trails to Ride</h3> : ""}
        {trailsType == "completed" ? <h3>Completed Trails</h3> : ""}
        {trailsType == "favourites" ? <h3>Favourite Trails</h3> : ""}
        {trails.length == 0 ? (
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
              <p>Error in marking the trail as completed</p>
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
                Added the trail to completed list
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
        {trails.map((trail) => {
          //   getImageURL(trail);
          return (
            <Col xs={12} md={6} lg={4} key={trail.id}>
              <Card key={trail.id} className="mt-5 ms-3">
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>
                    <a
                      href={"/display-trail/" + trail.id}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h1 className="text-center">{trail.trailName}</h1>
                    </a>
                  </Card.Title>
                  <h4 className="text-center">{trail.parkName}</h4>
                  <Card.Text className="text-center">
                    {trail.miles} MI | {trail.trailType}
                  </Card.Text>
                  {trailsType == "checkedIn" ? (
                    <div
                      className="btn btn-success"
                      onClick={(event) => onClickCompleted(event, trail.id)}
                    >
                      <FaCheckCircle /> &nbsp;Mark As Completed
                    </div>
                  ) : (
                    ""
                  )}

                  {trailsType == "completed" ? (
                    <div className="row">
                      <div
                        className="btn btn-info col-lg-4 mx-2 mt-1"
                        onClick={(event) => onClickAddRating(event, trail.id)}
                      >
                        <FaStar /> &nbsp;Add Rating
                      </div>
 
                      <div
                        className="btn btn-secondary col-lg-4 mx-2 mt-1"
                        onClick={(event) => onClickAddReview(event, trail.id)}
                      >
                        <FaMarker /> &nbsp;Add Review
                        {favTrails[trail.id]}
                      </div>
                      {favTrails[trail.id] == false ? (
                        <div
                          className="btn btn-danger col-lg-3 mx-2 mt-1"
                          onClick={(event) =>
                            onClickAddFavourite(event, trail.id)
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

export default MyTrailsList;