import React from 'react';
//import './Navbar.css'; // Import the CSS file you'll create
//add logo
//import { ReactComponent as Logo } from './logo.svg'; // Update with the path to your logo's SVG file
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Make sure react-icons is installed
import { FaCaretDown } from 'react-icons/fa';
const Navbar = () => {
    return (
        <div className="navbar container-fluid navbar-expand-lg bg-body-tertiary top-0 end-0 start-0" >
            {/*<Logo className="navbar-logo" />*/}
            <Link className="navbar-brand" to="#">
            <img src={require('../../Images/Picture2.png')} alt="logo" />
          
          </Link>
            <div className="navbar-menu">
                <div className="dropdown">
                    <Link className="dropbtn">Jobs ▼</Link>
                    {/* Dropdown content here */}
                </div>
                <div className="dropdown">
                    <Link className="dropbtn">Talent ▼</Link>
                    {/* Dropdown content here */}
                </div>
                <a href="/messages">Message</a>
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-input" />
                    <div className="search-dropdown">
                        <button className="dropbtn">
                            Talent <FaCaretDown />
                        </button>
                        <div className="dropdown-content">
                            {/* Dropdown content would go here */}
                        </div>
                    </div>
                </div>

                <div className="dropdown">
                    <Link className="dropbtn">Stats ▼</Link>
                    {/* Dropdown content  here */}
                </div>
                <Link><FaBell className="icon" /></Link>
                <Link><FaUserCircle className="icon" /></Link>
            </div>
        </div>
    );
};

export default Navbar;
