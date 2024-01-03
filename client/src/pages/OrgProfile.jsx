import { useParams } from "react-router-dom";

export default function OrgProfile() {

  const { id } = useParams();

  return (
    <>
      <h1>Organization Details Page</h1>
      <h2>Details for Organization {id}</h2>
    </>
  );
}