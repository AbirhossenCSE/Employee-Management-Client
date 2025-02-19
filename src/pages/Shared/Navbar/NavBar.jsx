import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProviders';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import logo from '../../../assets/logo/logo.jpg';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [showLogout, setShowLogout] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const handleSignOut = () => {
        logOut()
            .then(() => console.log('Sign out successful'))
            .catch(() => console.log('Sign out failed'));
    };

    // Navigation Links with Active Styling
    const navLinks = (
        <>
            {[
                { path: "/", label: "Home" },
                { path: "/allEmployee", label: "All Employees" },
                { path: "/aboutUs", label: "About Us" },
                { path: "/contactUs", label: "Contact Us" },
                { path: "/dashboard", label: "Dashboard" },
            ].map((link) => (
                <li key={link.path}>
                    <Link
                        to={link.path}
                        className={`px-3 py-1 rounded-md transition duration-200 ${location.pathname === link.path
                                ? "text-white  bg-orange-400"
                                : "hover:text-black"
                            }`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-base-300 bg-opacity-90 text-black shadow-md">
            <div className="max-w-8xl mx-auto flex items-center justify-between px-6 lg:px-12 py-3">

                {/* Logo Section */}
                <Link to="/" className="flex ml-5 items-center gap-2">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <span className="text-2xl font-bold">
                        Smart<span className="text-orange-500">Employee</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex space-x-6 font-medium">{navLinks}</ul>

                {/* User Profile or Sign In */}
                <div className="flex mr-5 items-center space-x-4">
                    {user ? (
                        <div className="relative">
                            <img
                                onClick={() => setShowLogout(!showLogout)}
                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                            />
                            {showLogout && (
                                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg text-black">
                                    <button
                                        onClick={handleSignOut}
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="text-black font-semibold border px-4 py-1 rounded-md hover:bg-white hover:text-green-800 transition">
                            Sign In
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <IoMdClose size={26} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-base-300 shadow-lg transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-lg font-bold">Menu</span>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <IoMdClose size={26} />
                    </button>
                </div>
                <ul className="flex flex-col space-y-4 p-4">{navLinks}</ul>
            </div>
        </nav>
    );
};

export default NavBar;


