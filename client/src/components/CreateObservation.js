import ObservationForm from "./ObservationForm";
import SideMenu from "./SideMenu";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function CreateObservation() {
  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col lg={2}>
            <SideMenu />
          </Col>
          <Col>
            {/* <ObservationForm /> */}
            <ObservationForm
              title="Add Observation"
              setShowForm={null}
              isAdding={true}
              index={null}
            />
          </Col>
        </Row>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}

export default CreateObservation;
