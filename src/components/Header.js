// Header.js
import React from 'react';
import './Header.css'; // Import custom styles (optional)

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Bryce Hedelius</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
