import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tags, setTags] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [projectAdmin, setprojectAdmin] = useState([]);
  const { user, userLoaded } = useContext(UserContext);

  const isProjectAdmin = () => {
    if (
      userLoaded &&
      user &&
      Array.isArray(projectAdmin) &&
      projectAdmin.length > 0
    ) {
      return projectAdmin.includes(user.id);
    }
    return false;
  };

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios
        .get(`http://localhost:8080/projects/${id}/details`)
        .then((response) => {
          const data = response.data;
          // Check if data is an array and has at least three elements
          if (Array.isArray(data) && data.length >= 3) {
            const projectDetails = data[0];
            const contributorsArray = data[1];
            const tagsArray = data[2];
            const adminArray = data[3];

            // Check if projectDetails is an array with expected properties
            if (Array.isArray(projectDetails) && projectDetails.length > 0) {
              setProject(projectDetails[0]);

              // Map contributors if contributorsArray is an array
              if (Array.isArray(contributorsArray)) {
                setContributors(
                  contributorsArray.map((contributor) => (
                    <div key={contributor.user_id}>{contributor.username}</div>
                  ))
                );
              }

              // Map tags if tagsArray is an array
              if (Array.isArray(tagsArray)) {
                const tagsList = tagsArray.map((tag) => ({
                  id: tag.tag_id,
                  name: tag.tag_name,
                }));
                setTags(tagsList);
              }
              if (Array.isArray(adminArray) && adminArray.length > 0) {
                setprojectAdmin(adminArray[0].id);
              }
            } else {
              setProject(null);
            }
          } else {
            setProject(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
          setProject({});
        });
    };

    fetchProjectDetails();
  }, [id]);

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mx-auto">
            <Row className="mb-4 text-center">
              <h1 className="fw-semibold">{project && project.name}</h1>
            </Row>
            <Row className="mb-4 text-center">
              <h3>{project && project.orgname}</h3>
            </Row>
          </Col>
        </Row>
        <Row className="mb-5">
          {tags.map((tag) => (
            <Col className="col-auto" key={tag.id}>
              <Button size="sm">{tag.name}</Button>
            </Col>
          ))}
        </Row>
        <Row className="mb-4 mx-auto">
          <Col className="text-center">
            <Image
              src={project && project.image}
              rounded
              fluid
              style={{ maxHeight: "500px", display: "inline-block" }}
              className="mx-auto"
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <p className="text-center">{project && project.description}</p>
        </Row>
        <h5>Project Contributors</h5>
        {contributors}
        
        {project && user && isProjectAdmin() && (
          <Link to={`/projects/${project && project.id}/edit`}>
            Edit Project
          </Link>
        )}

        {user && project && (
          <Link to={`/projects/${project.id}/apply`}>
            Apply to Work on This Project
          </Link>
        )}
        
        
      </Container>
    </>
  );
}
