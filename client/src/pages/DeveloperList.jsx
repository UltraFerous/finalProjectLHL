import { useState, useEffect } from "react"
import DeveloperCardList from "../components/DeveloperCardList";
import axios from "axios";

export default function DeveloperList() {

  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get("http://localhost:8080/api/developers")
        .then((response) => {
          const data = response.data;

          // Check if data is an array
          if (Array.isArray(data) && data.length >= 1) {
            // Set the state with the received data
            setDevelopers(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching project & developer info:", error);
        });
    };

    fetchCardDetails();
  }, []);

  return (
    <>
      <h2>Your Search Results</h2>
      <DeveloperCardList featuredDevelopers={developers} />
    </>
  );
}