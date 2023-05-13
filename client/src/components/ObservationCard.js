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
import { faEdit, faEraser } from "@fortawesome/free-solid-svg-icons";

export default function ObservationCard({ observations }) {
  const { dispatch } = useObservationsContext();

  const [obsid, setObsId] = useState("");
  const [img, setImg] = useState();
  const [show, setShow] = useState(false);
  const [obstitle, setObsTitle] = useState("");
  const [delshow, setDelShow] = useState(false);
  const [undercons, setUndercons] = useState(false);

  const handleClose = () => setShow(false);
  const handleDelClose = () => setDelShow(false);
  const handleEditClose = () => setUndercons(false);

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
  const handleClickEdit = (obs_id) => {
    console.log("Clicked Edit button");
    setObsId(obs_id);
    setUndercons(true);
  };
  const handleClickDelete = (obs_id) => {
    setDelShow(true);
    setObsId(obs_id);
  };

  return (
    <>
      {observations.map((obs) => (
        <Col lg={true} key={obs._id}>
          <Card style={{ width: "100%" }} className="mt-3" key={obs._id}>
            <Card.Img
              style={{ width: "100%", height: "14rem", cursor: "pointer" }}
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
              {obs.observationType}
            </Card.Header>
            <Card.Body className="text-center">
              <p>{moment(obs.createdAt).format("DD-MMM-YYYY")}</p>
              <p>{obs.location}</p>
              <p>{obs.description}</p>
            </Card.Body>
            <Card.Footer className="fs-5">
              <Button
                className="me-2 text-center"
                variant="outline-primary"
                onClick={() => handleClickEdit(obs._id)}
              >
                Edit {""}
                <FontAwesomeIcon icon={faEdit} />
              </Button>

              <Button
                className="ml-3"
                variant="outline-danger"
                onClick={() => handleClickDelete(obs._id)}
              >
                Del <FontAwesomeIcon icon={faEraser} />
              </Button>
            </Card.Footer>
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

      <Container>
        <Modal
          show={undercons}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              Component under construction
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </Container>
    </>
  );
}