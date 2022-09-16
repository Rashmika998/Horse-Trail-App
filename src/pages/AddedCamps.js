import { React, useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/camps/FireStoreService";
import { Card, Col, Alert, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Background from "../components/AddPage/MyCamps.jpg";

function AddedCamps() {
  const { currentUser } = useAuth();
  const [userID, setUserID] = useState(null);
  const [camps, setCampsList] = useState([]);
  const [show, setShow] = useState(false);
  const [imageURL, setImageURL] = useState({});
  const [loading, setLoading] = useState(true);
  const getList = async () => {
    setLoading(true);

    const data = await FireStoreService.getMyCamps(userID);
    setCampsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    setLoading(false);
  };

  const getImageURL = async (campName, bannerName) => {
    const url = await FireStoreService.getCampImageURL(campName, bannerName);
    return url;
  };

  useEffect(() => {
    if (currentUser) {
      setUserID(currentUser.uid);
    } else {
      setUserID(null);
    }
    getList();
  }, [userID]);

  const onDelete = (id) => {
    FireStoreService.deleteCamp(id)
      .then(() => {
        FireStoreService.deleteCampChecksIn(id)
          .then(() => {
            window.location.reload(true);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClose = () => setShow(false);
  function handleShowDelete() {
    setShow(true);
  }

  return (
    <BodyContent
      style={{
        backgroundImage: `url(${Background})`,
        position: "absolute",
      }}
    >
      <div className="text-center">
        <div className="shadow p-2 mb-1 mx-5 card font-weight-bold rounded">
          <h3>My Camps</h3>
        </div>
        {loading == true ? (
          <div className="mt-5">
            <div className="spinner-border  text-light" role="status"></div>
          </div>
        ) : (
          ""
        )}

        {loading == false && camps.length == 0 ? (
          <div className="mt-3  mx-5  text-center shadow p-2 mb-1 card font-weight-bold rounded">
            No camps added
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="row text-center mx-4">
        {camps.map((camp) => {
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
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h1 className="text-center">{camp.campName}</h1>
                    </a>
                  </Card.Title>
                  <h4 className="text-center">{camp.parkName}</h4>
                  <Card.Text className="text-center">
                    {camp.city} | {camp.state}
                  </Card.Text>
                  <div className="row">
                    <div className="col-md-6">
                      <a
                        href={"/edit-camp/" + camp.id}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div
                          className="btn btn-warning"
                          style={{ width: "100%" }}
                        >
                          <FaEdit /> &nbsp;Update
                        </div>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="btn btn-danger"
                        style={{ width: "100%" }}
                        onClick={handleShowDelete}
                      >
                        <FaTrash /> &nbsp;Delete
                      </div>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header
                          closeButton
                          style={{
                            backgroundColor: "#C41E3A",
                            color: "white",
                          }}
                        >
                          <Modal.Title> Delete Camp</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          Delete this camp?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="danger"
                            onClick={() => onDelete(camp.id)}
                          >
                            Yes
                          </Button>
                          <Button variant="secondary" onClick={handleClose}>
                            No
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </div>
    </BodyContent>
  );
}

export default AddedCamps;
