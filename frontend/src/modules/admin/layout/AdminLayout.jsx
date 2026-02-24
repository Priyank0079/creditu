import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import '../styles/admin.css';

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="admin-layout">
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <main
                className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}
                style={{ transition: 'margin-left 0.28s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <AdminTopbar
                    onMenuToggle={() => {
                        // On mobile open drawer; on desktop toggle collapse
                        if (window.innerWidth < 768) {
                            setMobileOpen(prev => !prev);
                        } else {
                            setCollapsed(prev => !prev);
                        }
                    }}
                />
                <div className="admin-content admin-scrollbar">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
