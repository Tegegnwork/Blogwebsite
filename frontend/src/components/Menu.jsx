import React from 'react';
import './Menu.css';

const Menu = () => {
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊', link: '/dashboard' },
    { id: 2, name: 'Profile', icon: '👤', link: '/profile' },
    { id: 3, name: 'Settings', icon: '⚙️', link: '/settings' },
    { id: 4, name: 'Messages', icon: '💬', link: '/messages' },
    { id: 5, name: 'Analytics', icon: '📈', link: '/analytics' },
  ];

  return (
    <div className="menu">
      <h3 className="menu-title">Main Menu</h3>
      <ul className="menu-list">
        {menuItems.map(item => (
          <li key={item.id} className="menu-item">
            <a href={item.link} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;