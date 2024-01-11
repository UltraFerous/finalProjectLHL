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

  const [projectTags, setProjectTags] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleCheckboxChange = (tags) => {
    setProjectTags((prevTags) => {
      // Add new tags without duplicates
      return [...new Set([...prevTags, ...tags])];
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
      tags: projectTags,
    };
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
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            style={{ width: '28em' }}
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={data.description}
            onChange={handleChange}
            style={{ width: '28em' }}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
            style={{ width: '28em' }}
          />
        </Form.Group>
        <div className="mb-4 mt-4 ms-5 ps-4">
              <p>What kind of project is it? Check all that apply.
              </p>
              <Form.Check
                type="checkbox"
                label="Basic website"
                id="3"
                onChange={() => handleCheckboxChange([3])}
              />
              <Form.Check
                type="checkbox"
                label="Web application"
                id="1"
                onChange={() => handleCheckboxChange([1, 7, 2, 4, 5])}
              />
              <Form.Check
                type="checkbox"
                label="Do you need to store data? (Products, Customers, Blog posts, etc)"
                id="6"
                onChange={() => handleCheckboxChange([6, 5, 2])}
              />
              <Form.Check
                type="checkbox"
                label="Do you need user login capability?"
                id="9"
                onChange={() => handleCheckboxChange([8])}
              />
            </div>
        <Button type="submit" className="text-white mt-4">
          Create Project
        </Button>
      </Form>
    </div>
  );
}
