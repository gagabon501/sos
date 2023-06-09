import React from "react";
import { useRef, useState, useEffect } from "react";
import { useObservationsContext } from "../hooks/useObservationsContext";
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

export default function ObservationForm({
  title,
  setShowForm,
  isAdding,
  index,
}) {
  const { observations, dispatch } = useObservationsContext();

  let obs = {};
  if (isAdding) {
    obs = {
      observationType: "",
      observationCategory: "",
      location: "",
      involvedCompany: "",
      description: "",
      reportedTo: "",
      yourName: "",
      attachment: "",
      duedate: Date.now(),
      status: "OPEN",
    };
  } else {
    obs = observations[index];
  }
  console.log(obs);

  const formObservationTypeRef = useRef(obs.observationType);
  const formObsCategoryRef = useRef(obs.observationCategory);
  const formLocationRef = useRef(obs.location);
  const formInvolvedCompanyRef = useRef(obs.involvedCompany);
  const formDescriptionRef = useRef(obs.description);
  const formReportedToRef = useRef(obs.reportedTo);
  const formYourNameRef = useRef(obs.yourName);
  const formDueDateRef = useRef(obs.duedate);

  // const formObservationTypeRef = useRef();
  // const formObsCategoryRef = useRef();
  // const formLocationRef = useRef();
  // const formInvolvedCompanyRef = useRef();
  // const formDescriptionRef = useRef();
  // const formReportedToRef = useRef();
  // const formYourNameRef = useRef();
  // const formDueDateRef = useRef();

  const [error, setError] = useState(null);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [filepreview, setFilePreview] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [obsCategory, setObsCategory] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/sos/allcompanies");
        setCompanies([...response.data]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanies();
  }, []);

  const companyDropDown = companies.map((company, i) => {
    return (
      <option key={i} value={company.contactemail}>
        {company.company}
      </option>
    );
  });

  console.log("Companies: ", companyDropDown);

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

    // console.log("Event: ", e);

    // console.log(observation);

    const enteredType = formObservationTypeRef.current.value;
    const enteredObsCategory = formObsCategoryRef.current.value;
    const enteredformLocation = formLocationRef.current.value;
    const enteredInvolvedCompany = formInvolvedCompanyRef.current.value;
    const enteredDescription = formDescriptionRef.current.value;
    const enteredReportedTo = formReportedToRef.current.value;
    const enteredYourName = formYourNameRef.current.value;
    const enteredDueDate = formDueDateRef.current.value;
    const status = "OPEN";

    if (isAdding) {
      console.log("Adding observation");
      //Create Formdata - did this due to the addition of file in the submission of data
      const formData = new FormData();
      formData.append("observationType", enteredType);
      formData.append("observationCategory", enteredObsCategory);
      formData.append("location", enteredformLocation);
      formData.append("involvedCompany", enteredInvolvedCompany);
      formData.append("description", enteredDescription);
      formData.append("reportedTo", enteredReportedTo);
      formData.append("yourName", enteredYourName);
      formData.append("file", file);
      formData.append("duedate", enteredDueDate);
      formData.append("status", status);

      console.log(formData);
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

        const { fileName, filePath } = response.data;

        // dispatch({ type: "CREATE_OBSERVATION", payload: response.data }); //no need to update this as this is not displayed as a list

        setUploadedFile({ fileName, filePath });

        setMessage("File Uploaded");

        navigate("/", { replace: true });
      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      }
    } else {
      const observation = observations[index];

      const observationData = {
        observationType: formObservationTypeRef.current.value,
        observationCategory: formObsCategoryRef.current.value,
        location: formLocationRef.current.value,
        involvedCompany: formInvolvedCompanyRef.current.value,
        description: formDescriptionRef.current.value,
        reportedTo: formReportedToRef.current.value,
        yourName: formYourNameRef.current.value,
        duedate: enteredDueDate,
      };

      try {
        const response = await axios.patch(
          `/api/sos/${observation._id}`,
          observationData
        );

        const { fileName, filePath } = response.data;
        dispatch({
          type: "UPDATE_OBSERVATION",
          payload: (observations[index] = response.data),
        });

        setUploadedFile({ fileName, filePath });

        setMessage("File Uploaded");
        setShowForm(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      }
    }
  }

  return (
    <div>
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
                  <Form.Group className="mb-3" controlId="formObservationType">
                    <Form.Label>Observation Type *</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      ref={formObservationTypeRef}
                      onChange={onChangeObsType}
                      required
                      disabled={!isAdding}
                      placeholder={obs.observationType}
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
                      disabled={!isAdding}
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
                      placeholder={
                        isAdding ? "Location of observation" : obs.location
                      }
                      ref={formLocationRef}
                      required
                      disabled={!isAdding}
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formInvolvedCompany">
                    <Form.Label>Company Involved *</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      ref={formInvolvedCompanyRef}
                      required
                      disabled={!isAdding}
                    >
                      <option>Choose...</option>
                      {companyDropDown}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Form.Group className="mb-3" controlId="formDueDate">
                    <Form.Label>Due Date *</Form.Label>
                    <Form.Control type="date" ref={formDueDateRef} required />
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
                  placeholder={obs.description}
                  disabled={!isAdding}
                />
              </Form.Group>
              {isAdding && (
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
              )}

              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formReportedTo">
                    <Form.Label>Person reported to *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={
                        isAdding
                          ? "The person you reported the observation to"
                          : obs.reportedTo
                      }
                      ref={formReportedToRef}
                      required
                      disabled={!isAdding}
                    />
                  </Form.Group>
                </Col>
                <Col lg={true}>
                  <Form.Group className="mb-3" controlId="formYourName">
                    <Form.Label>Your name - optional </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={
                        isAdding ? "Your name - optional" : obs.yourName
                      }
                      ref={formYourNameRef}
                      disabled={!isAdding}
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
