import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, FaBox, FaShoppingBag, FaUsers, 
  FaTags, FaStar, FaCog, FaSignOutAlt, FaList 
} from 'react-icons/fa';
import { useFirebase } from '../context/FirebaseContext';
import '../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useFirebase();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/products', name: 'Products', icon: <FaBox /> },
    { path: '/orders', name: 'Orders', icon: <FaShoppingBag /> },
    { path: '/users', name: 'Users', icon: <FaUsers /> },
    { path: '/categories', name: 'Categories', icon: <FaTags /> },
    { path: '/subcategories', name: 'Sub Categories', icon: <FaList /> }, // New
    { path: '/reviews', name: 'Reviews', icon: <FaStar /> },
    { path: '/settings', name: 'Settings', icon: <FaCog /> }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;