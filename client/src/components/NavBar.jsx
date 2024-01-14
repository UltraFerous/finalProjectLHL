import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import appLogo from "../images/good-dev-logo-white.png";

export default function NavBar() {
  const { updateCurrentUser, user, userLoaded, newMessageCount } =
    useContext(UserContext);

  const navigate = useNavigate();

  const logoutUser = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          // Clear user info from local storage
          localStorage.removeItem("user");

          // Update user state
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
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
            <img src={appLogo} width="70" alt="Good Dev Logo" />
          </NavLink>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/projects">
            Projects
          </Nav.Link>
          <Nav.Link as={NavLink} to="/developers">
            Developers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/org">
            Organizations
          </Nav.Link>
          {/* Ideally, the Profile is beside the Log Out button
          and is a photo of the user */}
          {user && (
            <Nav.Link as={NavLink} to={`/users/${user.id}`}>
              Profile
            </Nav.Link>
          )}
        </Nav>
        {user && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className="text-white mx-2"
            />

            {newMessageCount > 0 && (
              <Badge
                pill
                bg="danger"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "2px",
                  fontSize: "0.6rem",
                }}
              >
                {newMessageCount}
              </Badge>
            )}
          </div>
        )}
        <Nav>
          {!user && (
            <Button as={NavLink} to="/users/login" variant="outline-light">
              Log In
            </Button>
          )}
          {!user && (
            <Button
              as={NavLink}
              to="/users/register"
              variant="outline-light"
              className="ms-3"
            >
              Sign Up
            </Button>
          )}
          {user && (
            <Button
              onClick={logoutUser}
              variant="outline-light"
              className="ms-3"
            >
              Log Out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
