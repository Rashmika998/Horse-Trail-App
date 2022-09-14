import React from 'react'
import { BodyContent } from "../globalStyles";
import { Row, Col,Container} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Add() {
  return (
    <BodyContent>
    <Container style={{maxWidth: '50vw', minHeight: '50vh',  justifyContent: "center", display: "flex", alignItems: "center"}}>
    <Row>
        <Col style={{minWidth: '25vw', textAlign: "center"}}><Link to="/add-trail">Trail</Link></Col>
        <Col style={{minWidth: '25vw', textAlign: "center"}}><Link to="/add-camp">Camp</Link></Col>
    </Row>
    </Container>
    </BodyContent>
  )
}
