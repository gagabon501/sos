import React from "react";
import { useRef, useState } from "react";
import { useObservationsContext } from "../hooks/useObservationsContext";
import { Link, useNavigate, useHistory } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Message from "./Message";
import Progress from "./Progress";

export default function ObservationForm() {
  const { dispatch } = useObservationsContext();

  const formObservationTypeRef = useRef();
  const formCompanyWorkForRef = useRef();
  const formLocationRef = useRef();
  const formInvolvedCompanyRef = useRef();
  const formDescriptionRef = useRef();
  const formConsequenceRef = useRef();
  const formActionTakenRef = useRef();
  const formFurtherActionsRef = useRef();
  const formReportedToRef = useRef();
  const formYourNameRef = useRef();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [filepreview, setFilePreview] = useState("");
  const [isResolved, setIsResolved] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const obsType = [
    "OBS001-Unsafe Conditions",
    "OBS002-Unsafe Behaviour",
    "OBS003-Environmental Hazard",
    "OBS004-Safe Conditions",
    "OBS005-Safe Behaviour",
    "OBS006-Environmental Opportunity",
    "OBS007-Opportunity for Improvement",
  ].map((obs, i) => {
    return (
      <option key={i} value={obs}>
        {obs.substring(7, obs.length)}
      </option>
    );
  });

  const obsUnsafeConditions = [
    "CAT001 - Poor housekeeping",
    "CAT002 - Slip, trips, and falls",
  ];

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
  const onCheck = (e) => {
    setIsResolved(e.target.value);
  };

  const navigate = useNavigate();
  // const history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredType = formObservationTypeRef.current.value;
    const enteredCompanyWorkFor = formCompanyWorkForRef.current.value;
    const enteredformLocation = formLocationRef.current.value;
    const enteredInvolvedCompany = formInvolvedCompanyRef.current.value;
    const enteredDescription = formDescriptionRef.current.value;
    const enteredConsequence = formConsequenceRef.current.value;
    const enteredActionTaken = formActionTakenRef.current.value;
    const enteredFurtherActions = formFurtherActionsRef.current.value;
    const enteredisResolved = isResolved; //used state variable here due to difficulty in getting the correct value when use 'ref'
    const enteredReportedTo = formReportedToRef.current.value;
    const enteredYourName = formYourNameRef.current.value;

    //Create Formdata - did this due to the addition of file in the submission of data
    const formData = new FormData();
    formData.append("observationType", enteredType);
    formData.append("companyWorkFor", enteredCompanyWorkFor);
    formData.append("location", enteredformLocation);
    formData.append("involvedCompany", enteredInvolvedCompany);
    formData.append("description", enteredDescription);
    formData.append("consequence", enteredConsequence);
    formData.append("actionTaken", enteredActionTaken);
    formData.append("furtherActions", enteredFurtherActions);
    formData.append("isResolved", enteredisResolved);
    formData.append("reportedTo", enteredReportedTo);
    formData.append("yourName", enteredYourName);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/sos/", formData, {
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

      // dispatch({ type: "CREATE_OBSERVATION", payload: response.data });

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
      // window.location.replace("/");
      navigate("/", { replace: true });
      // history.push("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  return (
    <div>
      <Container fluid>
        <Card>
          <Card.Header className="bg-primary text-center text-white">
            <h3>Record HSE Observation</h3>
          </Card.Header>
          <Card.Body>
            {message ? <Message msg={message} /> : null}
            <Form onSubmit={submitHandler}>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formObservationType">
                    <Form.Label>Observation Type *</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      ref={formObservationTypeRef}
                    >
                      <option>Choose...</option>
                      {obsType}
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Choose the most applicable type
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formCompanyWorkFor">
                    <Form.Label>Who do you work for? *</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      ref={formCompanyWorkForRef}
                    >
                      <option>Choose...</option>
                      <option value="COM001-McConnell Dowell/BE/Alliance/JV">
                        McConnell Dowell/BE/Alliance/JV
                      </option>
                      <option value="COM002-Client">Client</option>
                      <option value="COM003-Subcontractor/Labour Hire">
                        Subcontractor/Labour Hire
                      </option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Choose the most applicable type
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location of observation"
                      ref={formLocationRef}
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formInvolvedCompany">
                    <Form.Label>Company Involved *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name of company"
                      ref={formInvolvedCompanyRef}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description *</Form.Label>
                <Form.Control as="textarea" rows={3} ref={formDescriptionRef} />
              </Form.Group>
              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Photo</Form.Label>
                    {/* <ImagesUpload /> */}
                    <Form.Control type="file" onChange={onChange} />
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
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formConsequence">
                    <Form.Label>Consequences *</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      ref={formConsequenceRef}
                    >
                      <option>Choose...</option>
                      <option value="FIX001-HIGH - Fix immediately">
                        HIGH - Fix immediately
                      </option>
                      <option value="FIX002-MEDIUM - Fix within 24-hours">
                        MEDIUM - Fix within 24-hours
                      </option>
                      <option value="FIX003-LOW - Fix with agreed timeframe">
                        LOW - Fix with agreed timeframe
                      </option>
                      <option value="FIX004-Opportunity for Improvement/Positive Observation">
                        Opportunity for Improvement/Positive Observation
                      </option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Choose the most applicable type
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col lg={true} className="mt-5">
                  <Form.Group className="mb-3" controlId="isResolved">
                    <Form.Label style={{ marginRight: "5px" }}>
                      Is this Observation Resolved? *
                    </Form.Label>
                    <Form.Check
                      inline
                      label="No"
                      name="isResolved"
                      type="radio"
                      id="isNo"
                      value="no"
                      onChange={onCheck}
                    />
                    <Form.Check
                      inline
                      label="Yes"
                      name="isResolved"
                      type="radio"
                      id="isYes"
                      value="yes"
                      onChange={onCheck}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formActionTaken">
                    <Form.Label>Actions Taken *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      ref={formActionTakenRef}
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formFurtherActions">
                    <Form.Label>Further Actions *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      ref={formFurtherActionsRef}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formReportedTo">
                    <Form.Label>Person reported to *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="The person you reported the observation to"
                      ref={formReportedToRef}
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formYourName">
                    <Form.Label>Your name - optional </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name - optional"
                      ref={formYourNameRef}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Progress percentage={uploadPercentage} />
              <div className="mt-3 d-grid">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              <p className="mt-2">
                We are collecting this information to improve our management of
                projects. How do we collect, manage and disclose personal
                information? <a href="#">See our Privacy statement</a>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
