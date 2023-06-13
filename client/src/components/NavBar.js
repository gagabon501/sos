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
          <Container fluid>
            <Navbar.Brand href="/">
              <Stack direction="horizontal" gap={3}>
                <img
                  src="/SOS_Logo1.png"
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="SOS Logo"
                />
                <div>Safety Observation System (SOS)</div>
                {sosuser && <div>{sosuser.firstname}</div>}
                {/* {sosuser && (
                  <img
                    src={`/api/sos/image/${sosuser.attachment}`}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="User Profile Pix"
                  />
                )} */}
              </Stack>
            </Navbar.Brand>
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
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
