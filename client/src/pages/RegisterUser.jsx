import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function RegisterUser() {
  const { updateCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { username, password, email, city, province, country, linkedin, github, website, description } = loginData;

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
      <h1>Create an Account</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" value={username} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" value={email} onChange={onChange} />
        <label htmlFor="city">City</label>
        <input name="city" id="city" value={city} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <textarea name="password" id="password" value={password} onChange={onChange} />
        <button type="submit">Register</button>
      </form>
    </>
  );
}