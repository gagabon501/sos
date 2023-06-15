import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import Message from "./Message";
import Progress from "./Progress";

//needs to edit, just copied from login page
export default function RegisterForm() {
  const formEmailRef = useRef();
  const formPasswordRef = useRef();
  const formRePasswordRef = useRef();
  const formLastnameRef = useRef();
  const formFirstnameRef = useRef();
  const formCompanyRef = useRef();
  const formPositionRef = useRef();

  const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [filepreview, setFilePreview] = useState("");
  // const [isResolved, setIsResolved] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [password, setPassword] = useState("");

  const handleFocus = async (e) => {
    // console.log(e.target.value);
    setFocused(true);
    setErrorMessage("Invalid email");
    try {
      const response = await axios.get("/api/sos/user/" + e.target.value);
      // console.log(response.data.duplicate);

      if (response.data.duplicate) {
        e.target.setCustomValidity("Invalid field."); //forcefully set the :invalid pseudo CSS
        setFocused(true);
        setErrorMessage("Email already registered!");
      } else {
        e.target.setCustomValidity(""); //restores :valid pseudo CSS
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkPassword = (e) => {
    console.log("e.target.value:", e.target.value);
    console.log("password: ", password.val);
    if (password.val != e.target.value) {
      e.target.setCustomValidity("Invalid field."); //forcefully set the :invalid pseudo CSS
      setFocused(true);
      setPasswordMessage("Passwords don't match!");
    } else {
      e.target.setCustomValidity(""); //restores :valid pseudo CSS
      setFocused(false);
      // setPasswordMessage("");
      console.log("password match");
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);

    setFilePreview(URL.createObjectURL(e.target.files[0]));

    // Image preview
    const reader = new FileReader();
    reader.onload = function (e) {
      reader.readAsDataURL(e.target.files[0]);

      return true;
    };
  };

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = formEmailRef.current.value;
    const enteredPassword = formPasswordRef.current.value;
    // const enteredRePassword = formRePasswordRef.current.value;
    const enteredLastname = formLastnameRef.current.value;
    const enteredFirstname = formFirstnameRef.current.value;
    const enteredCompany = formCompanyRef.current.value;
    const enteredPosition = formPositionRef.current.value;

    //Create Formdata - did this due to the addition of file in the submission of data
    const formData = new FormData();
    formData.append("email", enteredEmail);
    formData.append("password", enteredPassword);
    formData.append("lastname", enteredLastname);
    formData.append("firstname", enteredFirstname);
    formData.append("company", enteredCompany);
    formData.append("position", enteredPosition);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/sos/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 10000);
      const { fileName, filePath } = response.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
      // window.location.replace("/");
      navigate("/", { replace: true });
      // history.push("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  }

  return (
    <div>
      <Container>
        <Nav.Item>
          <Nav.Link href="/">
            <div className="logo-registration">
              <img src="../SOS_Logo1.png" alt="Upper right logo" />
            </div>
          </Nav.Link>
        </Nav.Item>

        <div className="h1-login">
          <h1>(SOS)</h1>
          <h1>Safety Observation System</h1>
        </div>

        <Card>
          <Card.Header className="bg-primary text-center text-white">
            <h3>User Registration</h3>
          </Card.Header>
          <Card.Body>
            {message ? <Message msg={message} /> : null}
            <Form onSubmit={submitHandler}>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      ref={formEmailRef}
                      required
                      onBlur={handleFocus}
                      focused={focused.toString()}
                    />
                    <span className="spanerror">{errorMessage}</span>
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={formPasswordRef}
                      required
                      onChange={(e) => setPassword({ val: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formRePassword">
                    <Form.Label>Re-type Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-type password"
                      ref={formRePasswordRef}
                      pattern={password.val}
                      onBlur={checkPassword}
                      focused={focused.toString()}
                      required
                    />
                    <span className="spanerror">{passwordMessage}</span>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formFirstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="firstname"
                      ref={formFirstnameRef}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formLastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="lastname"
                      ref={formLastnameRef}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formCompany">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="company"
                      ref={formCompanyRef}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="position"
                      ref={formPositionRef}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Photo</Form.Label>

                    <Form.Control type="file" onChange={onChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  {uploadedFile ? (
                    <div className="mt-4">
                      <img
                        src={filepreview}
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "50%",
                          width: "200px",
                          height: "200px",
                        }}
                        alt="preview"
                      />
                    </div>
                  ) : null}
                </Col>
              </Row>

              <Progress percentage={uploadPercentage} />
              {error}
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
