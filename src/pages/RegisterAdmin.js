import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firestore";
import { Link, useNavigate } from "react-router-dom";
import "../components/AuthPages/Auth.css";

export default function RegisterAdmin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const telNoRef = useRef();
  const passwordConfirmRef = useRef();
  const { signupAdmin, currentUser } = useAuth();
  const [userType, setUserType] = useState();
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState(
    "Account created successfully! Please log in to check"
  );
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  var rePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  /* Allowed phn number formats
  (123) 456-7890. (123)456-7890, 123-456-7890, 1234567890 */

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUserType(doc.data().type);
      })
      .catch(() => {
        setError("Error fetching the user type");
      });
  }, [userType]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value.toString().length < 9) {
      return setError("Password should contain at least 9 characters");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (!rePhone.test(telNoRef.current.value)) {
      return setError("Invalid phone number");
    }
    try {
      setLoading(true);
      await signupAdmin(
        emailRef.current.value,
        passwordRef.current.value,
        fNameRef.current.value,
        lNameRef.current.value,
        telNoRef.current.value
      );
      navigate(`/login/${statusMsg}`);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const AdminCard = () => {
    return (
      <Card.Body>
        <h4 className="text-center">Sign Up</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="fName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" ref={fNameRef} required />
          </Form.Group>
          <br />
          <Form.Group id="lName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" ref={lNameRef} required />
          </Form.Group>
          <br />
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <br />
          <Form.Group id="telNo">
            <Form.Label>Contact No</Form.Label>
            <Form.Control type="text" ref={telNoRef} required />
          </Form.Group>
          <br />
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
              placeholder="Password should contain at least 9 characters"
            />
          </Form.Group>
          <br />
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              ref={passwordConfirmRef}
              required
              placeholder="Re-enter password"
            />
          </Form.Group>
          <br />
          <Button
            disabled={loading}
            style={{ background: "#071c2f" }}
            className="w-100"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
        <div className="w-100 text-center mt-2" style={{ color: "black" }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </Card.Body>
    );
  };

  const UserCard = () => {
    return (
      <Card.Body>
        <h4 className="text-center">Sign in as admin to register new admins</h4>
      </Card.Body>
    );
  };

  return (
    <div className="hero-container">
      <br />
      <br />
      {error && (
        <Alert
          variant="danger"
          style={{ minWidth: "50vw" }}
          className="text-center"
        >
          {error}
        </Alert>
      )}
      {userType == "admin" ? (
        <Card
          style={{ minWidth: "50vw", overflowY: "auto", height: "70vh" }}
          className="card"
        >
          <AdminCard />
        </Card>
      ) : (
        <Card style={{ minWidth: "50vw" }} className="card">
          <UserCard />
        </Card>
      )}
      <br />
    </div>
  );
}
