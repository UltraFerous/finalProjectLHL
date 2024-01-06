import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tags, setTags] = useState([]);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios
        .get(`http://localhost:8080/projects/${id}`)
        .then((response) => {
          const data = response.data;

          // Check if data is an array and has at least three elements
          if (Array.isArray(data) && data.length >= 3) {
            const projectDetails = data[0];
            const contributorsArray = data[1];
            const tagsArray = data[2];

            // Check if projectDetails is an array with expected properties
            if (Array.isArray(projectDetails) && projectDetails.length > 0) {
              setProject(projectDetails[0]);

              // Map contributors if contributorsArray is an array
              if (Array.isArray(contributorsArray)) {
                setContributors(contributorsArray.map((contributor) => (
                  <div key={contributor.user_id}>{contributor.username}</div>
                )));
              }

              // Map tags if tagsArray is an array
              if (Array.isArray(tagsArray)) {
                setTags(tagsArray.map((tag) => (
                  <div key={tag.tag_id}>{tag.tag_name}</div>
                )));
              }
            } else {
              setProject({});
            }
          } else {
            setProject({});
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
      <p>{project && project.description}</p>
      <img src={project && project.image} />
      <h3>Project Contributors</h3>
      {contributors}
      <h3>Project Updates</h3>
    </>
  );
}
