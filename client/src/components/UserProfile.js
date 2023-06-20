import React, { useState } from "react";
import axios from "axios";
import { useObservationsContext } from "../hooks/useObservationsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEraser } from "@fortawesome/free-solid-svg-icons";

import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const UserProfile = ({ users }) => {
  const { dispatch } = useObservationsContext();
  const [profile, setProfile] = useState(false);

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
      const response = await axios.delete(`/api/sos/user/${obsid}`);
      dispatch({ type: "DELETE_USER", payload: response.data });
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
      {users.map((user) => (
        <div className="userbox" key={user.id}>
          <img
            src={`/api/sos/image/${user.attachment}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
            alt="preview"
            onClick={() =>
              handleClick(
                `/api/sos/image/${user.attachment}`,
                `${user.firstname + " " + user.lastname}`
              )
            }
          />

          <div>{user.firstname + " " + user.lastname}</div>
          <div>{user.company}</div>
          <div>{user.position}</div>

          <FontAwesomeIcon
            icon={faEdit}
            className="text-primary"
            style={{ fontSize: "16px", marginRight: "5px" }}
            onClick={() => handleClickEdit(user._id)}
          />
          <FontAwesomeIcon
            icon={faEraser}
            className="text-danger"
            style={{ fontSize: "16px" }}
            onClick={() => handleClickDelete(user._id)}
          />
        </div>
      ))}

      <Container>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="l"
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
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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
};

export default UserProfile;
