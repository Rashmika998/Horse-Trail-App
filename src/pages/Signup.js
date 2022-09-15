import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BodyContent } from "../globalStyles";
import "../components/AuthPages/Auth.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const telNoRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  var rePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  /* Allowed phn number formats
  (123) 456-7890. (123)456-7890, 123-456-7890, 1234567890 */

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (!rePhone.test(telNoRef.current.value)) {
      return setError("Invalid phone number");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        fNameRef.current.value,
        lNameRef.current.value,
        telNoRef.current.value
      );
      navigate("/my-profile", { replace: true });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className='hero-container'>
      <br/><br/>
      <Card style={{minWidth: '50vw',}} className='card'>
        <Card.Body>
          <h4 className="text-center">Sign Up</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="fName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={fNameRef} required />
            </Form.Group>
            <Form.Group id="lName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="telNo">
              <Form.Label>Contact No</Form.Label>
              <Form.Control type="text" ref={telNoRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <br />
            <Button disabled={loading} style={{background:'#071c2f'}} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2" style={{color: 'black'}}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
        </Card.Body>
      </Card>
      <br/>
    </div>
  );
}
