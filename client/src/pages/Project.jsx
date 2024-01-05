import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Project() {

  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios.get(`http://localhost:8080/projects/${id}`)
        .then((response) => {
          const data = response.data;
          setProject(data);
        })
        .catch((error) => {
          console.error('Error fetching project details:', error);
        });
    };

    fetchProjectDetails();
  }, [id])

  return (
    <>
      <h1>Project Details Page</h1>
      <h2>{project && project[0].name}</h2>
    </>
  );
}