import { useState, useEffect, useContext } from "react"
import ProjectCardList from "../components/ProjectCardList";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProjectList() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  // conditional endpoint for regular projects page and search results page
  const endpoint = location.pathname.startsWith("/projects/search")
    ? `http://localhost:8080${location.pathname}`
    : "http://localhost:8080/projects";

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get(endpoint)
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
      {/* if user is logged in and an admin, and this is regular project page, provide create project link */}
      {user && user.organization_id > 0
        && (endpoint === "http://localhost:8080/projects") &&
        <Link to='/projects/create' className="d-flex p-4 justify-content-center">
          <button className="text-white btn btn-primary btn-lg">
            Create Project
          </button>
        </Link>
      }
      <h2 className="text-center mt-5">Your Search Results</h2>
      <ProjectCardList featuredProjects={projects} />
    </>
  );
}