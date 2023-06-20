import React from "react";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/esm/Stack";

export default function ForgotPassword() {
  const formEmailRef = useRef();
  const formPasswordRef = useRef();
  const formRePasswordRef = useRef();
  const formVerifyCodeRef = useRef();

  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [verifycode, setVerifyCode] = useState(false);
  const [isverified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function onChange(e) {
    setPassword(e.target.value);
  }

  function onChangeCode(e) {
    setVerifyCode(e.target.value);
  }

  const checkPassword = (e) => {
    if (password !== e.target.value) {
      e.target.setCustomValidity("Invalid field."); //forcefully set the :invalid pseudo CSS
      setFocused(true);
      setPasswordMessage("Passwords don't match!");
    } else {
      e.target.setCustomValidity(""); //restores :valid pseudo CSS
      setFocused(false);
    }
  };

  async function submitHandlerEmail(e) {
    e.preventDefault();

    const enteredEmail = formEmailRef.current.value;
    setEmail(enteredEmail);
    console.log(enteredEmail);

    try {
      const response = await axios.post("/api/sos/forgot", {
        email: enteredEmail,
      });
      console.log(response.data);
      if (response.data.valid) {
        setVerifyCode(true);
        setErrorMessage("Please check your email. Verification code sent.");
      } else {
        setVerifyCode(false);
        setErrorMessage("User does not exist.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function submitHandlerVerification(e) {
    e.preventDefault();

    const enteredCode = formVerifyCodeRef.current.value;
    console.log(enteredCode);

    try {
      const response = await axios.get("/api/sos/reset/" + enteredCode);
      console.log(response.data);
      if (response.data.token === enteredCode) {
        setIsVerified(true);
        setErrorMessage("Reset password verified. Enter new password.");
      } else {
        setErrorMessage("Token not found.");
        setIsVerified(false);
        setVerifyCode(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    // const enteredEmail = JSON.parse(localStorage.getItem("user")).email;
    const enteredPassword = formPasswordRef.current.value;
    console.log("Hey!", email);

    try {
      const response = await axios.post("/api/sos/resetpwd", {
        email: email,
        password: enteredPassword,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col sm={4} className="m-auto mt-5">
          <div>
            {errorMessage && (
              <div
                className="ms-auto text-bold text-center"
                style={{ color: "red", backgroundColor: "yellow" }}
              >
                {errorMessage}
              </div>
            )}
          </div>
          <Card>
            <Card.Header className="bg-primary text-center text-white">
              <Stack direction="horizontal">
                <NavLink to="/">
                  <img
                    src="../SOS_Logo1.png"
                    alt="Upper right logo"
                    align="left"
                    width={50}
                    height={50}
                  />
                </NavLink>
                <h3 className="m-auto">Forgot Password</h3>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandlerEmail}>
                <Row className="mt-3">
                  <Col>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="email"
                        placeholder="email address"
                        ref={formEmailRef}
                        required
                        disabled={verifycode}
                      />
                      <span className="spanerror">{errorMessage}</span>
                    </Form.Group>
                  </Col>
                  <Col>
                    <div className="d-grid">
                      <Button
                        style={{
                          padding: "8px",
                          borderRadius: "15px",
                        }}
                        variant="primary"
                        type="submit"
                        disabled={verifycode}
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
              {verifycode && (
                <Form onSubmit={submitHandlerVerification}>
                  <Row>
                    <Col lg={true}>
                      <Form.Group className="mb-3" controlId="formVerification">
                        <Form.Control
                          type="text"
                          placeholder="Verification code"
                          ref={formVerifyCodeRef}
                          required
                          onChange={onChangeCode}
                          disabled={isverified}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <div className="d-grid">
                        <Button
                          style={{
                            padding: "8px",
                            borderRadius: "15px",
                          }}
                          variant="primary"
                          type="submit"
                          disabled={isverified}
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
              {isverified && (
                <div>
                  <Form onSubmit={submitHandler}>
                    <Row>
                      <Col lg={true}>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={formPasswordRef}
                            required
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col lg={true}>
                        <Form.Group
                          className="mb-3"
                          controlId="formConfirmPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={formRePasswordRef}
                            pattern={password}
                            onBlur={checkPassword}
                            focused={focused.toString()}
                            required
                          />
                          <span className="spanerror">{passwordMessage}</span>
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
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
