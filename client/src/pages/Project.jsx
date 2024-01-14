import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate  } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tags, setTags] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [projectAdmin, setprojectAdmin] = useState([]);
  const [projectPosts, setProjectPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [postFormText, setPostFormText] = useState("");
  const navigate = useNavigate()

  const isProjectAdmin = () => {
    return projectAdmin === user.id;
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      project_id: id,
      text: postFormText,
    }
    axios.post(`http://localhost:8080/api/projects/${id}/addpost`, postData)
    .then(() => {
      setShow(false);

      // Fetch the updated posts from the server
      axios.get(`http://localhost:8080/projects/${id}/details`)
        .then((response) => {
          const postsArray = response.data[4];

          // Map the updated posts and update the state
          if (Array.isArray(postsArray)) {
            const updatedPosts = postsArray.map((post) => ({
              id: post.id,
              text: post.text,
            }));
            setProjectPosts(updatedPosts);
          }
        })
        .catch((error) => {
          console.error("Error fetching updated posts:", error);
        });
    })
    .catch((error) => {
      console.error("Error submitting post:", error);
    });
  };

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios
        .get(`http://localhost:8080/projects/${id}/details`)
        .then((response) => {
          const data = response.data;
          
          // If data is empty redirect to 404 page
          if (Array.isArray(data) && data[0].length === 0) {
            return navigate('/*');
          }
          
          // Check if data is an array and has at least three elements
          if (Array.isArray(data) && data.length >= 3) {
            const projectDetails = data[0];
            const contributorsArray = data[1];
            const tagsArray = data[2];
            const adminArray = data[3];
            const postsArray = data[4];

            // Check if projectDetails is an array with expected properties
            if (Array.isArray(projectDetails) && projectDetails.length > 0) {
              setProject(projectDetails[0]);

              // Map contributors if contributorsArray is an array
              if (Array.isArray(contributorsArray)) {
                const contributorList = contributorsArray.map(
                  (contributor) => ({
                    id: contributor.id,
                    name: contributor.username,
                    image: contributor.image,
                  })
                );
                setContributors(contributorList);
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

              // Map postsArray if postsArray is an array
              if (Array.isArray(postsArray)) {
                const postsList = postsArray.map((post) => ({
                  id: post.id,
                  text: post.text,
                }));
                setProjectPosts(postsList);
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
          <Col md={7} className="mx-auto">
            <Row className="mb-4 text-center">
              <h1 className="fw-semibold">{project && project.name}</h1>
            </Row>
            <Row className="mb-4 text-center">
              <Link to={`/org/${project && project.organization_id}`}>
                <h3 style={{ color: "#212529" }}>
                  {project && project.orgname}
                </h3>
              </Link>
            </Row>

            <Row className="mb-5">
              <Col className="d-flex justify-content-center">
                {tags.map((tag) => (
                  <Button size="sm" key={tag.id} style={{ margin: "10px" }}>
                    {tag.name}
                  </Button>
                ))}
              </Col>
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
              <p>{project && project.description}</p>
            </Row>
            {user && project && !isProjectAdmin() && (
              <Link to={`/projects/${project.id}/apply`}>
                <Button variant="primary" className="text-white mb-5">
                  Apply to Work on This Project
                </Button>
              </Link>
            )}
            <Row className="mb-3">
              <h5>Project Contributors</h5>
            </Row>
            <Row className="mb-5" style={{ marginTop: "10px" }}>
              {contributors.map((contributor) => (
                <Col className="col-auto" key={contributor.id}>
                  <Link to={`/users/${project && contributor.id}`}>
                    <div
                      className="d-flex flex-row align-items-center"
                      style={{ marginRight: "10px" }}
                    >
                      <Image
                        src={contributor.image}
                        roundedCircle
                        style={{
                          width: "80px",
                          height: "80px",
                          marginRight: "10px",
                        }}
                        alt="User Image"
                      />
                      <h6 style={{ color: "#212529" }}>{contributor.name}</h6>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>

            <Col>
            {project && user && isProjectAdmin() && (
              <>
                <div className="d-flex flex-row align-items-center mb-5">
                  <Link to={`/projects/${project && project.id}/edit`}>
                    <Button variant="primary" className="text-white">
                      Edit Project
                    </Button>
                  </Link>
                  <Button onClick={handleShow} className="ms-5">
                    Add Project Update
                  </Button>
                </div>
                <Modal
                  show={show}
                  onHide={handleClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Project Update</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="postForm.ControlTextarea"
                      >
                        <Form.Label>What's new with this project?</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setPostFormText(e.target.value)}/>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                      Save Post
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Col>

          <Col>
          {project && user && isProjectAdmin() && (
            <Link to={`/developers/quicksearch/${project && project.id}`}>
              <Button variant="primary" className="text-white mb-5">Quick Search For Developers</Button>
            </Link>
          )}
          </Col>


            <Row className="mb-3">
              <h5>Project Updates</h5>
            </Row>
            <Row
              className="mb-4 d-flex flex-column"
              style={{ marginTop: "10px" }}
            >
              {projectPosts.map((post) => (
                <Col className="bg-light col-auto mt-1 mb-2" key={post.id}>
                  <Card bg="light">
                    <Card.Body>{post.text}</Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  );
}
