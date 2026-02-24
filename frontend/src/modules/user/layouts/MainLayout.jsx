import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import BottomNav from '../components/layout/BottomNav.jsx';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default MainLayout;
