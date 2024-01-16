import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Badge,
  Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function UserProfile() {
  const { id } = useParams();
  const parsedId = parseInt(id, 10); // Ensure it's a number
  const [userData, setUserData] = useState(null);
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const acceptApplicationClick = () => {

  };

  const { isLoading, updateLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDetails = () => {
      axios
        .get(`http://localhost:8080/users/${id}/details`)
        .then((response) => {
          const data = response.data;

          // If data is empty redirect to 404 page
          if (Array.isArray(data) && data[0].length === 0) {
            return navigate('/*');
          }

          // Check if data is an array and has at least three elements
          if (Array.isArray(data) && data.length >= 2) {
            const userDetails = data[0];
            const tagsArray = data[1];
            const projectsArray = data[2];
            const applicationsArray = data[3];

            // Check if userDetails is an array with expected properties
            if (Array.isArray(userDetails) && userDetails.length > 0) {
              setUserData(userDetails[0]);
              console.log("USERDATA", userData)
              console.log("USERDETAIL", userDetails[0])
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
                    status: application.status,
                  })
                );
                setApplications(applicationsList);
                updateLoading(false);
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

  return isLoading ? (
    <Spinner />
  ) : (
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
              <h4 className="mb-3">Skills</h4>
            </Row>
            <Row className="mb-5">
              {tags.map((tag) => (
                <Col className="col-auto" key={tag.id}>
                  <Button size="sm">{tag.name}</Button>
                </Col>
              ))}
            </Row>
            <Row>
              <h4 className="mb-2">
                {user && user.id === parsedId
                  ? "Projects you are contributing to"
                  : `Projects ${userData && userData.username
                  } is contributing to`}
              </h4>
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

            <Row>
              {user && user.id === parsedId && (
                <Link to={`/projects/quicksearch/${id}`}>
                  <Button variant="primary" className="text-white mb-5">
                    Quick Search For Projects
                  </Button>
                </Link>
              )}
            </Row>

            {user && user.id === parsedId ? (
              <div></div> // Render an empty div if the condition is true
            ) : (
              <Row className="mb-5">
                <Link to={`http://localhost:5173/messages/${user.id}/${id}`}>
                  <Button variant="success" className="w-100">Contact Me</Button>
                </Link>
              </Row>
            )}
            {user && user.id === parsedId && applications.length > 0 && (
              <div
                style={{ borderTop: `2px solid #208C27`, paddingTop: "30px" }}
              >
                <Row>
                  <h4 className="mt-4 mb-3">Applications for your review</h4>
                </Row>
                <Row
                  className="mb-5 d-flex flex-column"
                  style={{ marginTop: "10px" }}
                >
                  {applications.map((application) => (
                    <Card key={application.id} className="mt-3 mb-4">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col xs={8}>
                            <h5>{application.projectName} Project</h5>
                          </Col>
                          <Col xs={4} className="text-end">
                            <Badge pill bg="primary">
                              {application.status}
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>
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
                                  marginRight: "25px",
                                }}
                                alt="User Image"
                              />
                              <h6 style={{ color: "#212529" }}>
                                {application.applicantName}
                              </h6>
                            </div>
                          </Link>
                        </Card.Title>
                        <Card.Text>{application.text}</Card.Text>
                        <Button
                          variant="primary"
                          onClick={acceptApplicationClick}
                        >
                          Accept Application
                        </Button>
                      </Card.Body>
                    </Card>
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
