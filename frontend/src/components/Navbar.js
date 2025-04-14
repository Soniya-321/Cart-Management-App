import React, { useState } from 'react';
import './Navbar.css'; // optional for styling
import { IoIosSearch, IoIosNotificationsOutline, IoIosArrowDown,IoIosLogOut } from "react-icons/io";
import { LuMessageSquareText } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const username = localStorage.getItem('username') || '';
  const initial = username.charAt(0).toUpperCase();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // redirect after logout
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 py-2 d-flex justify-content-between align-items-center fixed">
      {/* Logo */}
      <div className="navbar-brand fw-bold text-white">
        <img src='https://res.cloudinary.com/dzsrw1tcr/image/upload/v1744439449/fastcart_logo_ym24eh.png' alt='logo' width={'150px'}/>
      </div>

      {/* Search - visible only on md+ screens */}
      <div className="d-none d-md-flex align-items-center flex-grow-1 mx-3 bg-dark">
        <IoIosSearch className="d-none d-md-block text-white fs-5" />
        <input
          type="search"
          className="form-control bg-dark text-white border-0"
          placeholder="Search..."
          style={{ maxWidth: '400px', color: 'white' }}
        />
      </div>

      {/* Right icons section */}
      <div className="d-flex align-items-center gap-3">
        {/* Search icon - visible on small screens */}
        <IoIosSearch className="d-md-none text-white fs-5" />

        {/* Message and Notification icons */}
        <LuMessageSquareText className="text-white fs-5" />
        <IoIosNotificationsOutline className="text-white fs-5" />

        {/* Profile icon & dropdown */}
        <div className="position-relative">
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2"
              style={{ width: '35px', height: '35px' }}
            >
              {initial}
            </div>

            {/* Username - only on md+ */}
            <span className="d-none d-md-block text-white fw-medium me-1">
              {username}
            </span>
            {/* Dropdown icon - only on md+ */}
            <IoIosArrowDown className="d-none d-md-block text-white mt-1 ml-5"  />

            <i className="bi bi-chevron-down text-white d-none d-md-block"></i>
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div
              className="position-absolute end-0 mt-2 bg-white shadow rounded py-2"
              style={{ minWidth: '150px', zIndex: 1000 }}
            >
              <div className="dropdown-item text-dark fw-bold px-2 py-2">
              <IoPersonCircleSharp size={25}/> {username}
              </div>
              <hr className="my-1" />
              <div className='align-items-center d-flex my-0 mx-0 gap-2 cursor-pointer' onClick={handleLogout}>
                <IoIosLogOut size={25} color='red' style={{marginLeft: '10px'}}/>
                <button className="dropdown-item text-dark ml-3">
                    Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
