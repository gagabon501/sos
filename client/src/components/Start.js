import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./Footer";

function Start() {
  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col lg={2}>
            <SideMenu />
          </Col>
          <Col>
            <Dashboard />
          </Col>
        </Row>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}

export default Start;
