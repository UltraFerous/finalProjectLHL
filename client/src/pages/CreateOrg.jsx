import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// INSERT INTO organizations (name, description, website, user_id, image) VALUES

export default function CreateOrg() {
  const { user } = useContext(UserContext);
    const [data, setData] = useState({
      name: "",
      description: "",
      website: "",
      image: "",
    });
  
    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        name: data.name,
        description: data.description,
        website: data.website,
        user_id: user.id,
        image: data.image,
      };
      console.log("Sumbitted:", userData);
      axios.post("/api/org", userData).then((response) => {
        console.log(response.status, response.data.token);
      });
    };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Create New Organization</h1>
      <Form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center mb-4"
      >
        <Form.Group controlId="name" style={{ width: '450px' }}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description" style={{ width: '450px' }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="website" style={{ width: '450px' }}>
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            name="website"
            value={data.website}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image" style={{ width: '450px' }} className="mb-5">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="text-white">Create Organization</Button>
      </Form>
    </div>
  );
}