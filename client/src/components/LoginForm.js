import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";

export default function LoginForm() {
  return (
    <div>
      <Container fluid>
        <div className="h1-login">
          <h1>Safety Observation System</h1>
          <h1>(SOS)</h1>
        </div>

        <div className="logo-signIn">
          <img src="../SOS_Logo.png" alt="Logo on the side"/>
        </div>

        <div className="login-field">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="email" placeholder="Username" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="Rem-text" controlId="formHorizontalCheck">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check label="Remember me" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="sign-btn" >
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="forg-password-text">
              <Col sm={{ span: 10, offset: 2 }}>
                <p>Forgot Password?</p>
              </Col>
            </Form.Group>

            <div className="reg-text">
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <p>Register</p>
                </Col>
              </Form.Group>
            </div>
    
          </Form>
        </div>
      
    </Container>
    </div>
  );
}