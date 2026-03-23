import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LicenseUpload = ({ file, onFileChange, error }) => {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const pickFile = (nextFile) => {
        if (!nextFile) return;
        if (nextFile.type !== 'application/pdf') {
            onFileChange(null, 'Only PDF files are allowed.');
            return;
        }
        onFileChange(nextFile, '');
    };

    return (
        <div>
            <label className="nbfc-label">Upload RBI License (PDF only)</label>
            <motion.div
                whileHover={{ scale: 1.01 }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    pickFile(e.dataTransfer.files?.[0]);
                }}
                onClick={() => inputRef.current?.click()}
                style={{
                    border: `2px dashed ${isDragging ? '#0a2c5a' : '#c9d8eb'}`,
                    borderRadius: 14,
                    background: isDragging ? '#f1f7ff' : '#f8fbff',
                    padding: 18,
                    cursor: 'pointer',
                }}
            >
                {!file && <p style={{ margin: 0, color: '#475569', fontSize: 13 }}>Drag and drop PDF here, or click to upload</p>}
                {file && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                        <p style={{ margin: 0, color: '#0a2c5a', fontSize: 13, fontWeight: 700 }}>{file.name}</p>
                        <button type="button" className="nbfc-btn nbfc-btn-secondary" style={{ width: 'auto', padding: '8px 12px' }}>
                            Replace file
                        </button>
                    </div>
                )}
            </motion.div>
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => pickFile(e.target.files?.[0])}
            />
            {error ? <p className="nbfc-error">{error}</p> : null}
        </div>
    );
};

export default LicenseUpload;
