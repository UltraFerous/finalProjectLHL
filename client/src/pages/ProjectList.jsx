import { Link } from "react-router-dom";

export default function ProjectList() {
  return (
    <>
      <h1>Project List Page</h1>
      <h2>Project Search Results</h2>
      <Link to='/projects/1'>Project 1</Link>
      <br/>
      <Link to='/projects/2'>Project 2</Link>
    </>
  );
}
