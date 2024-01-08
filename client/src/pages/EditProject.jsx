import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditProject() {
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    status: 1,
    organization_id: 0
  });

  const handleChange = (e) => {
    let  value = e.target.value;
    // Have to convert to number since status is a number and HTML returns a string from the dropdown
    if(e.target.name === "status"){
      value = Number(e.target.value);
    }
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: id, 
      name: data.name,
      description: data.description,
      status: data.status,
      organization_id: data.organization_id,
      image: data.image,
    };
    console.log("Sumbitted:", userData);
    axios.patch(`http://localhost:8080/api/projects/${id}`, userData).then((response) => {
      console.log(response.status, response.data.token);
    });
  };

  useEffect(() => {
    const fetchProjectDetails = () => {
      axios
        .get(`http://localhost:8080/projects/${id}/details`)
        .then((response) => {
          const recivedProject = response.data[0][0]
          setData({
            ...data,
            name: recivedProject.name,
            description: recivedProject.description,
            status: recivedProject.status,
            image: recivedProject.image,
            organization_id: recivedProject.organization_id
          });
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
        });
    };
    fetchProjectDetails();
  }, [id]);

  return (
    <>
      <h1>Edit Project Page</h1>
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
        <label htmlFor="status">
          Status
          <select value={data.status} name="status" onChange={handleChange} type="integer">
            <option value="0">Closed</option>
            <option value="1">Open</option>
            <option value="2">In-Progess</option>
          </select>
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