import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//   INSERT INTO projects (name, description, status, organization_id, image) VALUES

export default function CreateProject() {
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      name: data.name,
      description: data.description,
      status: 1,
      organization_id: user.organization_id,
      image: data.image,
    };
    console.log("Sumbitted:", projectData);
    axios.post("/api/projects", projectData).then((response) => {
      console.log(response.status, response.data.token);
    });
  };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Create New Project Page</h1>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center mb-4"
      >
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="text-white mt-4">
          Create Project
        </Button>
      </Form>
    </div>
  );
}
