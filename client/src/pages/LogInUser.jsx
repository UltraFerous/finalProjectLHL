import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function LogInUser() {
  const { updateCurrentUser, fetchMessages } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/users/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data;
          updateCurrentUser(userData);
          fetchMessages();
          // Redirect to the home page
          navigate("/");
        } else {
          // Handle unsuccessful login
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
      });
  };

  const handleDemoClick = (demoCredentials) => {
    
    axios
      .post(
        "http://localhost:8080/api/users/login", demoCredentials,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data;
          updateCurrentUser(userData);
          fetchMessages();
          // Redirect to the home page
          navigate("/");
        } else {
          // Handle unsuccessful login
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
      });
  };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Sign In</h1>
      <Form
        onSubmit={onSubmit}
        className="d-flex flex-column align-items-center mb-4"
      >
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="text-white mt-3 mb-5"
        >
          Sign in
        </Button>
      </Form>

      <Form
        onSubmit={handleDemoClick}
        className="d-flex flex-row justify-content-center mt-4"
      >
        <Button
          type="button"
          variant="primary"
          className="ms-2 text-white mx-2"
          onClick={() =>
            handleDemoClick({
              username: "john_doe",
              password: "password",
            })
          }
        >
          Demo Developer Log In
        </Button>

        <Button
          type="button"
          variant="primary"
          className="ms-2 text-white mx-2"
          onClick={() =>
            handleDemoClick({
              username: "emma_smith",
              password: "password",
            })
          }
        >
          Demo Org Admin Log In
        </Button>
      </Form>
    </div>
  );
}
