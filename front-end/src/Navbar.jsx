import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/formsignup">Form</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;