import React from 'react';
import WebsiteNavbar from '../components/WebsiteNavbar';
import WebsiteHero from '../components/WebsiteHero';
import WebsiteFeatures from '../components/WebsiteFeatures';
import WebsiteLoanProducts from '../components/WebsiteLoanProducts';
import WebsiteKYCFlow from '../components/WebsiteKYCFlow';
import WebsiteLiveProcess from '../components/WebsiteLiveProcess';
import WebsiteSecurity from '../components/WebsiteSecurity';
import WebsiteCTA from '../components/WebsiteCTA';
import WebsiteFooter from '../components/WebsiteFooter';

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <WebsiteNavbar />
      <WebsiteHero />
      <WebsiteFeatures />
      <WebsiteLoanProducts />
      <WebsiteKYCFlow />
      <WebsiteLiveProcess />
      <WebsiteSecurity />
      <WebsiteCTA />
      <WebsiteFooter />
    </div>
  );
};

export default LandingPage;
