import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <h2>This is the navigation bar</h2>
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
    </nav>
  );
}