import React from "react";
import { Link} from "react-router-dom";
import "../../css/HeaderLogo.css";
const Header = () => {
  return (
    <Link to='/dashboard' className="header-link">
      <header className="page-title">
        <h1 className="header-logo">Logo</h1>
      </header>
    </Link>
  );
};
  


export default Header;
