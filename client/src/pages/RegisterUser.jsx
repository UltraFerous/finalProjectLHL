import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RegisterUser() {
  const { updateCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [developerTags, setDeveloperTags] = useState([]);

  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    email: "",
    admin: true,
    city: "",
    province: "",
    country: "",
    image: "",
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
    image,
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

  const handleCheckboxChange = (tag) => {
    setDeveloperTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // If it's checked, remove it
        return prevTags.filter((t) => t !== tag);
      } else {
        // If it's unchecked, add it
        return [...prevTags, tag];
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Add developerTags to the registrationData
    setRegistrationData((prevData) => ({
      ...prevData,
      developerTags,
    }));

    axios
      .post(
        "http://localhost:8080/api/users/register",
        {
          ...registrationData,
          developerTags,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
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
    <div className="mt-5">
      <h1 className="text-center mb-4">Create an Account</h1>
      <Form
      onSubmit={onSubmit}
      className="d-flex flex-column align-items-center mb-4"
      >
        <div className="d-flex mb-3">
      <Button
        type="button"
        onClick={() => handleAdminToggle(true)}
        style={{
          backgroundColor: registrationData.admin ? "green" : "white",
          color: registrationData.admin ? "white" : "green",
          marginRight: '10px', // Adjust the margin as needed
        }}
      >
        Organization
      </Button>
      <Button
        type="button"
        onClick={() => handleAdminToggle(false)}
        style={{
          backgroundColor: !registrationData.admin ? "green" : "white",
          color: registrationData.admin ? "green" : "white",
          marginLeft: '10px', // Adjust the margin as needed
        }}
      >
        Developer
      </Button>
    </div>
        <Form.Group controlId="username" style={{ marginBottom: '20px' }}>
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" value={username} onChange={onChange} style={{ width: '450px' }} />
        </Form.Group>
        <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" value={password} onChange={onChange} type="password" style={{ width: '450px' }}/>
        </Form.Group>
        <Form.Group controlId="email" style={{ marginBottom: '20px' }}>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={email} onChange={onChange} type="email" style={{ width: '450px' }}/>
        </Form.Group>
        <Form.Group controlId="city" style={{ marginBottom: '20px' }}>
          <Form.Label>City</Form.Label>
          <Form.Control name="city" value={city} onChange={onChange} style={{ width: '450px' }}/>
        </Form.Group>
        <Form.Group controlId="province" style={{ marginBottom: '20px' }}>
          <Form.Label>Province</Form.Label>
          <Form.Control name="province" value={province} onChange={onChange} style={{ width: '450px' }}/>
        </Form.Group>
        <Form.Group controlId="country" style={{ marginBottom: '20px' }}>
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" value={country} onChange={onChange} style={{ width: '450px' }}/>
        </Form.Group>
        <Form.Group controlId="image" style={{ marginBottom: '20px' }}>
          <Form.Label>Image URL</Form.Label>
          <Form.Control name="image" value={image} onChange={onChange} style={{ width: '450px' }}/>
        </Form.Group>
        {admin !== null && !admin && (
          <>
            <Form.Group controlId="linkedin" style={{ marginBottom: '20px' }}>
              <Form.Label>LinkedIn URL</Form.Label>
              <Form.Control name="linkedin" value={linkedin} onChange={onChange} style={{ width: '450px' }}/>
            </Form.Group>
            <Form.Group controlId="github" style={{ marginBottom: '20px' }}>
              <Form.Label>Github URL</Form.Label>
              <Form.Control name="github" value={github} onChange={onChange} style={{ width: '450px' }}/>
            </Form.Group>
            <Form.Group controlId="website" style={{ marginBottom: '20px' }}>
              <Form.Label>Website URL</Form.Label>
              <Form.Control name="website" value={website} onChange={onChange} style={{ width: '450px' }}/>
            </Form.Group>
            <div className="mb-4">
              <p>What are your skills?</p>
              <Form.Check
                type="checkbox"
                label="React"
                id="1"
                onChange={() => handleCheckboxChange(1)}
              />
              <Form.Check
                type="checkbox"
                label="Ruby"
                id="2"
                onChange={() => handleCheckboxChange(2)}
              />
              <Form.Check
                type="checkbox"
                label="CSS"
                id="3"
                onChange={() => handleCheckboxChange(3)}
              />
              <Form.Check
                type="checkbox"
                label="Express"
                id="4"
                onChange={() => handleCheckboxChange(4)}
              />
              <Form.Check
                type="checkbox"
                label="Node"
                id="5"
                onChange={() => handleCheckboxChange(5)}
              />
              <Form.Check
                type="checkbox"
                label="PostgreSQL"
                id="6"
                onChange={() => handleCheckboxChange(6)}
              />
              <Form.Check
                type="checkbox"
                label="Material UI"
                id="7"
                onChange={() => handleCheckboxChange(7)}
              />
              <Form.Check
                type="checkbox"
                label="OAuth"
                id="9"
                onChange={() => handleCheckboxChange(9)}
              />
            </div>
          </>
        )}
        <Form.Group controlId="description" style={{ marginBottom: '20px' }}>
          <Form.Label>How would you describe yourself?</Form.Label>
          <Form.Control as="textarea" name="description" value={description} onChange={onChange} style={{ width: '450px' }}/>
        </Form.Group>
        <Button type="submit" variant="primary" className="text-white">Register</Button>
      </Form>
    </div>
  );
}
