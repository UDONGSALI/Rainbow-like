import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './CustomNavbar.css';


function CustomNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-between">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="home" id="basic-nav-dropdown" className="full-width-dropdown">
                        <NavDropdown.Item href="#action/1">homeService 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/2">homeService 2</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3">homeService 3</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="about" id="basic-nav-dropdown" className="full-width-dropdown">
                        <NavDropdown.Item href="#action/1">aboutService 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/2">aboutService 2</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3">aboutService 3</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Services" id="basic-nav-dropdown" className="full-width-dropdown">
                        <NavDropdown.Item href="#action/1">ServicesService 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/2">ServicesService 2</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3">ServicesService 3</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="contact" id="basic-nav-dropdown" className="full-width-dropdown">
                        <NavDropdown.Item href="#action/1">contactService 1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/2">contactService 2</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3">contactService 3</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <div className="navbar-buttons">  {/* Navbar.Collapse 바깥으로 이동 */}
                <Button variant="outline-success" className="mr-2">Search</Button>
                <Button variant="outline-primary">Login</Button>
            </div>
        </Navbar>
    );
}

export default CustomNavbar;
