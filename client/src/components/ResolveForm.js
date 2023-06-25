import React from "react";
import { useRef } from "react";
import { useObservationsContext } from "../hooks/useObservationsContext";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ResolveForm({ setShowResolve, index }) {
  const { observations, dispatch } = useObservationsContext();
  console.log("index: ", index);

  let obs = {};

  obs = observations[index];

  console.log(obs);

  const formActionTakenRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredActionTaken = formActionTakenRef.current.value;
    const status = "CLOSED";

    const observation = observations[index];

    console.log("submit handler: ", observation);
    const observationData = {
      actionTaken: enteredActionTaken,
      dateclosed: Date.now(),
      status: status,
    };

    try {
      const response = await axios.patch(
        `/api/sos/close/${observation._id}`,
        observationData
      );

      dispatch({
        type: "CLOSE_OBSERVATION",
        payload: (observations[index] = response.data),
      });

      setShowResolve(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Container>
        <Card>
          <Card.Header className="bg-primary text-center text-white">
            <h4>Close Out Observation</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <Form.Label>Observation: {obs.description} </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formActionTaken">
                    <Form.Label>Action Taken *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Action taken to close-out this observation"
                      ref={formActionTakenRef}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-3 d-grid">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
