import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand: "",
    imageUrl: "",
    price: "",
    category: "",
  });

  const createNewProduct = async () => {
    try {
      let response = await fetch("http://localhost:3001/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProduct = (e) => {
    e.preventDefault();
    createNewProduct();
  };

  return (
    <Container className="new-product-container">
      <Form className="mt-5" onSubmit={uploadProduct}>
        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Brand"
            onChange={(e) => setNewProduct({ brand: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Name"
            onChange={(e) => setNewProduct({ name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Price"
            onChange={(e) => setNewProduct({ price: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="product-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            onChange={(e) => setNewProduct({ category: e.target.value })}
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Description"
            onChange={(e) => setNewProduct({ description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewProduct;
