import { useState, useEffect, useContext } from "react";
import DeveloperCardList from "../components/DeveloperCardList";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import axios from "axios";
import pruneData from "../helpers/pruneData";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";

export default function DeveloperList() {
  const [developers, setDevelopers] = useState([]);
  const location = useLocation();
  // conditional endpoint for regular developers page and search results page
  const endpoint = location.pathname.startsWith("/developers/quicksearch")
    ? `http://localhost:8080${location.pathname}`
    : "http://localhost:8080/developers";

  const { isLoading, updateLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get(endpoint)
        .then((response) => {
          const data = response.data;
        
          // Check if data is an array
          if (Array.isArray(data) && data.length >= 1) {
            // Set the state with the received data
            const sortedData = pruneData(data);
            setDevelopers(sortedData);
            updateLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching developer info:", error);
        });
    };

    fetchCardDetails();
  }, [endpoint]);

  return isLoading ? (
    <Spinner />
    ) : (
    <>
      <Container>
        <h2 className="text-center mt-5">Best Developers For Your Project</h2>
        <DeveloperCardList featuredDevelopers={developers} />
      </Container>
    </>
  );
}
