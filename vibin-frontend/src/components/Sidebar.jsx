import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaPlusCircle,
  FaSignInAlt,
  FaHashtag,
  FaUsers,
} from 'react-icons/fa';

const Sidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-2 py-1 ${
      isActive ? 'text-green-600 font-semibold' : 'text-gray-700'
    } hover:text-black`;

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between px-4 py-6 fixed">
      <div>
        <h1 className="text-2xl font-bold text-green-600 mb-10">Vibin</h1>

        <nav className="flex flex-col gap-6">
          <NavLink to="/" className={navLinkClasses}>
            <FaHome /> <span>Home</span>
          </NavLink>

          <NavLink to="/profile/me" className={navLinkClasses}>
            <FaUser /> <span>My Profile</span>
          </NavLink>

          <NavLink to="/login" className={navLinkClasses}>
            <FaSignInAlt /> <span>Login</span>
          </NavLink>

          <NavLink to="/profile/:userId" className={navLinkClasses}>
            <FaUsers /> <span>User Profile</span>
          </NavLink>

          <NavLink to="/loopsta" className={navLinkClasses}>
            <FaHashtag /> <span>LoopSta</span>
          </NavLink>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white gap-2 px-4 py-2 rounded-xl cursor-pointer transition-colors duration-200">
          <FaPlusCircle className="text-lg" />
          <div>Create Post</div>
        </div>

        <div className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer transition-colors duration-200">
          <FaSignOutAlt className="text-lg" />
          <div>Logout</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
