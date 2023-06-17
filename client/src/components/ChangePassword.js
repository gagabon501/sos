import React from "react";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";

import Nav from "react-bootstrap/Nav";

export default function ChangePassword() {
  const formOldPasswordRef = useRef();
  const formPasswordRef = useRef();
  const formRePasswordRef = useRef();

  const [focused, setFocused] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();

  function onChange(e) {
    setPassword(e.target.value);
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
  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = JSON.parse(localStorage.getItem("user")).email;
    const enteredPassword = formPasswordRef.current.value;
    const enteredOldPassword = formOldPasswordRef.current.value;

    try {
      console.log("Entered email and password", enteredEmail, enteredPassword);
      const response = await axios.post("/api/sos/passwd", {
        email: enteredEmail,
        password: enteredPassword,
        oldpassword: enteredOldPassword,
      });
      console.log(response.data);

      if (!response.data.valid) {
        // e.target.setCustomValidity("Invalid field."); //forcefully set the :invalid pseudo CSS
        setFocused(true);
        // setPasswordMessage("Wrong old password!");
        setErrorMessage("Wrong old password!");
      } else {
        // e.target.setCustomValidity(""); //restores :valid pseudo CSS
        setFocused(false);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);
      // setError(err.response.data.error);
    }
  }

  return (
    <Container>
      <div className="h1-login">
        <h1>(SOS)</h1>
        <h1>Safety Observation System</h1>
      </div>
      <Row style={{ marginTop: "10%" }}>
        <Col className="text-black sign-in-box-right ">
          <Stack direction="horizontal">
            <h2>Change Password</h2>
            {errorMessage && (
              <div className="ms-auto text-danger">{errorMessage}</div>
            )}
          </Stack>
          <Form onSubmit={submitHandler}>
            <Row className="mt-3">
              <Col lg={true}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Old password"
                    ref={formOldPasswordRef}
                    required
                  />
                  <span className="spanerror">{errorMessage}</span>
                </Form.Group>
              </Col>
            </Row>
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
            </Row>
            <Col lg={true}>
              <Form.Group className="mb-3" controlId="formPassword">
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
                    Sign-in
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
