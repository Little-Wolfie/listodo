import React from "react";
import { Link} from "react-router-dom";
import "../../css/HeaderLogo.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <div className='header-container'>
          <button
            onClick={() => {
              navigate('/create-task');
            }}
          >
            Create Task
          </button>
      <Link to='/dashboard' className="header-link">
        <div className="page-title">
          <img src="LandingPageLogo.png"/>
        </div>
      </Link>
          <button
            onClick={() => {
              navigate('/profile');
            }}
          >
            Profile
          </button>
        </div>
		  </nav>
    </header>
  );
};
  


export default Header;
