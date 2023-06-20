import React, { useState, useEffect } from "react";

import axios from "axios";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Footer from "./Footer";

import UserProfile from "./UserProfile";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

import { useObservationsContext } from "../hooks/useObservationsContext";

export default function ShowUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const { usersList, dispatch } = useObservationsContext();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/sos/allusers");
        console.log("Client side: ", response.data);

        dispatch({ type: "SET_USERS", payload: response.data }); //now using 'dispatch' for global state management -- 03-Sept-22
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchUsers();
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
                <h5>List of Users</h5>
              </Card.Header>
              <Card.Body>
                {isLoading ? (
                  <div className="loader-container">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <Row lg={6}>
                    {usersList && <UserProfile users={usersList} />}
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
