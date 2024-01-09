import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <>
      <h1>Our apologies, the page you are looking for is not available</h1>
      <Link to='/'>Please head back over to the home page</Link>
    </>
  );
}