import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function LogInUser() {
  const { updateCurrentUser } = useContext(UserContext);
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

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/users/login", {
      username,
      password,
    }, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        const userData = response.data;
        updateCurrentUser(userData);
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
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" value={username} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
}
