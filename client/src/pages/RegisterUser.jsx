import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function RegisterUser() {
  const { updateCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    email: "",
    admin: true,
    city: "",
    province: "",
    country: "",
    linkedin: "",
    github: "",
    website: "",
    description: "",
  });

  const {
    username,
    password,
    email,
    admin,
    city,
    province,
    country,
    linkedin,
    github,
    website,
    description,
  } = registrationData;

  const onChange = (e) => {
    setRegistrationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAdminToggle = (admin) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      admin,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/users/register",
        {
          registrationData,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data;
          updateCurrentUser(userData);
          // Redirect to the home page
          navigate("/");
        } else {
          // Handle unsuccessful login
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
      });
  };

  return (
    <>
      <h1>Create an Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <h3>User Type</h3>
          <button
            type="button"
            onClick={() => handleAdminToggle(true)}
            style={{
              backgroundColor: registrationData.admin ? "green" : "white",
            }}
          >
            Organization
          </button>
          <button
            type="button"
            onClick={() => handleAdminToggle(false)}
            style={{
              backgroundColor: !registrationData.admin ? "green" : "white",
            }}
          >
            Developer
          </button>
        </div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={onChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          value={password}
          onChange={onChange}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="city">City</label>
        <input name="city" id="city" value={city} onChange={onChange} />
        <label htmlFor="province">Province</label>
        <input
          name="province"
          id="province"
          value={province}
          onChange={onChange}
        />
        <label htmlFor="country">Country</label>
        <input
          name="country"
          id="country"
          value={country}
          onChange={onChange}
        />
        {admin !== null && !admin && (
          <>
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              name="linkedin"
              id="linkedin"
              value={linkedin}
              onChange={onChange}
            />
            <label htmlFor="github">Github URL</label>
            <input
              name="github"
              id="github"
              value={github}
              onChange={onChange}
            />
            <label htmlFor="website">Website URL</label>
            <input
              name="website"
              id="website"
              value={website}
              onChange={onChange}
            />
          </>
        )}
        <label htmlFor="description">About You</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
