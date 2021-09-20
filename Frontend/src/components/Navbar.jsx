import React from "react";
import { Navbar, Button, FormControl, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Amazon
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/" style={{ marginRight: "2em", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/products" style={{ marginRight: "2em" }}>
          Products
        </Link>
        <Link to="/addproduct" style={{ marginRight: "2em" }}>
          Add a product
        </Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
};

export default NavBar;
