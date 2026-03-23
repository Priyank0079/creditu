import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NBFCForm from '../components/NBFCForm';
import '../styles.css';

const Register = () => {
    const navigate = useNavigate();
    const [toastOpen, setToastOpen] = useState(false);

    const onFormSubmit = () => {
        setToastOpen(true);
        setTimeout(() => {
            setToastOpen(false);
            navigate('/auth'); // Navigate to auth after registration
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#f3f8ff] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl"
            >
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-[#0a2c5a] mb-2">NBFC Onboarding</h1>
                    <p className="text-gray-500 font-medium">Register your branch before accessing the portal</p>
                </header>

                <NBFCForm onSubmit={onFormSubmit} />

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/auth')}
                        className="text-[#0a2c5a] font-bold hover:underline text-sm"
                    >
                        Already registered? Go to Login
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {toastOpen && (
                    <motion.div
                        className="nbfc-toast"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        Registration submitted successfully!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Register;
