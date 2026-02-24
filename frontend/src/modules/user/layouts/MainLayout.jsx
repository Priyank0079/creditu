import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Light Effects */}
            <div className="purple-light-effect" style={{ top: '-10%', right: '-5%' }} />
            <div className="purple-light-effect" style={{ bottom: '10%', left: '-10%', animationDelay: '-5s', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)' }} />

            <Navbar />
            <main className="flex-1 pt-16 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
