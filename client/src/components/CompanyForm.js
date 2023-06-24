import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useObservationsContext } from "../hooks/useObservationsContext";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Message from "./Message";

export default function CompanyForm({ setAdding, compid, title, index }) {
  //define the variables for the form entries
  const formCompanyRef = useRef();
  const formAddressRef = useRef();
  const formContactNameRef = useRef();
  const formContactPositionRef = useRef();
  const formContactMobileRef = useRef();
  const formContactEmailRef = useRef();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { companies, dispatch } = useObservationsContext(); //using global state management via context

  async function submitHandler(e) {
    e.preventDefault();

    const e_company = formCompanyRef.current.value;
    const e_address = formAddressRef.current.value;
    const e_contactname = formContactNameRef.current.value;
    const e_contactposition = formContactPositionRef.current.value;
    const e_contactmobile = formContactMobileRef.current.value;
    const e_contactemail = formContactEmailRef.current.value;

    const companydata = {
      company: e_company,
      address: e_address,
      contactname: e_contactname,
      contactposition: e_contactposition,
      contactmobile: e_contactmobile,
      contactemail: e_contactemail,
    };
    if (compid === null || compid === undefined || compid === "") {
      index = null;
      try {
        const response = await axios.post("/api/sos/company", companydata);

        setAdding(false); //this is a passed down set function to set the state variable 'adding' which then causes
        //this form / component to close and go back to the main screen which is the list of companies

        dispatch({ type: "CREATE_COMPANY", payload: response.data }); //now using 'dispatch' for global state management
      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      }
    } else {
      try {
        const response = await axios.patch(
          `/api/sos/company/${compid}`,
          companydata
        );

        console.log("from server: ", response.data);

        setAdding(false); //this is a passed down set function to set the state variable 'adding' which then causes
        //this form / component to close and go back to the main screen which is the list of companies

        dispatch({
          type: "UPDATE_COMPANY",
          payload: (companies[index] = response.data),
        }); //now using 'dispatch' for global state management
      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      }
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Container fluid>
        <Card>
          <Card.Header className="bg-primary text-center text-white">
            <h3>{title}</h3>
          </Card.Header>
          <Card.Body>
            {message ? <Message msg={message} /> : null}
            <Form onSubmit={submitHandler}>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formCompany">
                    <Form.Label>Company *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company"
                      ref={formCompanyRef}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      ref={formAddressRef}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formContactName">
                    <Form.Label>Contact name *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contact name"
                      ref={formContactNameRef}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formContactPosition">
                    <Form.Label>Position *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Position"
                      ref={formContactPositionRef}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formContactMobile">
                    <Form.Label>Mobile phone *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile phone"
                      ref={formContactMobileRef}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formContactEmail">
                    <Form.Label>Contact email *</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Contact email"
                      ref={formContactEmailRef}
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
