import { Link } from "react-router-dom";

export default function DeveloperList() {
  return (
    <>
      <h1>Developer List Page</h1>
      <h2>Developer Search Results</h2>
      <Link to='/users/1'>Developer 1</Link>
      <br/>
      <Link to='/users/2'>Developer 2</Link>
    </>
  );
}