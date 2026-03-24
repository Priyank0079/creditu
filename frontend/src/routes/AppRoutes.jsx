import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../modules/user/pages/Dashboard/Dashboard';
import Login from '../modules/user/pages/Auth/Login';
import UserRegister from '../modules/user/pages/Auth/Register';
import NBFCRegister from '../modules/nbfc/pages/Register';
import Splash from '../modules/user/pages/Splash/Splash';
import KYCVerification from '../modules/user/pages/KYC/KYCVerification';
import ProfileCompletion from '../modules/user/pages/Profile/ProfileCompletion';
import CheckEligibility from '../modules/user/pages/CheckEligibility/CheckEligibility';
import DocumentRejected from '../modules/user/pages/Status/DocumentRejected';
import LoanApproved from '../modules/user/pages/Status/LoanApproved';
import AuthScreen from '../modules/user/pages/Auth/AuthScreen';

// ── Admin Panel ───────────────────────────────────────────
import AdminLayout from '../modules/admin/layout/AdminLayout';
import AdminDashboard from '../modules/admin/pages/AdminDashboard';
import AdminUsers from '../modules/admin/pages/AdminUsers';
import AdminLoans from '../modules/admin/pages/AdminLoans';
import AdminTransactions from '../modules/admin/pages/AdminTransactions';
import AdminEMI from '../modules/admin/pages/AdminEMI';
import AdminCreditScore from '../modules/admin/pages/AdminCreditScore';
import AdminReports from '../modules/admin/pages/AdminReports';
import AdminNotifications from '../modules/admin/pages/AdminNotifications';
import AdminSettings from '../modules/admin/pages/AdminSettings';
import AdminCarousel from '../modules/admin/pages/AdminCarousel';
import AdminKYC from '../modules/admin/pages/AdminKYC';
import AdminSupport from '../modules/admin/pages/AdminSupport';
import AdminLoanOffers from '../modules/admin/pages/AdminLoanOffers';
import { nbfcRoutes } from '../modules/nbfc/nbfcRoutes';

import LandingPage from '../modules/website/pages/LandingPage';
import DownloadApp from '../modules/website/pages/DownloadApp';
import About from '../modules/website/pages/About';
import LegalPrivacy from '../modules/website/pages/LegalPrivacy';
import LegalTerms from '../modules/website/pages/LegalTerms';

const AppRoutes = () => {
    return (
        <Routes>
            {/* ── Website / Landing Page ─────────────────────── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/download" element={<DownloadApp />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal/privacy" element={<LegalPrivacy />} />
            <Route path="/legal/terms" element={<LegalTerms />} />

            {/* ── User Module (Grouped under /user) ───────────── */}
            <Route path="/user">
                <Route index element={<Splash />} />
                <Route path="auth" element={<AuthScreen />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="kyc" element={<KYCVerification />} />
                <Route path="eligibility" element={<CheckEligibility />} />
                <Route path="status" element={<ProfileCompletion />} />
                <Route path="status/rejected" element={<DocumentRejected />} />
                <Route path="status/approved" element={<LoanApproved />} />
            </Route>

            {/* ── NBFC Routes ─────────────────────────────── */}
            <Route path="/nbfc-register" element={<NBFCRegister />} />
            {nbfcRoutes}

            {/* ── Admin Panel Routes ───────────────────────── */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="loans" element={<AdminLoans />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route path="emi" element={<AdminEMI />} />
                <Route path="credit" element={<AdminCreditScore />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="carousel" element={<AdminCarousel />} />
                <Route path="kyc" element={<AdminKYC />} />
                <Route path="support" element={<AdminSupport />} />
                <Route path="offers" element={<AdminLoanOffers />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
