import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export const Navibar = () => {
    return (
        <div className="Navi">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Inventory Management System V2</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/stockevents">Stocks</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="https://github.com/MARTINS2309/inventoryV2">Github</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};