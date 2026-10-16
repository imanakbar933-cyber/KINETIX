import React, { useState } from 'react';
import './Navbar6.css';
import { 
    FaSearch, 
    FaDumbbell, // Gym ka dumbbell icon
    FaUser     // Profile icon
} from 'react-icons/fa';

const Navbar6 = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log('Searching for:', e.target.value);
    };

    return (
        <nav className="gym-navbar">
            {/* --- Left: Logo + Search --- */}
            <div className="navbar-left">
                {/* Logo */}
                <div className="logo">
                    <FaDumbbell className="logo-icon" />
                    IRON<span style={{ color: '#ff3c00' }}>FIT</span>
                </div>

                {/* Search Bar */}
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search classes, trainers..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* --- Right: Links + Profile + Join Button --- */}
            <div className="navbar-right">
                <ul className="nav-links">
                    <li><a href="#home" className="active">Home</a></li>
                    <li><a href="#classes">Classes</a></li>
                    <li><a href="#trainers">Trainers</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                </ul>

                {/* Profile Icon */}
                <div className="profile-wrapper">
                    <FaUser className="profile-icon" />
                </div>

                {/* Join Now CTA Button */}
                <button className="join-btn">Join Now</button>
            </div>
        </nav>
    );
};

export default Navbar6;