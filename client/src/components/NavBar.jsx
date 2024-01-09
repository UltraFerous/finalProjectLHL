import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function NavBar() {
  const { updateCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/users/logout", {}, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        updateCurrentUser(null);
        // Redirect to the home page
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error.message);
    });
  }

  return (
    <nav>
      <h3>This is the navigation bar within the header component</h3>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/users/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/users/register">Sign Up</NavLink>
        </li>
        <button onClick={logoutUser}>Log Out</button>
        <button>Profile</button>
      </ul>
    </nav>
  );
}
