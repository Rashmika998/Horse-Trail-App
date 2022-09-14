import { React, useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { Card, Col, Alert, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function AddedTrails() {
  const { currentUser} = useAuth();
  const [userID, setUserID] = useState(null);

  const [trails, setTrailsList] = useState([]);
  const [show, setShow] = useState(false);
  const [imageURL, setImageURL] = useState({});
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    setLoading(true);

    const data = await FireStoreService.getMyTrails(userID);
    setTrailsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    await data.docs.map(async (doc) => {
      const ImgURL = await getImageURL(
        doc.data().trailName,
        doc.data().bannerName
      );
      setImageURL((imageURL) => ({
        ...imageURL,
        [doc.id]: ImgURL,
      }));
    });
    setLoading(false);
  };

  const getImageURL = async (trailName, bannerName) => {
    const url = await FireStoreService.getTrailImageURL(trailName, bannerName);
    return url;
  };
  useEffect(() => {
    if(currentUser){setUserID(currentUser.uid)}else{setUserID(null)}; 
    getList();
  }, [userID]);

  const onDelete = (id) => {
    FireStoreService.deleteTrail(id)
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

  return (
    <BodyContent>
      <div className="text-center">
        <h3>My Trails</h3>
        {loading == true ? (
          <div className="mt-5">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          ""
        )}

        {loading == false && trails.length == 0 ? (
          <div className="mt-5">No trails added</div>
        ) : (
          ""
        )}
      </div>

      <div className="row text-center">
        {trails.map((trail) => {
          //   getImageURL(trail);
          return (
            <Col xs={12} md={6} lg={4} key={trail.id}>
              <Card key={trail.id} className="mt-5 ms-3">
                <Card.Img
                  variant="top"
                  src={imageURL[trail.id]}
                  height="300vh"
                />
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
                  <div className="row">
                    <div className="col-md-6">
                      <a
                        href={"/edit-trail/" + trail.id}
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
                          <Modal.Title> Delete Trail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          Delete this trail?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="danger"
                            onClick={() => onDelete(trail.id)}
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

export default AddedTrails;
