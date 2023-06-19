import { React } from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import NavBar from "./NavBar";

export default function UnderConstruction() {
  return (
    <>
      <NavBar />

      <Row>
        <Col lg={6} className="m-auto mt-5">
          <Alert className="text-center mt-5" variant="danger">
            Oooops..Sorry..Page under construction
          </Alert>
          <img
            style={{ width: "100%" }}
            src="UnderConstruction.jpg"
            alt="underconstruction"
          />
        </Col>
      </Row>
    </>
  );
}
