import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

//navbar for the app
//using react-boostrap to speed up development
export const Navibar = () => {
    return (
        <div className="Navibar" data-testid="navibar">            
            <Navbar bg="success" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Inventory Management System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" data-testid="home">Home</Nav.Link>
                            <Nav.Link href="/stockeventstable" data-testid="stock">Stock Overview</Nav.Link>
                            <Nav.Link href="/products" data-testid="products">Products</Nav.Link>
                            <Nav.Link href="/stockevents" data-testid="users">Stock Events</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Links" id="basic-nav-dropdown">
                                <NavDropdown.Item href="https://github.com/MARTINS2309/inventoryV2" data-testid="github">Github</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};