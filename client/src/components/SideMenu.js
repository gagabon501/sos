import Stack from "react-bootstrap/Stack";
import Nav from "react-bootstrap/Nav";
import MenuBox from "./MenuBox";

function SideMenu() {
  return (
    <>
      <Stack Stack direction="vertical" gap={3}>
        <Nav.Item fill={true}>
          <Nav.Link href="/">
            <MenuBox text="Dashboard" img="Dashboard_Icon1.png" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item fill={true}>
          <Nav.Link href="/observe">
            <MenuBox text="Add New Observation" img="Add_Icon1.png" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item fill={true}>
          <Nav.Link href="/show">
            <MenuBox text="View List" img="View_Icon1.png" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item fill={true}>
          <Nav.Link href="/">
            <MenuBox text="Generate Report" img="generate1.png" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item fill={true}>
          <Nav.Link href="/">
            <MenuBox text="Manage Users" img="Edit_Icon1.png" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item fill={true}>
          <Nav.Link href="/">
            <MenuBox text="Manage Companies" img="Management_Icon1.png" />
          </Nav.Link>
        </Nav.Item>
      </Stack>
    </>
  );
}

export default SideMenu;
