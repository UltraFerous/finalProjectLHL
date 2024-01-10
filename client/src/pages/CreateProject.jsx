import { useState } from "react";
import axios from "axios";
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
      [e.target.name]: value
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
    <>
      <h1>Create New Project Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Project</button>
      </form>
    </>
  );
}