import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "./Button";
import Logo from "./Logo";

function Navbar() {
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Logo />
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Om os
            </NavLink>
          </li>
          <li className="spacer">/</li>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Log på
            </NavLink>
          </li>
          <li className="spacer">/</li>
          <li>
            <Button>Opret dig</Button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
