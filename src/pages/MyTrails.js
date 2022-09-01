import React from "react";
import { BodyContent } from "../globalStyles";
import { FaHorse, FaCheckCircle, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function MyTrails() {
  return (
    <>
      <BodyContent>
        <div className="row text-center ml-4 mr-4 mt-5">
          <div className="col-md-4">
            <Link to="/my-trails-list/checkedIn" className="btn btn-warning">
              <FaHorse /> Trails to Ride
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/my-trails-list/completed" className="btn btn-success">
              <FaCheckCircle /> Completed Trails
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/my-trails-list/favourites" className="btn btn-danger">
              <FaHeart /> Favourite Trails
            </Link>
          </div>
        </div>
      </BodyContent>
    </>
  );
}

export default MyTrails;
