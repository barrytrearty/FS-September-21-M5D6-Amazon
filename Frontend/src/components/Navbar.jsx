import React from "react";
import { Navbar, Button, FormControl, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="success">
      <Navbar.Brand as={Link} to="/">
        Amazon
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/addproduct">Add a product</Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
};

export default NavBar;
