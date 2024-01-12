import { useState, useEffect, useContext } from "react"
import OrgCardList from "../components/OrgCardList";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function OrgList() {
  const { user } = useContext(UserContext);
  const [orgs, setOrgs] = useState([]);
  const location = useLocation();
  // conditional endpoint for regular organizations page and search results page
  const endpoint = location.pathname.startsWith("/org/search")
    ? `http://localhost:8080${location.pathname}`
    : "http://localhost:8080/org";

  useEffect(() => {
    const fetchCardDetails = () => {
      axios
        .get(endpoint)
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
  }, [endpoint]);

  return (
    <>
      <Container>
        {user && user.organization_id === undefined &&
          <Link to='/org/create' className="d-flex p-4 justify-content-center">
            <button className="text-white btn btn-primary btn-lg">
              Create Organization
            </button>
          </Link>
        }
        <h2 className="text-center mt-5">Your Search Results</h2>
        <OrgCardList orgs={orgs} />
      </Container>
    </>
  );
}