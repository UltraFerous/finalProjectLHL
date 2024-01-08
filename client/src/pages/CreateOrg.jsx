import { useState } from "react";
import axios from "axios";
// INSERT INTO organizations (name, description, website, user_id, image) VALUES

export default function CreateOrg() {
    const [data, setData] = useState({
      name: "",
      description: "",
      website: "",
      user_id: 3,
      image: "",
    });
  
    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      });
      console.log(data);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        name: data.name,
        description: data.description,
        website: data.website,
        user_id: 3,
        image: data.image,
      };
      console.log("Sumbitted:", userData);
      axios.post("/api/org", userData).then((response) => {
        console.log(response.status, response.data.token);
      });
    };

  return (
    <>
      <h1>Create New Organization Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
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
        <label htmlFor="website">
          Website
          <input
            type="text"
            name="website"
            value={data.website}
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
        <button type="submit">Create Org</button>
      </form>
    </>
  );
}