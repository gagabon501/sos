import React from "react";
import { useState, useEffect } from "react";

import { useObservationsContext } from "../hooks/useObservationsContext";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";

import ObservationCard from "./ObservationCard";
import SideMenu from "./SideMenu";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function ShowObservations() {
  const { observations, dispatch } = useObservationsContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchObservations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/sos/allobservations");
        // console.log("Client side: ", response.data);

        dispatch({ type: "SET_OBSERVATIONS", payload: response.data }); //now using 'dispatch' for global state management -- 03-Sept-22
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchObservations();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Container fluid>
        <Row>
          <Col lg={2}>
            <SideMenu />
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Container>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
