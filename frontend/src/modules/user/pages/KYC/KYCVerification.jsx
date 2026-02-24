import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Camera,
  UploadCloud,
  ShieldCheck,
  CheckCircle2,
  FileText,
  X,
  Loader2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';

const KYCVerification = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State management
  const [pan, setPan] = useState("ABCDE1234F");
  const [income, setIncome] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showSelfieCamera, setShowSelfieCamera] = useState(false);

  // File handling
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      const newFiles = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploading(false);
    }, 1500);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSelfie = () => {
    setShowSelfieCamera(true);
    setTimeout(() => {
      setShowSelfieCamera(false);
      const selfieDoc = {
        id: 'selfie-' + Date.now(),
        name: 'Live_Selfie.jpg',
        size: '0.8 MB',
        type: 'image/jpeg',
        isSelfie: true
      };
      setUploadedFiles(prev => [...prev, selfieDoc]);
    }, 2000);
  };

  const handleFinalSubmit = () => {
    if (!pan || !income || !accountNumber || uploadedFiles.length === 0) {
      alert("Please complete all fields and upload documents");
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-6 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-10 max-w-lg mx-auto">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-white shadow-sm rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
          <ArrowLeft size={22} className="text-primary" />
        </button>
        <div className="text-center">
          <h1 className="font-black text-xl text-primary tracking-tight">KYC Verification</h1>
          <p className="text-[10px] text-textSecondary uppercase font-bold tracking-widest mt-0.5">Secure Document Portal</p>
        </div>
        <div className="w-11 h-11 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
          <ShieldCheck size={22} />
        </div>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* Core Identity Info */}
        <section className="space-y-4">
          <div className="bg-white p-2.5 rounded-[28px] border border-gray-100 flex items-center shadow-[0_8px_20px_rgba(0,0,0,0.03)] group focus-within:ring-2 ring-primary/10 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mr-4 shrink-0 group-focus-within:bg-primary group-focus-within:text-white transition-colors">
              <CreditCard size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-black text-textSecondary/60 uppercase tracking-[0.15em] mb-1">PAN Card Number</p>
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full bg-transparent font-bold text-primary focus:outline-none placeholder:text-gray-300 text-base"
              />
            </div>
            {pan.length === 10 && <CheckCircle2 size={18} className="text-trust mr-4 animate-in zoom-in duration-300" />}
          </div>

          <div className="bg-white p-2.5 rounded-[28px] border border-gray-100 flex items-center shadow-[0_8px_20px_rgba(0,0,0,0.03)] group focus-within:ring-2 ring-gold/10 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mr-4 shrink-0 group-focus-within:bg-gold group-focus-within:text-white transition-colors">
              <Wallet size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-black text-textSecondary/60 uppercase tracking-[0.15em] mb-1">Monthly Income (₹)</p>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-transparent font-bold text-primary focus:outline-none placeholder:text-gray-300 text-base"
              />
            </div>
          </div>
        </section>

        {/* Upload & Actions */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
          />
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => fileInputRef.current?.click()}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-soft flex flex-col items-center text-center group transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-all">
              <UploadCloud size={24} />
            </div>
            <p className="text-[13px] font-bold text-primary tracking-tight">Upload Files</p>
            <p className="text-[9px] text-textSecondary uppercase font-bold mt-1 tracking-wider opacity-60">PDF / Images</p>
          </motion.button>

          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSelfie}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-soft flex flex-col items-center text-center group transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mb-3 group-hover:bg-gold group-hover:text-white transition-all">
              <Camera size={24} />
            </div>
            <p className="text-[13px] font-bold text-primary tracking-tight">Selfie Scan</p>
            <p className="text-[9px] text-textSecondary uppercase font-bold mt-1 tracking-wider opacity-60">Face ID Lock</p>
          </motion.button>
        </div>

        {/* Uploaded Files Preview */}
        <AnimatePresence>
          {(uploadedFiles.length > 0 || uploading) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/60 backdrop-blur-md rounded-[32px] p-6 border border-white shadow-inner"
            >
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <FileText size={14} className="text-primary" />
                Uploaded Artifacts ({uploadedFiles.length})
              </h3>
              <div className="space-y-3">
                {uploading && (
                  <div className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl animate-pulse">
                    <Loader2 size={18} className="animate-spin text-primary" />
                    <span className="text-xs font-bold text-primary/60">Processing documents...</span>
                  </div>
                )}
                {uploadedFiles.map(file => (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-2xl shadow-sm border border-gray-50"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`p-2 rounded-xl ${file.isSelfie ? 'bg-gold/10 text-gold' : 'bg-primary/10 text-primary'}`}>
                        {file.isSelfie ? <Camera size={16} /> : <FileText size={16} />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-primary truncate">{file.name}</p>
                        <p className="text-[9px] font-bold text-textSecondary/60 uppercase">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1.5 hover:bg-red-50 text-red-400 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile / Account Verification */}
        <div className="bg-white p-7 rounded-[36px] border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-primary leading-tight">
              Bank Account<br />
              <span className="text-gold">Verification</span>
            </h3>
            <div className="bg-gold/10 p-2.5 rounded-2xl rotate-3">
              <AlertCircle size={20} className="text-gold" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold placeholder:text-gray-300 focus:ring-2 ring-primary/5 focus:bg-white outline-none transition-all"
              />
            </div>
            <button
              disabled={!accountNumber || otpSent}
              onClick={() => {
                setUploading(true);
                setTimeout(() => {
                  setUploading(false);
                  setOtpSent(true);
                }, 1000);
              }}
              className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all ${otpSent
                ? 'bg-trust text-white shadow-lg shadow-trust/20 cursor-default'
                : 'bg-primary text-white shadow-lg shadow-primary/30 active:scale-[0.98]'
                }`}
            >
              {otpSent ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> Verified
                </span>
              ) : 'Verify Account via OTP'}
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFinalSubmit}
          className="w-full bg-[#1A1D1F] text-white py-5 rounded-[28px] font-black text-base shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group"
        >
          Proceed to Eligibility
          <div className="p-1 bg-white/10 rounded-lg group-hover:translate-x-1 transition-transform">
            <ChevronRight size={18} />
          </div>
        </motion.button>

        <p className="text-center text-[10px] font-bold text-textSecondary uppercase tracking-[0.2em] opacity-40">
          Encrypted with 256-bit SSL Security
        </p>
      </div>

      {/* Selfie Simulator Overlay */}
      <AnimatePresence>
        {showSelfieCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-64 h-64 border-4 border-white border-dashed rounded-full mb-8 relative overflow-hidden">
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 right-0 h-1 bg-gold/50 shadow-[0_0_15px_#F4B400] z-10"
              />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Scanning Face...</h2>
            <p className="text-white/40 text-sm">Keep your head inside the circle</p>
            <Loader2 className="text-gold animate-spin mt-10" size={32} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KYCVerification;
