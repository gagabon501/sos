import React from "react";
import NavBar from "./NavBar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideMenu from "./SideMenu";
import Card from "react-bootstrap/Card";
import Footer from "./Footer";
// import UsersList from "./ListOfUsers";
//import { useState } from "react";
import Button from "react-bootstrap/Button";

const ShowUsers = () => {
    const usersList = ([
        {id: "1" ,firstname: "May", lastname: "Scheme", company: "Leighs Construction"},
        {id: "2" ,firstname: "John", lastname: "Doe", company: "Fullers Construction"},
        {id: "3" ,firstname: "Matt", lastname: "Smith", company: "William Corporation"},
    ])

    //const [users, setUsers] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    return (  
        <div>
        <NavBar />
        <Container fluid>
            <Row>
            <Col lg={2}>
                <SideMenu />
            </Col>
            <Col>
            <Card>
                <Card.Header className="text-center bg-success text-white">
                    <h5 style={{color: "white"}}>List of Users</h5>
                </Card.Header>
                
                <Card.Body>
                {usersList.map((user) =>(
                    <Col lg={6}>
                        <Card.Img variant="top" src="holder.js/100px180" 
                            style={{ width: '8rem', height: "8rem", cursor: "pointer" }}
                         />
                        <Card.Title>{user.firstname} {user.lastname}</Card.Title>
                        <Card.Text>
                            {user.company}
                        </Card.Text>
                        <Button variant="outline-primary">Edit</Button>
                        <Button variant="outline-danger">Delete</Button>
                    </Col>
                ))} 
                </Card.Body>
            </Card>  
            </Col>
            </Row>
        </Container>
      <footer>
        <Footer />
      </footer>
    </div>
    );
}
 
export default ShowUsers;