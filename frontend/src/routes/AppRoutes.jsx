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

const AppRoutes = () => {
    return (
        <Routes>
            {/* ── User / Public Routes ─────────────────────── */}
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

            {/* ── Admin Panel Routes ───────────────────────── */}
            <Route path="/dashboard/admin" element={<AdminLayout />}>
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
