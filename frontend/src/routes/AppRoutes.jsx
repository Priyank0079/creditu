import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../modules/user/pages/Dashboard/Dashboard';
import Login from '../modules/user/pages/Auth/Login';
import Register from '../modules/user/pages/Auth/Register';
import Splash from '../modules/user/pages/Splash/Splash';
import KYCVerification from '../modules/user/pages/KYC/KYCVerification';
import ProfileCompletion from '../modules/user/pages/Profile/ProfileCompletion';
import CheckEligibility from '../modules/user/pages/CheckEligibility/CheckEligibility';
import DocumentRejected from '../modules/user/pages/Status/DocumentRejected';
import LoanApproved from '../modules/user/pages/Status/LoanApproved';

import AuthScreen from '../modules/user/pages/Auth/AuthScreen';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kyc" element={<KYCVerification />} />
            <Route path="/eligibility" element={<CheckEligibility />} />
            <Route path="/status" element={<ProfileCompletion />} />
            <Route path="/status/rejected" element={<DocumentRejected />} />
            <Route path="/status/approved" element={<LoanApproved />} />
        </Routes>
    );
};

export default AppRoutes;
