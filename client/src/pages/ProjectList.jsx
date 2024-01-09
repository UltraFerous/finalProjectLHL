import { useState, useEffect } from "react"
import ProjectCardList from "../components/ProjectCardList";
import axios from "axios";

export default function ProjectList() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get("http://localhost:8080/projects")
        .then((response) => {
          const data = response.data;

          // Check if data is an array
          if (Array.isArray(data) && data.length >= 1) {
            // Set the state with the received data
            setProjects(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching project info:", error);
        });
    };

    fetchCardDetails();
  }, []);

  return (
    <>
      <h2 className="text-center mt-5">Your Search Results</h2>
      <ProjectCardList featuredProjects={projects} />
    </>
  );
}