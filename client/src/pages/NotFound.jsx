import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <div className="mt-5 text-center">
      <h2 className="mb-5">Our apologies!<br/>The page you are looking for is not available</h2>
      <Link to='/' className="text-decoration-none fs-5">Please head back over to the home page</Link>
    </div>
  );
}