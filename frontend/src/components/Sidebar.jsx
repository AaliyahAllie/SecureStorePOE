import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      onClose?.();
    }
  };

  return (
    <>
      {open && window.innerWidth <= 768 && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 'calc(var(--z-sidebar) - 1)',
          }}
        />
      )}
      <aside className={`app-sidebar ${open ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={handleLinkClick}
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/pending-payments"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={handleLinkClick}
          >
            ⏳ Pending Payments
          </NavLink>
          <NavLink
            to="/verified-payments"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={handleLinkClick}
          >
            ✓ Verified Payments
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
