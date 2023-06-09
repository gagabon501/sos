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

export default function LoginForm() {
  const formEmailRef = useRef();
  const formPasswordRef = useRef();

  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = formEmailRef.current.value;
    const enteredPassword = formPasswordRef.current.value;

    //Create Formdata - did this due to the addition of file in the submission of data
    // const formData = new FormData();
    // formData.append("email", enteredEmail);
    // formData.append("password", enteredPassword);

    try {
      // console.log("Entered email and password", enteredEmail, enteredPassword);
      const response = await axios.post("/api/sos/login", {
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(response.data);
      setUser(response.data);
      if (response.data.auth) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setMsg("Login successfull!");
        navigate("/dashboard", { replace: true });
        // console.log(user);
      } else {
        localStorage.setItem("auth", "false");
        localStorage.setItem("user", null);
        setMsg("Login unsuccessful!");
        navigate("/login", { replace: true });
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
        <Col className="text-white sign-in-box-left">
          <div style={{ margin: "10px" }}>
            <img src="../SOS_Logo1.png" alt="Upper right logo" align="left" />
          </div>

          <div style={{ marginTop: "16px" }}>
            <h2>Hey There!</h2>
          </div>
          <div className="mt-5">
            <h6>Welcome Back</h6>
          </div>
          <div>
            <h6>You are just one step away to your feed</h6>
          </div>
          <div className="mt-5">No account yet?</div>
          <div>
            <Nav.Item
              className="mt-2"
              style={{
                backgroundColor: "#928df2",
                padding: "8px",
                borderRadius: "15px",
              }}
            >
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </div>
        </Col>
        <Col className="text-black sign-in-box-right ">
          <h2>SIGN-IN</h2>

          {user && user.auth ? (
            <div className="text-black">{msg}</div>
          ) : (
            <div className="text-danger">{msg}</div>
          )}
          <Form onSubmit={submitHandler}>
            <Row className="mt-3">
              <Col lg={true}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    ref={formEmailRef}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={true}>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={formPasswordRef}
                    required
                  />
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
                    Sign-in
                  </Button>
                </div>

                <Stack direction="horizontal">
                  <Nav.Link href="/forgot" style={{ margin: "auto" }}>
                    Forgot Password?
                  </Nav.Link>
                </Stack>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
