import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Project() {

  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/projects/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id])

  return (
    <>
      <h1>Project Details Page</h1>
      <h2>{project && <h2>{project[0].name}</h2>}</h2>
    </>
  );
}