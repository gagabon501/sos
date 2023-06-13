import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./Footer";

import SosChart from "./SosChart";
import UnsafeConditionChart from "./UnsafeConditionChart";
import UnsafeActs from "./UnsafeActs";

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
            <SosChart />
          </Col>
          <Col>
            <UnsafeConditionChart />
          </Col>
          <Col>
            <UnsafeActs />
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
