import { useParams } from "react-router-dom";

export default function Project() {

  const { id } = useParams();

  return (
    <>
      <h1>Project Details Page</h1>
      <h2>Details for Project {id}</h2>
    </>
  );
}