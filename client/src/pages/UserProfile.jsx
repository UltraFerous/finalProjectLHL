import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function UserProfile() {
  const { id } = useParams();
  const parsedId = parseInt(id, 10); // Ensure it's a number
  const [userData, setUserData] = useState(null);
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const { user } = useContext(UserContext);

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
            const projectsArray = data[2];
            const applicationsArray = data[3];

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
                setTags([]);
              }

              // Map projects if projectsArray is an array
              if (Array.isArray(projectsArray)) {
                const projectsList = projectsArray.map((project) => ({
                  id: project.id,
                  name: project.name,
                  image: project.image,
                }));
                setProjects(projectsList);
              } else {
                setProjects([]);
              }

              // Map applications if applicationsArray is an array
              if (Array.isArray(applicationsArray)) {
                const applicationsList = applicationsArray.map(
                  (application) => ({
                    id: application.applicationid,
                    projectName: application.projectname,
                    applicantName: application.username,
                    image: application.userimage,
                    text: application.text,
                    applicantId: application.applicant,
                  })
                );
                setApplications(applicationsList);
              } else {
                setApplications([]);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setUserData(null);
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
            <Row className="mb-4 mx-auto">
              <Col className="text-center">
                <Image
                  src={userData && userData.image}
                  rounded
                  fluid
                  style={{ maxHeight: "600px", display: "inline-block" }}
                  className="mx-auto"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <p className="text-center">{userData && userData.description}</p>
            </Row>
            <Row>
              <h5 className="mb-3">Skills</h5>
            </Row>
            <Row className="mb-5">
              {tags.map((tag) => (
                <Col className="col-auto" key={tag.id}>
                  <Button size="sm">{tag.name}</Button>
                </Col>
              ))}
            </Row>
            <Row>
              <h5 className="mb-2">
                {user && user.id === parsedId
                  ? "Projects you are contributing to"
                  : `Projects ${
                      userData && userData.username
                    } is contributing to`}
              </h5>
            </Row>
            <Row className="mb-5" style={{ marginTop: "10px" }}>
              {projects.map((project) => (
                <Col className="col-auto" key={project.id}>
                  <Link to={`/projects/${project.id}`}>
                    <div
                      className="d-flex flex-row align-items-center"
                      style={{ marginRight: "10px" }}
                    >
                      <Image
                        src={project.image}
                        roundedCircle
                        style={{
                          width: "80px",
                          height: "80px",
                          marginRight: "10px",
                        }}
                        alt="User Image"
                      />
                      <h6 style={{ color: "#212529" }}>{project.name}</h6>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
            {(user && user.id !== parsedId) || !user && (
              <Row className="mb-5">
                <Button variant="success">Contact Me</Button>
              </Row>
            )}
            {user && user.id === parsedId && applications.length > 0 && (
              <div style={{ borderTop: `2px solid #208C27`, paddingTop: "30px" }}>
                <Row>
                  <h5>Applications for your review</h5>
                </Row>
                <Row
                  className="mb-5 d-flex flex-column"
                  style={{ marginTop: "10px" }}
                >
                  {applications.map((application) => (
                    <Col
                      className="bg-light col-auto mt-3 mb-4"
                      key={application.id}
                    >
                      <h5 style={{ color: "#212529" }}>
                        {application.projectName} Project
                      </h5>
                      <Link to={`/users/${application.applicantId}`}>
                        <div
                          className="d-flex flex-row align-items-center mt-3 mb-3"
                          style={{ marginRight: "10px" }}
                        >
                          <Image
                            src={application.image}
                            roundedCircle
                            style={{
                              width: "80px",
                              height: "80px",
                              marginRight: "10px",
                            }}
                            alt="User Image"
                          />
                          <h6 style={{ color: "#212529" }}>
                            {application.applicantName}
                          </h6>
                        </div>
                      </Link>
                      <p style={{ color: "#212529" }}>{application.text}</p>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
