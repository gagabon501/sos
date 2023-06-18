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
import NavBar from "./NavBar";

import Message from "./Message";
import Progress from "./Progress";

export default function UpdateProfile() {
  const user = JSON.parse(localStorage.getItem("user")); //get user info from localStorage

  const formLastnameRef = useRef(user.lastname);
  const formFirstnameRef = useRef(user.firstname);
  const formCompanyRef = useRef(user.company);
  const formPositionRef = useRef(user.position);

  const [error, setError] = useState(null);
  const [file, setFile] = useState("");
  const [filepreview, setFilePreview] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);

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

    const enteredLastname = formLastnameRef.current.value;
    const enteredFirstname = formFirstnameRef.current.value;
    const enteredCompany = formCompanyRef.current.value;
    const enteredPosition = formPositionRef.current.value;

    //Create Formdata - did this due to the addition of file in the submission of data
    const formData = new FormData();

    formData.append("lastname", enteredLastname);
    formData.append("firstname", enteredFirstname);
    formData.append("company", enteredCompany);
    formData.append("position", enteredPosition);
    formData.append("file", file);

    // localStorage.setItem("user", JSON.stringify(response.data));

    try {
      const response = await axios.post(
        "/api/sos/user/" + user.email,
        formData,
        {
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
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      const { fileName, filePath } = response.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
      navigate("/dashboard ", { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  }

  return (
    <div>
      <Container fluid>
        <NavBar />
        <Row>
          <Col sm={8} className="m-auto mt-5">
            <Card>
              <Card.Header className="bg-primary text-center text-white">
                <h3>Update User Profile</h3>
              </Card.Header>
              <Card.Body>
                {message ? <Message msg={message} /> : null}
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col lg={true}>
                      <Form.Group className="mb-3" controlId="formFirstname">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={user.firstname}
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
                          placeholder={user.lastname}
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
                          placeholder={user.company}
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
                          placeholder={user.position}
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

                        <Form.Control
                          type="file"
                          onChange={onChange}
                          required
                        />
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}
