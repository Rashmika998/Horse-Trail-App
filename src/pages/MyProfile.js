import React, { useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import EditProfile from "../components/EditProfile/EditProfile";
import { app, auth } from "../utils/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firestore";
import firebase from "firebase/app";
import { collection, getDocs } from "firebase/firestore";
import { FaHorse, FaCheckCircle, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

function MyProfile() {
  const [EditProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ridingLevel, setRidingLevel] = useState("");
  const { currentUser } = useAuth();
  const [state, setState]= useState({
    latitude: null,
    longitude: null,
    userAddress : null
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  function getLocation() {
   
  }

  function getCoordinates(position) {
   setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
   })
  }
  
  function handleLocationError(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
       alert("User denied the request for Geolocation.") 
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.") 
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
       alert("An unknown error occurred.") 
        break;
    }
  }
  function handleClick() {
    setEditProfileModalIsOpen(true);
  }

  useEffect(() => {
    getUserDetails();
    if(navigator.geolocation)
    {(navigator.geolocation.getCurrentPosition(getCoordinates,handleLocationError))}
  }, []);

  const docRef = db.collection("users").doc(currentUser.uid);
  function getUserDetails() {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const mapUserDetails = doc.data();
          setUserDetails(mapUserDetails);
        } else {
          //doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  return (
    <BodyContent>
      <div className="container-fluid" style={{ paddingTop: "40px" }}>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">Personal Info</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <table className="table table-borderless">
                  <tbody style={{ fontSize: "12px" }}>
                    <tr>
                      <th>Email</th>
                      <td>{currentUser.email}</td>
                    </tr>
                    <tr>
                      <th>First Name</th>
                      <td>{userDetails.firstName}</td>
                    </tr>
                    <tr>
                      <th>Last Name</th>
                      <td>{userDetails.lastName}</td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>{userDetails.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>Riding Level</th>
                      <td>{userDetails.ridingLevel}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-primary w-50"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={handleClick}
                >
                  Edit Profile
                </button>
                {<EditProfile />}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">Location</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                
      {(isLoaded && state.latitude!=null && state.longitude!=null)?<GoogleMap
      onLoad={(map) => {
        const bounds = new window.google.maps.LatLngBounds();

          var lng = state.longitude;
          var lat = state.latitude;
          console.log(lng)
          bounds.extend({ lat: lat, lng: lng });
        
       // map.fitBounds(bounds);
       
        map.setCenter(new window.google.maps.LatLng(lat, lng));
        map.setZoom(17);
      }}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "50vh" }}
    >
   <MarkerF
                
                label="t"
                position={{lat: Number(state.latitude), lng: Number(state.longitude)}}
               
              >
              </MarkerF>
    </GoogleMap>:""
   }      
      
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"15px"}}>
          <div className="col-lg-6">
            <div className="card">
             
              <div className="card-body text-center">
                <h5 className="card-title"></h5>
                <Link to="/added-camps" className="btn btn-success col-lg-5 ">
                Added Trails
            </Link>
            <Link to="/add-camps" className="btn btn-primary col-lg-5" style={{marginLeft:"15px"}}>
                Add Trails
            </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
             
              <div className="card-body text-center">
                <h5 className="card-title"></h5>
               
                <Link to="/added-camps" className="btn btn-success col-lg-5">
                Added Camps
            </Link>
            <Link to="/add-camps" className="btn btn-primary col-lg-5" style={{marginLeft:"15px"}}>
                Add Camps
            </Link>
              </div>
            </div>
          </div>
          </div>
        <div className="row" style={{paddingTop:"15px"}}>
          <div className="col-lg-6">
            <div className="card">
            <div className="card-header">Trails</div>
              <div className="card-body">
              <div className="row text-center ml-4 mr-4 mt-2">
          <div className="col-md-4" style={{marginTop:"5px"}}>
            <Link to="/my-trails-list/checkedIn" className="btn btn-warning">
              <FaHorse /> Trails to Ride
            </Link>
          </div>
          <div className="col-md-4" style={{marginTop:"5px"}}>
            <Link to="/my-trails-list/completed" className="btn btn-success">
              <FaCheckCircle /> Completed Trails
            </Link>
          </div>
          <div className="col-md-4" style={{marginTop:"5px"}}>
            <Link to="/my-trails-list/favourites" className="btn btn-danger">
              <FaHeart /> Favourite Trails
            </Link>
          </div>
        </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
            <div className="card-header">Camps</div>
              <div className="card-body">
              <div className="row text-center ml-4 mr-4 mt-2">
          <div className="col-md-4" style={{marginTop:"5px"}}>
            <Link to="/my-camps-list/checkedIn" className="btn btn-warning">
              <FaHorse /> Camps to Ride
            </Link>
          </div>
          <div className="col-md-4" style={{marginTop:"5px"}}>
            <Link to="/my-camps-list/completed" className="btn btn-success">
              <FaCheckCircle /> Visited Camps
            </Link>
          </div>
          <div className="col-md-4" style={{marginTop:"5px"}}>
            <Link to="/my-camps-list/favourites" className="btn btn-danger">
              <FaHeart /> Favourite Camps
            </Link>
          </div>
        </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    </BodyContent>
  );
}

export default MyProfile;
