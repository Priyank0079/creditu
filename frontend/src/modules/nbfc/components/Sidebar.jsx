import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
    { to: '/nbfc', label: 'Dashboard' },
    { to: '/nbfc/view', label: 'View' },
    { to: '/nbfc/products', label: 'Products' },
    { to: '/nbfc/applications', label: 'Applications' },
];

const Sidebar = ({ open, onClose }) => {
    return (
        <aside className={`nbfc-sidebar ${open ? 'open' : ''}`}>
            <div className="nbfc-sidebar-brand-wrap">
                <span className="nbfc-sidebar-brand">NBFC Portal</span>
            </div>
            <nav className="nbfc-sidebar-nav" aria-label="NBFC primary navigation">
                {links.map((item) => (
                    <motion.div key={item.to} whileHover={{ x: 2 }}>
                        <NavLink
                            to={item.to}
                            end={item.to === '/nbfc'}
                            className={({ isActive }) => `nbfc-nav-link ${isActive ? 'active' : ''}`}
                            onClick={onClose}
                        >
                            {item.label}
                        </NavLink>
                    </motion.div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
