import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">MyApp</div>
        <div className="navbar-links">
          <Link to="/addFamily" className="nav-link">
            AddFamily
          </Link>
          <Link to="/payment" className="nav-link">
            payment
          </Link>

          <Link to="/Register" className="nav-link">
            Register
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/" className="nav-link">
            Logins  
            {/* inne sample baranch 2 eke */}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
