import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProjectApplication() {

  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [applicationData, setApplicationData] = useState({});

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios.get(`http://localhost:8080/projects/${id}/apply`)
        .then((response) => {
          const data = response.data;
          setProject(data);
        })
        .catch((error) => {
          console.error('Error fetching project details:', error);
        });
    };
  
    fetchProjectDetails();

  }, [id]);


  return (
    <>
      <h1>Application for {project && project[0].name}</h1>
      <h2>{project && project[0].orgname}</h2>
      <h3>Application form goes here</h3>
    </>
  );
}