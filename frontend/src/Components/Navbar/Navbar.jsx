import React, { useState } from 'react';
import './Navbar.css'; // Import CSS
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Navbar = () => {
  //======================== USE STATES ========================//

  const [menu, setMenu] = useState("shop");
  const [expanded, setExpanded] = useState(true); // Manage sidebar state
  const [openDropdown, setOpenDropdown] = useState(null); // State for dropdown

  //======================== DECLARATIVE ========================//

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
};

  const scrollToElement = (targetId, offset = 50) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setExpanded(false); // Collapse sidebar after navigation
    }
  };

  // Menu items from Navbar2
  const menuItems = [
    { name: "Shop", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Categories", subItems: [
        { name: "Mens", path: "/mens" },
        { name: "Womens", path: "/womens" },
        { name: "Kids", path: "/kids" }
      ]
    }
  ];

  return (
    <div className="sidebar2-container">
      {/* Top Vertical Sidebar */}
      <nav
        id="sidebar2"
        className={`sidebar2 ${expanded ? 'expanded' : ''}`}
      >
        <ul className="nav-grid">


            <div className="nav-logo">
                    <img src={logo} alt="Logo" />
                    <p>JUSME</p>
            </div>

            <ul className={`nav-menu`}>
                <li onClick={() => handleMenuItemClick("shop")}>
                    <Link to="/">Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("about")}>
                    <Link to="/about">About</Link>
                    {menu === "about" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("contact")}>
                    <Link to="/contact">Contact</Link>
                    {menu === "contact" && <hr />}
                </li>
                <li className="dropdown" onClick={() => toggleDropdown("categories")}>
                    <Link to="#">Categories
                        <svg
                            className={`arrow ${openDropdown === "categories" ? "open" : ""}`}
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                        >
                            <path d="M0 0l6 8 6-8H0z" fill="white" />
                        </svg>
                    </Link>
                    {openDropdown === "categories" && (
                        <ul className="dropdown-menu">
                            <li><Link to="/mens">Mens</Link></li>
                            <li><Link to="/womens">Womens</Link></li>
                            <li><Link to="/kids">Kids</Link></li>
                        </ul>
                    )}
                </li>
            </ul>

        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        style={{ top: expanded ? '175px' : '10px' }}
        onClick={toggleSidebar}
      >
        <span id="arrow-icon">{expanded ? '▲' : '▼'}</span>
      </button>
    </div>
  );
};

export default Navbar;
