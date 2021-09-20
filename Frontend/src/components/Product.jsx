import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Image,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import { withRouter } from "react-router";

const Product = ({ match }) => {
  const { id } = match.params;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState([]);
  const [open, setOpen] = useState([]);
  const [file, setFile] = useState(null);

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

  const submitForm = (e) => {
    e.preventDefault();
    const fileFormData = new FormData();
    fileFormData.append("photoKey- whatever backend says", file);
    const uploadPhoto = async (id) => {
      try {
        let response = await fetch(
          `http://localhost:3001/products/${id}/uploadPhoto`,
          {
            method: "PUT",
            body: fileFormData,
          }
        );
        fetchProduct(id);
      } catch (error) {
        console.log(error);
      }
    };
    uploadPhoto(id);
    setOpen(false);
  };

  const fetchReviews = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/product/${id}/reviews`);
      let fetchedReviews = await response.json();
      setReviews(fetchedReviews);
      // setLoading(false);
      console.log(fetchedReviews);
      return fetchedReviews;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct(id);
    fetchReviews(id);
  }, []);

  return (
    <div className="product-details-root">
      <Container>
        <Row>
          <Col className="col-9">
            <Image
              className="product-details-cover"
              src={product.cover}
              fluid
            />
            <h1 className="product-details-title">{product.title}</h1>

            <div className="product-details-container">
              <div className="product-details-author">{product.price}</div>
              <div className="product-details-info">
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
                  <Form.Label>Leave a review</Form.Label>
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

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={open}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title>Upload Cover</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitForm}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Choose</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(`Number 1 ${e.target}`);
                    console.log(e.target.files);
                    console.log(file);
                    setFile(file);
                  }}
                  accept="image/*"
                  type="file"
                  placeholder="Photo"
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex mt-3">
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
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default withRouter(Product);
