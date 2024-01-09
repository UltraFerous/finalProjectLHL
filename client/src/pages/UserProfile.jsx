import { Container, Row, Col, Image, Button } from "react-bootstrap";
import userTwo from "../images/user-2.jpg";

export default function UserProfile() {

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mx-auto">
            <Row className="mb-4 text-center">
              <h1 className="fw-semibold">User Name</h1>
            </Row>
            <Row className="mb-4">
              <Col>
                <Image
                  src={userTwo}
                  rounded
                  fluid
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida aliquam sem, id gravida odio pretium elementum. Nunc turpis purus, vulputate sed odio ac, pulvinar dapibus magna. Vestibulum at enim nec elit euismod imperdiet. Suspendisse et pretium lacus. Etiam lobortis rhoncus massa, nec vehicula mi gravida id. Duis scelerisque felis eu malesuada bibendum. Donec lorem massa, gravida vitae est et, mattis molestie sem. In eleifend accumsan sagittis. Aliquam vulputate scelerisque risus. Mauris non malesuada urna. Vivamus suscipit laoreet maximus. Etiam gravida massa sit amet tincidunt condimentum.</p>
            </Row>
            <Row>
              <h5>Skills</h5>
            </Row>
            <Row className="mb-5">
              <Col className="col-auto">
                <Button size="sm">Skill</Button>
              </Col>
              <Col className="col-auto">
                <Button size="sm">Skill</Button>
              </Col>
              <Col className="col-auto">
                <Button size="sm">Skill</Button>
              </Col>
              <Col className="col-auto">
                <Button size="sm">Skill</Button>
              </Col>
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