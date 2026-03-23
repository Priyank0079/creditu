import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LoanProducts from './components/LoanProducts';
import KYCFlow from './components/KYCFlow';
import LiveProcess from './components/LiveProcess';
import Security from './components/Security';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <LoanProducts />
      <KYCFlow />
      <LiveProcess />
      <Security />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
