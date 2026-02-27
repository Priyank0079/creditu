import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NBFCForm from '../components/NBFCForm';

const Register = () => {
    const navigate = useNavigate();
    const [toastOpen, setToastOpen] = useState(false);

    const onFormSubmit = () => {
        setToastOpen(true);
        setTimeout(() => {
            setToastOpen(false);
            navigate('/nbfc');
        }, 1200);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <section style={{ marginBottom: 12 }}>
                <h2 style={{ margin: 0, color: '#0a2c5a' }}>NBFC Registration</h2>
                <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 13 }}>
                    Register your NBFC profile with compliance details and RBI license document.
                </p>
            </section>
            <NBFCForm onSubmit={onFormSubmit} />

            <AnimatePresence>
                {toastOpen ? (
                    <motion.div
                        className="nbfc-toast"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        Registration submitted successfully.
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
};

export default Register;
