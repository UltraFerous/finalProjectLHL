import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ProjectApplication() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState({
    user_id: null,
    project_id: null,
    text: ""
  });
  const [show, setShow] = useState(false);

  const parsedId = parseInt(id, 10); // Ensure it's a number

  const { text } = applicationData;

  const onChange = (e) => {
    setApplicationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleShow = () => {
    setShow(true);
    ;
  };
  const handleClose = () => {
    setShow(false);
    navigate(`/projects/${id}`)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/api/projects/${id}/apply`,
        applicationData, // Send properties directly
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const applicationData = response.data;
          // Redirect to the project details
          handleShow();
        } else {
          // Handle unsuccessful login
          console.error("Application submission failed");
        }
      })
      .catch((error) => {
        console.error("Error during application submission:", error.message);
      });
  };

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios
        .get(`http://localhost:8080/projects/${id}/apply`)
        .then((response) => {
          const data = response.data;
          setProject(data);
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
        });
    };

    fetchProjectDetails();

    setApplicationData((prevState) => ({
      ...prevState,
      user_id: user.id,
      project_id: id,
    }));
  }, [id, user.id]);

  return (
    <div className="mt-5">
      <h1 className="text-center mb-3">Application for {project && project[0].name}</h1>
      <h2 className="text-center mb-4">{project && project[0].orgname}</h2>
      <Form
      onSubmit={onSubmit}
      className="d-flex flex-column align-items-center mb-4"
      >
       <Form.Group controlId="text" className="mb-3 mt-4" style={{ width: '550px' }}>
          <Form.Label>What makes you a good fit for this project?</Form.Label>
          <Form.Control
            as="textarea"
            name="text"
            value={text}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" className="text-white" variant="primary">Submit Application</Button>
      </Form>
      <Modal
                  show={show}
                  onHide={handleClose}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Application Submitted</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="postForm.ControlTextarea"
                      >
                        <Form.Label>Your application will be reviewed by the project administrator.</Form.Label>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                </Modal>
    </div>
  );
}
