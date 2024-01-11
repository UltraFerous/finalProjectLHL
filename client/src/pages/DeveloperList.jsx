import { useState, useEffect } from "react"
import DeveloperCardList from "../components/DeveloperCardList";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar"

export default function DeveloperList() {
  const [developers, setDevelopers] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  // conditional endpoint for regular developers page and search results page
  const endpoint = location.pathname.startsWith("/developers/search")
    ? `http://localhost:8080${location.pathname}`
    : "http://localhost:8080/developers";

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get(endpoint)
        .then((response) => {
          const data = response.data;

          // Check if data is an array
          if (Array.isArray(data) && data.length >= 1) {
            // Set the state with the received data
            setDevelopers(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching developer info:", error);
        });
    };

    fetchCardDetails();
  }, []);

  return (
    <>
      <SearchBar searchType={"developers"}/>
      <h2 className="text-center mt-5">Your Search Results</h2>
      { developers.length === 0 && loading === true && <h2 className="text-center mt-5">Loading...</h2> }
      { developers.length > 0 && loading === false && <h2 className="text-center mt-5">Your Search Results</h2> }
      { developers.length === 0 &&  loading === false ? <h2 className="text-center mt-5">No Results Found</h2> :       <DeveloperCardList featuredDevelopers={developers} /> } 
    </>
  );
}