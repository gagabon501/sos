import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";

const UsersList = () => {

    const users = ([
        {id: "1" ,firstname: "May", lastname: "Scheme", company: "Leighs Construction"},
        {id: "2" ,firstname: "John", lastname: "Doe", company: "Fullers Construction"},
        {id: "3" ,firstname: "Matt", lastname: "Smith", company: "William Corporation"},
    ])

    return (  
        <>
        <h1>List of Users</h1>
        {users.map((user) => (
            <Col lg={true} key={user.id}>
                <Card style={{ width: '10rem' }} className="mt-3" key={user.id}>
                    <Card.Img variant="top" src="holder.js/100px180" 
                    style={{ width: '100%', height: "8rem", cursor: "pointer" }}
                    />
                    <Card.Body>
                        <Card.Title>{user.firstname} {user.lastname}</Card.Title>
                        <Card.Text>
                            {user.company}
                        </Card.Text>
                        <Button variant="outline-primary">Edit</Button>
                        <Button variant="outline-danger">Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
        )}
        </>
    );
}

export default UsersList;
