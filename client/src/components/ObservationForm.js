import React from "react";
import { useRef, useState } from "react";
// import { useObservationsContext } from "../hooks/useObservationsContext";
import { useNavigate } from "react-router-dom";
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
  // const { dispatch } = useObservationsContext();

  const formObservationTypeRef = useRef();
  const formObsCategoryRef = useRef();
  const formLocationRef = useRef();
  const formInvolvedCompanyRef = useRef();
  const formDescriptionRef = useRef();
  // const formConsequenceRef = useRef();
  // const formActionTakenRef = useRef();
  // const formFurtherActionsRef = useRef();
  const formReportedToRef = useRef();
  const formYourNameRef = useRef();

  const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [filepreview, setFilePreview] = useState("");
  // const [isResolved, setIsResolved] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [obsCategory, setObsCategory] = useState([]);

  const obsType = [
    "OBS001-Unsafe Condition",
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
    "CAT001-General housekeeping",
    "CAT002-Slip, trip and fall hazards",
    "CAT003-Electrical hazards",
    "CAT004-Equipment operation",
    "CAT005-Mobile plant and equipment",
    "CAT006-Fire protection",
    "CAT007-Confined spaces",
    "CAT008-Working at height",
    "CAT009-Lifting",
    "CAT010-Pressurised systems",
  ].map((obs, i) => {
    return (
      <option key={i} value={obs}>
        {obs.substring(7, obs.length)}
      </option>
    );
  });
  const obsUnsafeActs = [
    "CAT021-Non wearing of PPE",
    "CAT022-Working without Permit-to-Work",
    "CAT022-Operating equipment without license",
    "CAT023-Working under suspended load",
    "CAT024-Working without fall protection",
    "CAT025-Smoking/vaping on site",
    "CAT026-Swearing/foul language",
    "CAT027-Bullying/harassment",
  ].map((obs, i) => {
    return (
      <option key={i} value={obs}>
        {obs.substring(7, obs.length)}
      </option>
    );
  });

  const obsEnviroHazard = [
    "CAT031-Extreme noise",
    "CAT032-Unlabeled liquids",
    "CAT033-Flammable substances",
    "CAT034-Harmful gases",
    "CAT035-Radiation",
    "CAT036-Inclement weather",
    "CAT037-Poor ventilation",
    "CAT038-Exposure to asbestos",
    "CAT039-Poor drainage",
    "CAT040-Erosion",
    "CAT041-Poor silt controls",
    "CAT042-Water contamination",
  ].map((obs, i) => {
    return (
      <option key={i} value={obs}>
        {obs.substring(7, obs.length)}
      </option>
    );
  });

  const obsOthers = ["CAT099-N/A"].map((obs, i) => {
    return (
      <option key={i} value={obs}>
        {obs.substring(7, obs.length)}
      </option>
    );
  });

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

  // const onCheck = (e) => {
  //   setIsResolved(e.target.value);
  // };

  const onChangeObsType = (e) => {
    console.log(e.target.value.substr(0, 6));
    switch (e.target.value.substr(0, 6)) {
      case "OBS001":
        setObsCategory(obsUnsafeConditions);
        break;

      case "OBS002":
        setObsCategory(obsUnsafeActs);
        break;
      case "OBS003":
        setObsCategory(obsEnviroHazard);
        break;

      default:
        console.log("Others");
        setObsCategory(obsOthers);
    }
  };

  const navigate = useNavigate();
  // const history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredType = formObservationTypeRef.current.value;
    const enteredObsCategory = formObsCategoryRef.current.value;
    const enteredformLocation = formLocationRef.current.value;
    const enteredInvolvedCompany = formInvolvedCompanyRef.current.value;
    const enteredDescription = formDescriptionRef.current.value;
    // const enteredConsequence = formConsequenceRef.current.value;
    // const enteredActionTaken = formActionTakenRef.current.value;
    // const enteredFurtherActions = formFurtherActionsRef.current.value;
    // const enteredisResolved = isResolved; //used state variable here due to difficulty in getting the correct value when use 'ref'
    const enteredReportedTo = formReportedToRef.current.value;
    const enteredYourName = formYourNameRef.current.value;

    //Create Formdata - did this due to the addition of file in the submission of data
    const formData = new FormData();
    formData.append("observationType", enteredType);
    formData.append("observationCategory", enteredObsCategory);
    formData.append("location", enteredformLocation);
    formData.append("involvedCompany", enteredInvolvedCompany);
    formData.append("description", enteredDescription);
    // formData.append("consequence", enteredConsequence);
    // formData.append("actionTaken", enteredActionTaken);
    // formData.append("furtherActions", enteredFurtherActions);
    // formData.append("isResolved", enteredisResolved);
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
      setError(err.response.data.error);
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
                      onChange={onChangeObsType}
                      required
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
                  <Form.Group className="mb-3" controlId="formObsCategoryRef">
                    <Form.Label>Observation Category *</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      ref={formObsCategoryRef}
                      required
                    >
                      <option>Choose...</option>
                      {obsCategory}
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
                      required
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
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  ref={formDescriptionRef}
                  required
                />
              </Form.Group>
              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Photo</Form.Label>
                    {/* <ImagesUpload /> */}
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

              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formReportedTo">
                    <Form.Label>Person reported to *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="The person you reported the observation to"
                      ref={formReportedToRef}
                      required
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
              {error}
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
