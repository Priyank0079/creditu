import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LicenseUpload from './LicenseUpload';

const initialValues = {
    nbfcName: '',
    cinNumber: '',
    rbiLicenseNumber: '',
    panNumber: '',
    address: '',
    email: '',
    phone: '',
};

const NBFCForm = ({ onSubmit }) => {
    const [values, setValues] = useState(initialValues);
    const [licenseFile, setLicenseFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [fileError, setFileError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const nextErrors = {};
        Object.entries(values).forEach(([key, value]) => {
            if (!value.trim()) nextErrors[key] = 'Required field';
        });
        if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
            nextErrors.email = 'Invalid email address';
        }
        if (!licenseFile) setFileError('RBI license PDF is required.');
        return { nextErrors, valid: Object.keys(nextErrors).length === 0 && !!licenseFile };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validate();
        setErrors(result.nextErrors);
        if (!result.valid) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onSubmit({ ...values, licenseFile });
        }, 1000);
    };

    const setField = (key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    return (
        <form className="nbfc-card nbfc-card-pad" onSubmit={handleSubmit}>
            <div className="nbfc-grid-2">
                <div>
                    <label className="nbfc-label">NBFC Name</label>
                    <input className="nbfc-input" value={values.nbfcName} onChange={(e) => setField('nbfcName', e.target.value)} />
                    {errors.nbfcName ? <p className="nbfc-error">{errors.nbfcName}</p> : null}
                </div>
                <div>
                    <label className="nbfc-label">CIN Number</label>
                    <input className="nbfc-input" value={values.cinNumber} onChange={(e) => setField('cinNumber', e.target.value)} />
                    {errors.cinNumber ? <p className="nbfc-error">{errors.cinNumber}</p> : null}
                </div>
                <div>
                    <label className="nbfc-label">RBI License Number</label>
                    <input className="nbfc-input" value={values.rbiLicenseNumber} onChange={(e) => setField('rbiLicenseNumber', e.target.value)} />
                    {errors.rbiLicenseNumber ? <p className="nbfc-error">{errors.rbiLicenseNumber}</p> : null}
                </div>
                <div>
                    <label className="nbfc-label">PAN Number</label>
                    <input className="nbfc-input" value={values.panNumber} onChange={(e) => setField('panNumber', e.target.value)} />
                    {errors.panNumber ? <p className="nbfc-error">{errors.panNumber}</p> : null}
                </div>
                <div>
                    <label className="nbfc-label">Email</label>
                    <input className="nbfc-input" value={values.email} onChange={(e) => setField('email', e.target.value)} />
                    {errors.email ? <p className="nbfc-error">{errors.email}</p> : null}
                </div>
                <div>
                    <label className="nbfc-label">Phone</label>
                    <input className="nbfc-input" value={values.phone} onChange={(e) => setField('phone', e.target.value)} />
                    {errors.phone ? <p className="nbfc-error">{errors.phone}</p> : null}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <label className="nbfc-label">Registered Address</label>
                    <textarea className="nbfc-textarea" value={values.address} onChange={(e) => setField('address', e.target.value)} />
                    {errors.address ? <p className="nbfc-error">{errors.address}</p> : null}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <LicenseUpload
                        file={licenseFile}
                        error={fileError}
                        onFileChange={(file, errorText) => {
                            setLicenseFile(file);
                            setFileError(errorText || '');
                        }}
                    />
                </div>
            </div>

            <div style={{ marginTop: 16 }}>
                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 0 4px rgba(10,44,90,0.14)' }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="nbfc-btn nbfc-btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Registration'}
                </motion.button>
            </div>
        </form>
    );
};

export default NBFCForm;
