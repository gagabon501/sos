import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

function NavBar() {
  const sosuser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="dark"
          variant="dark"
          expand={expand}
          className="mb-2"
        >
          <Navbar.Brand href="/">
            <div style={{ marginLeft: "10px" }}>
              <img src="/SOS_Logo1.png" width="50" height="50" alt="SOS Logo" />
            </div>
          </Navbar.Brand>
          <div className="text-white m-2"> Safety Observation System (SOS)</div>

          {sosuser && (
            <div className="ms-auto" style={{ marginRight: "10px" }}>
              <img
                style={{ borderRadius: "50px" }}
                src={`/api/sos/image/${sosuser.attachment}`}
                width="50"
                height="50"
                alt="User Profile Pix"
              />
            </div>
          )}
          <div className="vr text-white m-2" />
          {sosuser && <div className="text-white m-2">{sosuser.firstname}</div>}

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Profile Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#update_profile">Update Profile</Nav.Link>
                <Nav.Link href="#change_password">Change Password</Nav.Link>
                <Link to="/logout">Logout</Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
