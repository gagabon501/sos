import React from "react";
import { useState, useEffect } from "react";

import { useObservationsContext } from "../hooks/useObservationsContext";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import CompanyCard from "./CompanyCard";
import SideMenu from "./SideMenu";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CompanyForm from "./CompanyForm";

export default function ShowCompanies() {
  const { companies, dispatch } = useObservationsContext();
  const [adding, setAdding] = useState(false);
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setAdding(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/sos/allcompanies");
        console.log("Client side: ", response.data);

        dispatch({ type: "SET_COMPANIES", payload: response.data }); //now using 'dispatch' for global state management
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchCompanies();
  }, [dispatch]);

  const handleClick = (e) => {
    setAdding(true);
  };
  return (
    <div>
      <NavBar />
      <Container fluid>
        <Row>
          <Col lg={2}>
            <SideMenu />
          </Col>
          <Col>
            <div className="ms-auto mb-2" style={{ marginRight: "10px" }}>
              <Button onClick={handleClick}>
                New company <FontAwesomeIcon icon={faCirclePlus} />
              </Button>
            </div>
            {adding && (
              <Modal
                show={adding}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                centered
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="show-grid">
                  <Container fluid>
                    <CompanyForm
                      setAdding={setAdding}
                      compid=""
                      title="Add Company"
                    />
                  </Container>
                </Modal.Body>
              </Modal>
            )}
            <Card>
              <Card.Header className="text-center bg-success text-white">
                <h5>List of Companies</h5>
              </Card.Header>
              <Card.Body>
                {isLoading ? (
                  <div className="loader-container">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <Row lg={6}>
                    {companies && (
                      <CompanyCard
                        companies={companies}
                        setAdding={setAdding}
                      />
                    )}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid></Container>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
