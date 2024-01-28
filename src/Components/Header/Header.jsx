import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Navbar } from "reactstrap";
import Logo from "../../assets/logo.png";
import { userLoggedOut } from "../../features/auth/authSlice";
import "./Header.css";

const Header = () => {
  const { userId } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let links = null;
  if (!userId) {
    links = (
      <>
        <NavItem>
          <NavLink to="/login" className="NavLink">
            Login
          </NavLink>
        </NavItem>
      </>
    );
  } else {
    links = (
      <>
        <NavItem>
          <NavLink to="/" className="NavLink">
            Burger Builder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/orders" className="NavLink">
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/logout"
            className="NavLink"
            onClick={() => dispatch(userLoggedOut())}
          >
            Logout
          </NavLink>
        </NavItem>
      </>
    );
  }
  return (
    <div className="Navigation">
      <Navbar className="brand-bg align-items-center">
        <NavLink to="/">
          <img src={Logo} alt="Logo" width="80px" />
        </NavLink>
        <Nav className="mr-md-5">{links}</Nav>
      </Navbar>
    </div>
  );
};

export default Header;
