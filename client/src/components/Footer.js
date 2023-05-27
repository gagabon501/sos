import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer>
        <Container
          fluid
          style={{
            backgroundColor: "#1A413A",
            padding: "5px",
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            color: "white",
            textAlign: "center",
          }}
        >
          <Row>
            <Col>
              <Nav.Item fill={true}>
                <Nav.Link href="#">Terms of Use</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item fill={true}>
                <Nav.Link href="#">Help Center</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item fill={true}>
                <Nav.Link href="#">About</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item fill={true}>
                <Nav.Link href="#">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ marginRight: "10px" }}
                  />
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ marginRight: "10px" }}
                  />
                  <FontAwesomeIcon icon={faGithub} />
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
