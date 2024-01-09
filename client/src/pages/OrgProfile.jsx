import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import dogPhoto from "../images/dog-photo.jpg"
import userOne from "../images/user-1.jpg";
import userTwo from "../images/user-2.jpg";

export default function OrgProfile() {

  const { id } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const fetchOrgDetails = () => {
      axios.get(`http://localhost:8080/org/${id}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          setOrg(data);
        })
        .catch((error) => {
          console.error('Error fetching project details:', error);
        });
    };

    fetchOrgDetails();
  }, [id])

  // display a blank page while fetching data
  if (!org) {
    return null;
  }

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mx-auto">
            <Row className="mb-4 text-center">
              <h1 className="fw-semibold">{org[0].name}</h1>
            </Row>
            <Row className="mb-4">
              <Col>
                <Image
                  src={dogPhoto}
                  rounded
                  fluid
                />
              </Col>
            </Row>
            <Row className="mb-5">
              <p>{org[0].description}</p>
            </Row>
            <Row className="mb-2">
              <h5>Administrators</h5>
            </Row>
            <Row className="mb-4 d-flex align-items-center">
              <Col md={2}>
                <Image
                  src={userOne}
                  roundedCircle
                  fluid
                  alt="User One"
                />
              </Col>
              <Col>
                <span>John Doe, President</span>
              </Col>
            </Row>
            <Row className="mb-4 d-flex align-items-center">
              <Col md={2}>
                <Image
                  src={userTwo}
                  roundedCircle
                  fluid
                  alt="User One"
                />
              </Col>
              <Col>
                <span>Jane Doe, Marketing Director</span>
              </Col>
            </Row>
            <Row className="mb-5">
              <Button variant="success">Contact Organization</Button>
            </Row>
            <Row>
              <h5>Projects</h5>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}