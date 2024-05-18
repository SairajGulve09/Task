import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom'

function Navbar() {
  // State variables
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  const { isLoggedIn, LogoutUser } = useAuth();

  // Update the loggedIn state when the isLoggedIn value changes
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  // Handle logout
  const handleLogout = () => {
    LogoutUser();
    navigate('/login');
  };

  // JSX code for the navbar
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <Link to="/" className="mr-4">
              <img src='/' alt="Logo" className="h-16 w-16" />
            </Link>
            <Link to="/" className="text-white mr-4">Homepage</Link>
            <Link to="/pricing" className="text-white mr-4">Pricing</Link>
            {/* Add other links here */}
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative text-gray-400 focus-within:text-gray-500">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input id="search" className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm" placeholder="Search" type="search" name="search" />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          {loggedIn ? (
            <div className="relative inline-block text-left">
              <button
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Menu
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 010-1.414zM5 11a1 1 0 100 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
                </svg>
              </button>
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to="/profile-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
