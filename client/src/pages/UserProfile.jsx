import { Container, Row, Col, Button } from "react-bootstrap";
import userTwo from "../images/user-2.jpg";

export default function UserProfile() {

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center mb-5">
          <h1>User Name</h1>
        </Row>
        <Row>
          <Col xs={6}>
            <Row className="mb-5">
              <img
                src={userTwo}
                alt="User"
                className="proj-org-images"
              />
            </Row>
            <Row>
              <p>Morbi pharetra nulla sem, in vehicula enim viverra et. In ut pharetra felis, non condimentum quam. Aliquam vitae placerat quam. Sed lacus nulla, efficitur in nibh sollicitudin, suscipit consectetur magna. Nam erat dui, condimentum posuere libero sed, fringilla imperdiet nunc. Nunc non molestie odio, a fermentum magna. Integer bibendum hendrerit tristique. Praesent vestibulum eget enim in faucibus. Nullam eget sem hendrerit, tempus quam vitae, pellentesque nisl. Morbi efficitur ex in mauris aliquet, ac vestibulum est scelerisque. Aenean ullamcorper nibh nec massa pulvinar tempus vel in nunc.</p>
            </Row>
          </Col>
          <Col>
            <Row className="mb-2">
              <h5>Location</h5>
            </Row>
            <Row>
              <p>Halifax, Nova Scotia, Canada</p>
            </Row>
            <Row className="mb-2">
              <h5>Contact User Name</h5>
            </Row>
            <Row>
              <a href="#">
                <Button variant="success">Email User Name</Button>
              </a>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}