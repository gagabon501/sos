import React from "react";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";

//needs to edit, just copied from login page
export default function RegisterForm() {
  return (
    <div>
     <Container fluid>


        <div className="logo-registration">
          <img src="../SOS_Logo1.png" alt="Upper right logo"/>
        </div>

        <div className="h1-login">
          <h1>(SOS)</h1>
          <h1>Safety Observation System</h1>
        </div>

        <div className="reg-field">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2} className="label-text">
                firstname
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="firstname" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2} className="label-text">
                Lastname
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="lastname" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2} className="label-text">
                Company
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Company" />
              </Col>
            </Form.Group>

            
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2} className="label-text">
                Positions
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Position" />
              </Col>
            </Form.Group>

            
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2} className="label-text">
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="email" placeholder="Username" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={2} className="label-text">
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={2} className="label-text">
                Re-enter password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={2} className="label-text">
                Upload Photo
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" placeholder="file" />
              </Col>
            </Form.Group>

            <div className="sign-btn" >
              <Form.Group as={Row} >
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Submit</Button>
                </Col>
              </Form.Group>
            </div>

            <div className="img-preview">
              <img src="../Profile_Image.png" alt="Logo on the side"/>
            </div>
          
          </Form>
        </div>

      </Container>
    </div>
  );
}
