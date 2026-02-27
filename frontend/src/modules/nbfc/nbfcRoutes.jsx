import React, { useState } from 'react';
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Products from './pages/Products';
import Applications from './pages/Applications';
import './styles.css';

const routeMeta = {
    '/nbfc': { title: 'Dashboard', subtitle: 'Operational snapshot for NBFC performance' },
    '/nbfc/register': { title: 'Registration', subtitle: 'NBFC onboarding and compliance details' },
    '/nbfc/products': { title: 'Loan Products', subtitle: 'Configure products, pricing and eligibility rules' },
    '/nbfc/applications': { title: 'Applications', subtitle: 'Approve or reject incoming loan requests' },
};

const NBFCLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const currentMeta = routeMeta[pathname] || routeMeta['/nbfc'];

    return (
        <div className="nbfc-shell">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="nbfc-main">
                <header className="nbfc-header">
                    <div className="nbfc-header-left">
                        <img src="/images/image.png" alt="CreditU" className="nbfc-header-logo" />
                        <div>
                        <h1 className="nbfc-header-title">{currentMeta.title}</h1>
                        <p className="nbfc-header-subtitle">{currentMeta.subtitle}</p>
                        </div>
                    </div>
                    <button className="nbfc-mobile-menu-btn" onClick={() => setSidebarOpen((prev) => !prev)}>
                        Menu
                    </button>
                </header>

                <section className="nbfc-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>
        </div>
    );
};

export const nbfcRoutes = (
    <Route path="/nbfc" element={<NBFCLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<Products />} />
        <Route path="applications" element={<Applications />} />
        <Route path="*" element={<Navigate to="/nbfc" replace />} />
    </Route>
);
