import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router";


function Header() {
    return (
        <Navbar expand="lg" className="header">
            <Container>
                <Navbar.Brand >HEXAR</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="text-center header-part">
                        <Nav.Link >
                            <Link to="/home">Home</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/main">Main</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/main">Main</Link>
                        </Nav.Link>
                        
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar >
    )
}

export default Header;