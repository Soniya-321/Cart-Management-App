import React, {useState} from 'react';
import { Link} from 'react-router-dom';

import './Sidebar.css';
import {
 FaRegStar, FaRegFolder, FaRegQuestionCircle
} from 'react-icons/fa';
import { FiHome, FiSettings } from "react-icons/fi";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoPricetagOutline, IoPersonOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { BsBarChartLine } from "react-icons/bs";
import { LuMessageSquareText } from "react-icons/lu";
import { PiMedal } from "react-icons/pi";

const navSections = [
  {
    title: null,
    links: [
      { label: 'Dashboard', icon: <FiHome />, /*path: '/api/dashboard' */ },
      { label: 'Orders', icon: <TfiMenuAlt />, /*path: '/api/orders'*/ },
      { label: 'Products', icon: <IoPricetagOutline />, /*path: '/api/products' */ },
      { label: 'Categories', icon: <FaRegFolder />, path: '/api/categories' },
      { label: 'Customers', icon: <TbUsers />,/* path: '/api/customers'*/ },
      { label: 'Reports', icon: <BsBarChartLine /> , /*path: '/api/reports'*/},
      { label: 'Coupons', icon: <FaRegStar />,/* path: '/api/coupons' */},
      { label: 'Inbox', icon: <LuMessageSquareText />,/* path: '/api/inbox'*/ }
    ]
  },
  {
    title: 'Other Information',
    links: [
      { label: 'Knowledge Base', icon: <FaRegQuestionCircle />, /*path: '/api/knowledge-base'*/ },
      { label: 'Product Updates', icon: <PiMedal />,/* path: '/api/product-updates'*/ }
    ]
  },
  {
    title: 'Settings',
    links: [
      { label: 'Personal Settings', icon: <IoPersonOutline />, /*path: '/api/personal-settings' */},
      { label: 'Global Settings', icon: <FiSettings />, /*path: '/api/global-settings'*/ }
    ]
  }
];

const Sidebar = ({ isOpen, onClose }) => {
    const [activeItem, setActiveItem] = useState('Categories');  
  return (
    <div className={`sidebar d-flex flex-column ${isOpen ? 'open' : ''}`}>
      {/* Close Button for small screens */}
      <div className="sidebar-header d-flex justify-content-end p-2 d-md-none">
        <button className="btn btn-sm btn-light" onClick={onClose}>×</button>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content flex-grow-1 px-3 py-2 mt-md-3">
        {navSections.map((section, index) => (
          <div key={index} className="mb-4">
            {section.title && <div className="text-white small mb-2">{section.title}</div>}
            <ul className="nav flex-column">
            {section.links.map(({ label, icon, path }) => {
                return (
                  <li
                    key={label}
                    className={`nav-item mb-2`}
                    onClick={() => setActiveItem(label)}
                  >
                    <Link to={path}
                      className={`nav-link d-flex align-items-center gap-2 ${
                        activeItem === label ? 'active' : ''
                      }`}
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
