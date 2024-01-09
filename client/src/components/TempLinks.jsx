import { NavLink } from 'react-router-dom'

export default function TempLinks() {
  return (
    <nav>
      <h2>Temporary Links Component</h2>
      <p>Project & developer data cards are all links, so use those to go to details pages (from Home Page)</p>
      <ul>
        <li><NavLink to='/projects'>Project List</NavLink></li>
        <li><NavLink to='/developers'>Developer List</NavLink></li>
        <li><NavLink to='/projects/create'>Create New Project</NavLink></li>
        <li><NavLink to='/projects/2/apply'>Application Form for Project #2</NavLink></li>
        <li><NavLink to='/projects/1/apply'>Application Form for Project #1</NavLink></li>
        <li><NavLink to='/projects/2/edit'>Edit Project #2</NavLink></li>
        <li><NavLink to='/projects/3/edit'>Edit Project #3</NavLink></li>
        <li><NavLink to='/users/1'>User #1 Profile</NavLink></li>
        <li><NavLink to='/users/3'>User #3 Profile</NavLink></li>
        <li><NavLink to='/org/1'>Org #1 Profile</NavLink></li>
        <li><NavLink to='/org/3'>Org #3 Profile</NavLink></li>
        <li><NavLink to='/org/create'>Create New Org</NavLink></li>
      </ul>
    </nav>
  );
}