import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to control navbar expansion

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen); // Toggle navbar visibility
  };

  return (
    <div className={`navbar-container`}>
      <button className="navbar-toggle-button" onClick={toggleNavbar}>
        <svg
          className={`arrow ${isNavbarOpen ? 'open' : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 16l-8-8h16z" fill="white" />
        </svg>
      </button>

      <div className={`navbar ${isNavbarOpen ? 'expanded' : ''}`}>
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <p>JUSME</p>
        </div>

        <ul className="nav-menu">
          <li>
            <Link to="/" onClick={toggleNavbar}>Shop</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNavbar}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
          </li>
          <li className="dropdown">
            <span>Categories</span>
            <ul className="dropdown-menu">
              <li><Link to="/mens" onClick={toggleNavbar}>Mens</Link></li>
              <li><Link to="/womens" onClick={toggleNavbar}>Womens</Link></li>
              <li><Link to="/kids" onClick={toggleNavbar}>Kids</Link></li>
            </ul>
          </li>
        </ul>

        <div className="nav-login-cart">
          <Link to="/cart">
            <button className="cart-icon-button">
              <img src={cart_icon} alt="Cart" />
            </button>
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
