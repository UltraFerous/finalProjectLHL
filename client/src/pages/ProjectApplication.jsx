import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function ProjectApplication() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState({
    user_id: null,
    project_id: null,
    text: "",
    status: 1
  });

  const { text } = applicationData;

  const onChange = (e) => {
    setApplicationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/api/projects/${id}apply`,
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
          navigate(`/projects/${id}`);
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
    <>
      <h1>Application for {project && project[0].name}</h1>
      <h2>{project && project[0].orgname}</h2>
      <form onSubmit={onSubmit}>
      <label htmlFor="text">What makes you a good fit for this project?</label>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={onChange}
        />
        <button type="submit">Submit Application</button>
      </form>
    </>
  );
}
