import React from "react";
import { useState } from "react";
import { useObservationsContext } from "../hooks/useObservationsContext";

import axios from "axios";
import moment from "moment";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEdit,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import ObservationForm from "./ObservationForm";
import ResolveForm from "./ResolveForm";

export default function ObservationCard({ observations }) {
  const { dispatch } = useObservationsContext();

  const [obsid, setObsId] = useState("");
  const [img, setImg] = useState();
  const [show, setShow] = useState(false);
  const [obstitle, setObsTitle] = useState("");
  const [delshow, setDelShow] = useState(false);

  const [index, setIndex] = useState(null);
  const [showform, setShowForm] = useState(false);
  const [showresolve, setShowResolve] = useState(false);

  const handleClose = () => setShow(false);
  const handleDelClose = () => setDelShow(false);
  const handleEditClose = () => setShowForm(false);
  const handleResolveClose = () => setShowResolve(false);

  const handleDelConfirm = async () => {
    console.log("Clicked Confirm Delete button");
    try {
      const response = await axios.delete(`/api/sos/${obsid}`);
      dispatch({ type: "DELETE_OBSERVATION", payload: response.data });
      console.log(response);
    } catch (err) {
      console.log(err);
      // setError(err.response.data.msg);
    }
    handleDelClose();
  };

  const handleClick = (imgsrc, title) => {
    setImg(imgsrc);
    setShow(true);
    setObsTitle(title);
  };
  const handleClickEdit = (obs_id, idx) => {
    console.log("Clicked Edit button");
    setObsId(obs_id);
    setIndex(idx);
    setShowForm(true);
  };
  const handleClickDelete = (obs_id) => {
    setDelShow(true);
    setObsId(obs_id);
  };
  const handleClickResolve = (obs_id, idx) => {
    console.log("Click resolve. ID is: ", obs_id);
    setShowResolve(true);
    setObsId(obs_id);
    setIndex(idx);
  };

  return (
    <>
      {observations.map((obs, idx) => (
        <Col lg={true} key={obs._id}>
          <Card style={{ width: "100%" }} className="mt-3" key={obs._id}>
            <Card.Img
              style={{ width: "100%", height: "8rem", cursor: "pointer" }}
              variant="top"
              src={`/api/sos/image/${obs.attachment}`}
              onClick={() =>
                handleClick(
                  `/api/sos/image/${obs.attachment}`,
                  `${obs.description}`
                )
              }
            />

            <Card.Header className="text-center bg-success text-white">
              <div>{obs.observationType.substring(7, 30)}</div>
              <div>{obs.observationCategory.substring(7, 30)}</div>
            </Card.Header>
            <Card.Body className="text-center">
              <div>{moment(obs.createdAt).format("DD-MMM-YYYY@HH:MM")}</div>
              <div>{obs.location}</div>
              <div>
                {obs.description.length > 26
                  ? obs.description.substr(0, 24) + "..."
                  : obs.description}
              </div>
              <div style={{ color: obs.isResolved ? "green" : "red" }}>
                {obs.isResolved
                  ? `Date closed: ${moment(obs.dateclosed).format(
                      "DD-MMM-YYYY"
                    )}`
                  : `Due date: ${moment(obs.duedate).format("DD-MMM-YYYY")}`}
              </div>
              <div>Status: {obs.status}</div>
            </Card.Body>
            {!obs.isResolved && (
              <Card.Footer className="fs-5">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleClickEdit(obs._id, idx)}
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    marginRight: "5px",
                  }}
                />

                <FontAwesomeIcon
                  icon={faEraser}
                  onClick={() => handleClickDelete(obs._id)}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    marginRight: "5px",
                  }}
                />

                <FontAwesomeIcon
                  icon={faCircleCheck}
                  onClick={() => handleClickResolve(obs._id, idx)}
                  style={{ cursor: "pointer", color: "green" }}
                />
              </Card.Footer>
            )}
          </Card>
        </Col>
      ))}

      <Container>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>{obstitle}</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Img src={img} />
            </Card>
          </Modal.Body>
        </Modal>
      </Container>

      <Container>
        <Modal
          show={delshow}
          onHide={handleDelClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this observation?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDelClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleDelConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Container fluid>
        <Modal
          show={showform}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header closeButton />
          <ObservationForm
            title="Edit Observation"
            setShowForm={setShowForm}
            isAdding={false}
            index={index}
          />
        </Modal>
      </Container>

      <Container fluid>
        <Modal
          show={showresolve}
          onHide={handleResolveClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton />

          <ResolveForm setShowResolve={setShowResolve} index={index} />
        </Modal>
      </Container>
    </>
  );
}
