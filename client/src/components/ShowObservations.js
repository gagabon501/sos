import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useObservationsContext } from "../hooks/useObservationsContext";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import ObservationCard from "./ObservationCard";

export default function ShowObservations() {
  const { observations, dispatch } = useObservationsContext();

  // const [observations, setObservations] = useState([]); //now replaced with 'context' which manages this state globally -- 03-Sept-22

  // const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchObservations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/sos/allobservations");
        console.log(response.data);

        // setObservations(response.data);
        dispatch({ type: "SET_OBSERVATIONS", payload: response.data }); //now using 'dispatch' for global state management -- 03-Sept-22
      } catch (err) {
        console.log(err);
        // setError(err.response.data.msg);
      }
      setIsLoading(false);
    };

    fetchObservations();
  }, [dispatch]);

  return (
    <div>
      <Container fluid className="mt-3">
        <Link to="/">
          <img
            src="SeeSayDo-landscape.png"
            alt="SeeSayDo logo"
            style={{ width: "195px", height: "70px" }}
          ></img>
        </Link>

        <Card>
          <Card.Header className="text-center bg-success text-white">
            <h5>List of Observations</h5>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <Row lg={6}>
                {observations && (
                  <ObservationCard observations={observations} />
                )}
              </Row>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
