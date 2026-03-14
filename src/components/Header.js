import React from 'react';
import { useFirebase } from '../context/FirebaseContext';

const Header = () => {
  const { user } = useFirebase();
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>Welcome, {user?.email?.split('@')[0] || 'Admin'}</h2>
      </div>
      <div className="header-right">
        <span className="date">{currentDate}</span>
      </div>
    </header>
  );
};

export default Header;