import React, { useContext, useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db, auth } from "../../utils/firestore";
import MyProfile from "../../pages/MyProfile";
import { Alert } from "react-bootstrap";

function EditProfile() {
  const [userDetails, setUserDetails] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ridingLevel, setRidingLevel] = useState("");
  const [alerts, setAlerts] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);
  const docRef = db.collection("users").doc(currentUser.uid);
  function getUserDetails() {
    docRef
      .get()
      .then((doc) => {
        setUserDetails(doc.data());
        setFirstName(doc.data().firstName);
        setLastName(doc.data().lastName);
        setPhoneNumber(doc.data().mobileNo);
        if (doc.data().ridingLevel) {
          setRidingLevel(doc.data().ridingLevel);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("users")
      .doc(currentUser.uid)
      .update(
        {
          email: emailRef.current.value,
          firstName: firstName,
          lastName: lastName,
          mobileNo: phoneNumber,
          ridingLevel: ridingLevel,
        },
        { mergeFields: ["firstName", "lastName", "phoneNumber", "ridingLevel"] }
      )
      .then(() => {
        setLoader(false);
        setAlerts("Your details have been submitted👍");
      
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
        setAlerts(error);
      });
    const promises = [];
    setLoader(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        setSuccess("Profile is updated");
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login")
          setError("Profile update unsuccessful. Login again and try");
        if (error.code === "auth/invalid-email")
          setError("Please enter an email to proceed");
        console.log(error);
      });

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setRidingLevel("");
    emailRef.current.value = "";
  };
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Edit Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && alerts && <Alert variant="success">{success}</Alert>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder={currentUser.email}
                ref={emailRef}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phonenumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="ridinglevel" className="form-label">
                Riding Level
              </label>
              <input
                type="text"
                className="form-control"
                id="ridinglevel"
                placeholder="Riding Level"
                value={ridingLevel}
                onChange={(e) => setRidingLevel(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder=""
                ref={passwordRef}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password-confirm" className="form-label">
                Password Confirmation
              </label>
              <input
                type="password"
                className="form-control"
                id="password-confirm"
                placeholder="Leave blank to keep the same"
                ref={passwordConfirmRef}
              ></input>
            </div>
          </div>

          <div className="modal-footer">
            <button
              disabled={loader}
              type="button"
              className="btn btn-primary"
              style={{ align: "center" }}
              onClick={submitHandler}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
