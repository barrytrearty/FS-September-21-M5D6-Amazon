import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Image,
  Form,
  Card,
} from "react-bootstrap";
import { withRouter } from "react-router";

const Product = ({ match }) => {
  const { id } = match.params;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState([]);
  const [open, setOpen] = useState([]);

  const fetchProduct = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/products/${id}`);
      let productObj = await response.json();
      setProduct(product);
      setLoading(false);
      return productObj;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="blog-details-root">
      <Container>
        <Row>
          <Col className="col-9">
            <Image className="blog-details-cover" src={product.cover} fluid />
            <h1 className="blog-details-title">{product.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">{product.price}</div>
              <div className="blog-details-info">
                <div>{product.createdAt}</div>
                {/* <div>{`${product.readTime.value} ${product.readTime.unit} read`}</div> */}
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              size="lg"
              variant="dark"
              style={{ margin: "1em" }}
            >
              {" "}
              Upload Cover
            </Button>
          </Col>
          <Col className="col-3">
            <div className="mt-5">
              <Card body>
                <h4>Reviews</h4>
              </Card>
              {reviews.map((review) => (
                <Card body key={review.userName}>
                  <h5>{review.userName}</h5> {review.text}
                </Card>
              ))}
              <Form>
                <Form.Group>
                  <Form.Label>Leave a comment</Form.Label>
                  <textarea
                    name="text"
                    id="text"
                    cols="auto"
                    rows="2"
                  ></textarea>
                  <Form.Control
                    size="auto"
                    placeholder="Title"
                    onChange={(e) => setNewReview({ title: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Product);
