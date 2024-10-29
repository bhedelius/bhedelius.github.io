import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <header className="Navbar">
            <div className="logo">
                <h1>Bryce Hedelius</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/project">Projects</Link></li>
                    <li><Link to="/resume">Resume</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
