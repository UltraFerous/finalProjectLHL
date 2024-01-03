import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <h3>This is the navigation bar within the header component</h3>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/users/login'>Log In</NavLink></li>
        <li><NavLink to='/users/register'>Sign Up</NavLink></li>
      </ul>
    </nav>
  );
}