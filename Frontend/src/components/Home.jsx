import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import BlogList from "../../components/blog/blog-list";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [productsArray, setProductsArray] = useState([]);

  const fetchProducts = async () => {
    try {
      let response = await fetch(`http://localhost:3001/products/`);
      let products = await response.json();
      setProductsArray(products);
      setLoading(false);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to Amazon</h1>
      <Row>
        {productsArray.map((product) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <Link to={`/product/${product._id}`}>
              <Card>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>
                    {product.brand.toUpperCase()} {product.name}
                  </Card.Title>
                </Card.Body>
                <Card.Footer>{product.price}</Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
