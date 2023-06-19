import React, { useState } from "react";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Footer from "./Footer";

import Button from "react-bootstrap/Button";
import UserProfile from "./UserProfile";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

export default function ShowUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const usersList = [
    {
      id: "1",
      firstname: "May",
      lastname: "Scheme",
      company: "Leighs Construction",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "2",
      firstname: "John",
      lastname: "Doe",
      company: "Fullers Construction",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "3",
      firstname: "Matt",
      lastname: "Smith",
      company: "William Corporation",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "4",
      firstname: "May",
      lastname: "Scheme",
      company: "Leighs Construction",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "5",
      firstname: "John",
      lastname: "Doe",
      company: "Fullers Construction",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "6",
      firstname: "Matt",
      lastname: "Smith",
      company: "William Corporation",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "7",
      firstname: "May",
      lastname: "Scheme",
      company: "Leighs Construction",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "8",
      firstname: "John",
      lastname: "Doe",
      company: "Fullers Construction",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "9",
      firstname: "Matt",
      lastname: "Smith",
      company: "William Corporation",
      imgsrc: "SOS_Logo.png",
    },
    {
      id: "10",
      firstname: "Matthew",
      lastname: "Smithsonina",
      company: "William Corporation",
      imgsrc: "SOS_Logo.png",
    },
  ];

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
