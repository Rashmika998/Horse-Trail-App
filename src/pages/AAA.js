import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { db } from "../utils/firestore";
import {Alert} from "react-bootstrap";

function AAA() {
  const [userType, setUserType] = useState();
  const [error, setError] = useState("");
  const { currentUser} = useAuth();

  useEffect(()=>{
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUserType(doc.data().type);
      })
      .catch(() => {
        setError("Error fetching the user type");
      });
  },[userType])

  
  return (
    <div className="container"
    style={{ paddingTop: "100px", paddingBottom: "100px" }}>
    {error && <Alert variant="danger">{error}</Alert>}
      <p>{userType}</p>
    </div>
  );
}

export default AAA;
