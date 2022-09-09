import React, { useEffect, useState } from "react";
import { BodyContent } from "../globalStyles";
import EditProfile from "../components/EditProfile/EditProfile";
import axios from "axios";
import { app,auth } from "../utils/firestore";
import { useAuth } from "../contexts/AuthContext"
import { db } from "../utils/firestore";
import firebase from "firebase/app";
import {collection, getDocs}  from "firebase/firestore";


function MyProfile() {
  const [EditProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ridingLevel, setRidingLevel] = useState("");
  const { currentUser} = useAuth();
  function handleClick() {
    setEditProfileModalIsOpen(true);
  }

  /*useEffect(()=>{
    getUserDetails()
  },[])

  useEffect(()=>{
    console.log(userDetails)
  },[])

  function getUserDetails(){
     const UserDetailsRef = collection(db, "users")
     getDocs(UserDetailsRef).then(response =>{
      const mapUserdetails= response.docs.map(doc => ({
        
          data:doc.data(),
          id: doc.id,
      }))
      setUserDetails(mapUserdetails)
     }).catch(error => console.log(error.message))
  } */
  useEffect(()=>{
    getUserDetails()
  },[])

  const docRef = db.collection("users").doc(currentUser.uid);
  function getUserDetails(){
  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
           const mapUserDetails = doc.data();
          setUserDetails(mapUserDetails);
      } else {
          //doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  }
  
  
   
  
  return (
    <BodyContent>
      <div className="container-fluid" style={{ paddingTop: "40px" }}>
        <div className="row">
          <div className="col-lg-4">
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
                    <tr>
                      <th>Added Trails</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Added Camps</th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-primary"
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
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">Locations</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Add Location
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">Horses</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BodyContent>
  );
}

export default MyProfile;
