import { React, useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { Card, Col, Alert, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function AddedCamps() {
  const [userID, setUserID] = useState("nwdjBJLDJLNW");
  const [camps, setCampsList] = useState([]);

  const getList = async () => {
    const data = await FireStoreService.getMyCamps(userID);
    setCampsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <BodyContent>
      <div className="text-center">
        <h3>My Camps</h3>
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
        {camps.map((camp) => {
          //   getImageURL(trail);
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
                  <div className="row">
                    <div className="col-md-6">
                      <div
                        className="btn btn-warning"
                        style={{ width: "100%" }}
                      >
                        <FaEdit /> &nbsp;Update
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="btn btn-danger" style={{ width: "100%" }}>
                        <FaTrash /> &nbsp;Delete
                      </div>
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
