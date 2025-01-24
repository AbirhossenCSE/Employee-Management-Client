import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProviders';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [showLogout, setShowLogout] = useState(false); 

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log('Sign out successful');
            })
            .catch(() => {
                console.log('Sign out failed');
            });
    };

    const links = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/allEmployee">All Employee</Link>
            </li>
            <li>
                <Link to="/contactUs">Contact Us</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar w-11/12 fixed z-10 bg-opacity-50 bg-green-800 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Employee</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end mr-2">
                    {user ? (
                        <div className="relative">
                            <img
                                onClick={() => setShowLogout(!showLogout)}
                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            {showLogout && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg text-black">
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
                        <Link to="/login">Sign-In</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
