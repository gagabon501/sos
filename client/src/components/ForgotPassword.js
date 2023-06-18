import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

import Card from "react-bootstrap/Card";

export default function ForgotPassword() {
  const formEmailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    console.log(e);

    const enteredEmail = formEmailRef.current.value;
    console.log(enteredEmail);

    try {
      const response = await axios.post("/api/sos/forgot", {
        email: enteredEmail,
      });
      console.log(response.data);
      navigate("/login", { replace: true });
      // window.location.replace("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={4} className="m-auto mt-5">
          <div className="h1-login">
            {errorMessage && (
              <div className="ms-auto text-danger">{errorMessage}</div>
            )}
          </div>
          <Card>
            <Card.Header className="bg-primary text-center text-white">
              <h3>Forgot Password</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Row className="mt-3">
                  <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="email"
                        placeholder="email address"
                        ref={formEmailRef}
                        required
                      />
                      <span className="spanerror">{errorMessage}</span>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-grid">
                      <Button
                        style={{
                          padding: "8px",
                          borderRadius: "15px",
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
