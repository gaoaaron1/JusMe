import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the mobile menu
    };

    // Function to close mobile menu after clicking a menu item
    const handleMenuItemClick = (menuItem) => {
        setMenu(menuItem);       // Set the current menu item
        setIsMobileMenuOpen(false); // Close the mobile menu
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>JUSME</p>
            </div>

            {/* Hamburger Icon for mobile */}
            <div className="hamburger" onClick={toggleMobileMenu}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>

            {/* Menu items */}
            <ul className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <li onClick={() => handleMenuItemClick("shop")}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("mens")}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Mens</Link>
                    {menu === "mens" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("womens")}>
                    <Link style={{ textDecoration: 'none' }} to='/womens'>Womens</Link>
                    {menu === "womens" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("kids")}>
                    <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
                    {menu === "kids" && <hr />}
                </li>

                
            </ul>

            {/* Cart and Login */}
            <div className="nav-login-cart">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/cart">
                    <img src={cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
