import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [tags, setTags] = useState([]);
  const { user, userLoaded } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDetails = () => {
      axios
        .get(`http://localhost:8080/users/${id}/details`)
        .then((response) => {
          const data = response.data;

          // Check if data is an array and has at least three elements
          if (Array.isArray(data) && data.length >= 2) {
            const userDetails = data[0];
            const tagsArray = data[1];

            // Check if userDetails is an array with expected properties
            if (Array.isArray(userDetails) && userDetails.length > 0) {
              setUserData(userDetails[0]);

              // Map tags if tagsArray is an array
              if (Array.isArray(tagsArray)) {
                const tagsList = tagsArray.map((tag) => ({
                  id: tag.tag_id,
                  name: tag.tag_name,
                }));
                setTags(tagsList);
              } else {
                setUserData(null);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setUserData({});
        });
    };

    fetchUserDetails();
  }, [id]);

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mx-auto">
            <Row className="mb-4 text-center">
              <h1 className="fw-semibold">{userData && userData.username}</h1>
            </Row>
            <Row className="mb-4">
              <Col>
                <Image src={userData && userData.image} rounded fluid />
              </Col>
            </Row>
            <Row className="mb-4">
              <p>{userData && userData.description}</p>
            </Row>
            <Row>
              <h5>Skills</h5>
            </Row>
            <Row className="mb-5">
              {tags.map((tag) => (
                <Col className="col-auto" key={tag.id}>
                  <Button size="sm">{tag.name}</Button>
                </Col>
              ))}
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
