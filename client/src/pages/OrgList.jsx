import { useState, useEffect } from "react"
import OrgCardList from "../components/OrgCardList";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OrgList() {

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get("http://localhost:8080/org")
        .then((response) => {
          const data = response.data;

          // Check if data is an array
          if (Array.isArray(data) && data.length >= 1) {
            // Set the state with the received data
            setOrgs(data);
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
      <Link to='/org/create' className="d-flex p-4 justify-content-center">
        <button className="text-white btn btn-primary btn-lg"> 
          Create Organization 
        </button>
      </Link>
      <h2 className="text-center mt-5">Your Search Results</h2>
      <OrgCardList orgs={orgs} />
    </>
  );
}