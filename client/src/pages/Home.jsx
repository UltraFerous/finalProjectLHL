import { useState, useEffect } from "react";
import ProjectCardList from "../components/ProjectCardList";
import DeveloperCardList from "../components/DeveloperCardList";
import SearchContainer from "../components/SearchContainer";
import axios from "axios";


export default function Home() {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get("http://localhost:8080/api")
        .then((response) => {
          const data = response.data;
          let projectsArray;
          let developersArray;

          // Check if data is an array
          if (Array.isArray(data) && data.length >= 1) {
            projectsArray = data[0];
            developersArray = data[1];
          }

          // Check if projectsArray is an array with expected properties
          if (Array.isArray(projectsArray) && projectsArray.length > 0) {
            setProjects([projectsArray[0], projectsArray[1], projectsArray[2]]);
          }

          // Check if developersArray is an array with expected properties
          if (Array.isArray(developersArray) && developersArray.length > 0) {
            setDevelopers(developersArray.length >= 3 ? developersArray.slice(0, 3) : developersArray);
          }
        })

        .catch((error) => {
          console.error("Error fetching project & developer info:", error);
        });
    };

    fetchCardDetails();
  }, []);

  const heroStyle = {
    backgroundImage: 'url("../hero-image.webp")',
    height: '400px',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#135317',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '10%',
  };

  return (
    <>
      <div style={heroStyle}>
        <h1 className="text-center">Connecting Developers and Charities for a Brighter Future</h1>
      </div>
      <div>
        <h2 className="text-center mt-5">Search for Inspiration</h2>
        <p className="text-center">What would you like to search for?</p>
      </div>
      <SearchContainer />
      <h2 className="text-center">Featured Projects</h2>
      <ProjectCardList featuredProjects={projects} />
      <h2 className="text-center">Featured Developers</h2>
      <DeveloperCardList featuredDevelopers={developers} />
    </>
  );
}
