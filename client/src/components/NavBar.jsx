import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import appLogo from '../images/good-dev-logo-white.png';

export default function NavBar() {
  return (
    <Navbar
      bg="primary"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="#home">
          <NavLink to="/">
            <img
              src={appLogo}
              width="70"
              alt="Good Dev Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/projects">
            Projects
          </Nav.Link>
          <Nav.Link as={NavLink} to="/developers">
            Developers
          </Nav.Link>
        </Nav>
        <Nav>
          <Button
            as={NavLink}
            to="/users/login"
            variant="outline-light"
          >
            Log In
          </Button>
          <Button
            as={NavLink}
            to="/users/register"
            variant="outline-light"
            className="ms-3"
          >
            Register
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}