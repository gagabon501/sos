import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

function Start() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#9EC6BF" }}
    >
      <Card style={{ width: "max-content" }}>
        <Card.Body>
          <Nav fill={true}>
            <Stack gap={3}>
              <Nav.Item
                style={{
                  width: "100%",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
                className="bg-warning"
              >
                <Nav.Link className="center-align" href="/observe">
                  <h3>Log Observations</h3>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
                style={{
                  width: "100%",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
                className="bg-info"
              >
                <Nav.Link
                  className="center-align"
                  style={{ color: "white" }}
                  href="/show"
                >
                  <h3 className="text-black">Show Observations</h3>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
                style={{
                  width: "100%",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
                className="bg-primary"
              >
                <Nav.Link
                  className="center-align"
                  style={{ color: "white" }}
                  href="/login"
                >
                  <h3>Login</h3>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
                style={{
                  width: "100%",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
                className="bg-success"
              >
                <Nav.Link
                  className="center-align"
                  href="/register"
                  style={{ color: "white" }}
                >
                  <h3>Register</h3>
                </Nav.Link>
              </Nav.Item>
            </Stack>
          </Nav>
        </Card.Body>
        <Card.Footer>
          <div className="text-center text-muted">
            <small>Copyright &copy; 2023 Nodesafe Ltd</small>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Start;
