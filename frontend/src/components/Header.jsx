import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { removeCredentials } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(removeCredentials());

      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MERN Auth</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;