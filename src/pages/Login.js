import React, { useRef, useState, useEffect} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { BodyContent } from "../globalStyles";
import "../components/AuthPages/Auth.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { statusMsg } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/my-profile", { replace: true });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  useEffect(()=>{
    if (currentUser) {
      logout();
    }
  },[])

  return (
    <div className='hero-container'>
      <Card style={{minWidth: '50vw',}} className='card'>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {statusMsg && <Alert variant="success">{statusMsg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br/>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br />
            <Button disabled={loading} style={{background:'#071c2f'}} className="w-100" type="submit">
              Sign In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color: '#fff'}}>
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
}


{/* <BodyContent>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br />
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </BodyContent> */}