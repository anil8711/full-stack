// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-6">
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="block px-2 py-1 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="block px-2 py-1 hover:bg-gray-700 rounded">
              Users
            </Link>
          </li>

          <li>
            <Link to="/admin/products" className="block px-2 py-1 hover:bg-gray-700 rounded">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="block px-2 py-1 hover:bg-gray-700 rounded">
              Settings
            </Link>
            <Link to="/admin/contact
            " className="block px-2 py-1 hover:bg-gray-700 rounded">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
