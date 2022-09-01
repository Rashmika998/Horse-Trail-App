import React from "react";
import { BodyContent } from "../globalStyles";
import { FaHorse, FaCheckCircle, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function MyCamps() {
  return (
    <>
      <BodyContent>
        <div className="row text-center ml-4 mr-4 mt-5">
          <div className="col-md-4">
            <Link to="/my-camps-list/checkedIn" className="btn btn-warning">
              <FaHorse /> Camps to Visit
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/my-camps-list/completed" className="btn btn-success">
              <FaCheckCircle /> Completed Camps
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/my-camps-list/favourites" className="btn btn-danger">
              <FaHeart /> Favourite Camps
            </Link>
          </div>
        </div>
      </BodyContent>
    </>
  );
}

export default MyCamps;
