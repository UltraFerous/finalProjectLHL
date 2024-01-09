import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
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

  if (!org) {
    return null;
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center mb-5">
          <h1>{org[0].name}</h1>
        </Row>
        <Row>
          <Col xs={6}>
            <Row className="mb-5">
              <img src={dogPhoto} alt="Organization Image" />
            </Row>
            <Row>
              <p>{org[0].description}</p>
            </Row>
          </Col>
          <Col>
            <Row className="mb-2">
              <h5>Administrators</h5>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col xs="auto">
                <img
                  src={userOne}
                  alt="User One"
                  className="user-profile-images"
                />
              </Col>
              <Col xs="auto">
                <span>John Doe, President</span>
              </Col>
            </Row>
            <Row className="mb-5 d-flex align-items-center">
              <Col xs="auto">
                <img
                  src={userTwo}
                  alt="User One"
                  className="user-profile-images"
                />
              </Col>
              <Col xs="auto">
                <span>Jane Doe, Marketing Director</span>
              </Col>
            </Row>
            <Row className="mb-2">
              <h5>Website</h5>
            </Row>
            <Row className="mb-5">
              <a href={org[0].website}>{org[0].name}</a>
            </Row>
            <Row xs="auto">
              <Button variant="success">
                Contact {org[0].name}
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}