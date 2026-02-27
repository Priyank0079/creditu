import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
    { to: '/nbfc', label: 'Dashboard' },
    { to: '/nbfc/register', label: 'Registration' },
    { to: '/nbfc/products', label: 'Products' },
    { to: '/nbfc/applications', label: 'Applications' },
];

const Sidebar = ({ open, onClose }) => {
    return (
        <aside className={`nbfc-sidebar ${open ? 'open' : ''}`}>
            <div className="nbfc-sidebar-brand-wrap">
                <img src="/images/image.png" alt="CreditU" className="nbfc-sidebar-logo" />
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
