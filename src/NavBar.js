import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import Context from "./Context";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(Context);
  
  return (
      <Navbar expand="md" color="dark" dark>
        <NavbarBrand tag={Link} to="/">Jobly</NavbarBrand>

        <Nav className="ml-auto" navbar>
          {currentUser ? (
            <>
              <NavItem className="nav-item">
                <NavLink to="/companies" className="nav-link">
                  Companies
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/jobs" className="nav-link">
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/" onClick={() => logout()} className="nav-link">
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Log In
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
  );
}

export default NavBar;
