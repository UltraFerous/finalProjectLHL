import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrgProfile() {

  const { id } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const fetchOrgDetails = () => {
      axios.get(`http://localhost:8080/org/${id}`)
        .then((response) => {
          const data = response.data;
          setOrg(data);
        })
        .catch((error) => {
          console.error('Error fetching project details:', error);
        });
    };

    fetchOrgDetails();
  }, [id])

  return (
    <>
      <h1>{org && org[0].name}</h1>
      <h1>Organization Details Page</h1>
      <h2>Details for Organization {id}</h2>
    </>
  );
}