import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tags, setTags] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [projectAdmin, setprojectAdmin] = useState([]);
  const { user } = useContext(UserContext);

  const isProjectAdmin = () => {
    if (user && Array.isArray(projectAdmin) && projectAdmin.length > 0) {
      return projectAdmin.includes(user.id);
    }
    return false;
  };

  useEffect(() => {
    console.log('user state in project component:', user);
    const fetchProjectDetails = () => {
      axios
        .get(`http://localhost:8080/projects/${id}/details`)
        .then((response) => {
          const data = response.data;
          console.log('client received data:', data);
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
                setTags(
                  tagsArray.map((tag) => (
                    <div key={tag.tag_id}>{tag.tag_name}</div>
                  ))
                );
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
      <h1>{project && project.name}</h1>
      <h2>{project && project.orgname}</h2>
      <ul>{tags}</ul>
      {isProjectAdmin() && (
        <Link to={`/projects/${project && project.id}/edit`}>Edit Project</Link>
      )}
      <p>{project && project.description}</p>
      <img src={project && project.image} />
      {user && (
        <Link to={`/projects/${project.id}/apply`}>
          Apply to Work on This Project
        </Link>
      )}
      <h3>Project Contributors</h3>
      {contributors}
    </>
  );
}
