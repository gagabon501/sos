import { React } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function ShowObservations() {
  return (
    <Container>
      <Alert className="text-center mt-5" variant="danger">
        Oooops..Sorry..Page under construction
      </Alert>
      <img style={{ width: "100%" }} src="UnderConstruction.jpg" />
      <Link to="/">
        <Button variant="primary" style={{ marginTop: "10px" }}>
          Home
        </Button>
      </Link>
    </Container>
  );
}
