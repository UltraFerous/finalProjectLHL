import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

export default function OrgProfile() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [projects, setProjects] = useState([]);
  const [orgAdmin, setOrgAdmin] = useState(null);

  useEffect(() => {
    const fetchOrgDetails = () => {
      axios
        .get(`http://localhost:8080/org/${id}`)
        .then((response) => {
          const data = response.data;
          if (Array.isArray(data) && data.length >= 3) {
            const orgDetails = data[0];
            const projectsArray = data[1];
            const orgAdministrator = data[2];

            // Check if projectDetails is an array with expected properties
            if (Array.isArray(orgDetails) && orgDetails.length > 0) {
              setOrg(orgDetails[0]);

              // Map contributors if contributorsArray is an array
              if (Array.isArray(projectsArray)) {
                const projectList = projectsArray.map((project) => ({
                  id: project.id,
                  name: project.name,
                  image: project.image,
                }));
                setProjects(projectList);
              }

              setOrgAdmin(orgAdministrator);
            }
          } else {
            setOrg(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching organization details:", error);
        });
    };

    fetchOrgDetails();
  }, [id]);

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mx-auto">
            <Row className="mb-4 text-center">
              <h1 className="fw-semibold">{org && org.name}</h1>
            </Row>
            <Row className="mb-4">
              <Col>
                <Image src={org && org.image} rounded fluid />
              </Col>
            </Row>
            <Row className="mb-5">
              <p>{org && org.description}</p>
            </Row>
            <Row className="mb-2">
              <h5>Administrator</h5>
            </Row>
            <Row className="mb-4">
              <Link to={`/users/${org && orgAdmin[0].user_id}`}>
              <div
                      className="d-flex flex-row align-items-center"
                      style={{ marginRight: "10px" }}
                    >
              <Image
                      src={org && orgAdmin[0].image}
                      roundedCircle
                      style={{
                        width: "80px",
                        height: "80px",
                        marginRight: "10px",
                      }}
                      alt="User Image"
                    />
                <h6 style={{ color: "#212529" }}>{orgAdmin && orgAdmin[0].username}</h6>
                </div>
              </Link>
            </Row>
            <Row className="mb-5">
              <Button variant="success">Contact Organization</Button>
            </Row>
            <Row>
              <h5>Projects</h5>
            </Row>
            <Row className="mb-5" style={{ marginTop: "10px" }}>
              {projects.map((project) => (
                <Col className="col-auto" key={project.id}>
                  <Link to={`/projects/${org && project.id}`}>
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
                        alt="Project Image"
                      />
                      <h6 style={{ color: "#212529" }}>{project.name}</h6>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
