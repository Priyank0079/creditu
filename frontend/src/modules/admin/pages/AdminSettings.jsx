import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Save, Eye, EyeOff, Check, Palette } from 'lucide-react';

const AdminSettings = () => {
    const [tab, setTab] = useState('profile');
    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        name: 'Super Admin',
        email: 'admin@creditu.in',
        phone: '+91 98765 00000',
        currentPass: '',
        newPass: '',
        confirmPass: '',
        notifLoans: true,
        notifEMI: true,
        notifKYC: true,
        notifReports: false,
        themeColor: '#0A2C5A',
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'system', label: 'System', icon: Shield },
    ];

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 className="admin-page-title">Settings</h1>
                <p className="admin-page-subtitle">Manage admin profile, security and system configurations</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 22, alignItems: 'start' }}>
                {/* Sidebar Tabs */}
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="admin-card" style={{ padding: 12 }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                                borderRadius: 11, border: 'none', cursor: 'pointer', marginBottom: 4,
                                background: tab === t.id ? 'var(--admin-primary)' : 'transparent',
                                color: tab === t.id ? 'white' : 'var(--admin-text)',
                                fontSize: 13, fontWeight: 700, transition: 'all 0.18s', textAlign: 'left',
                            }}
                            onMouseEnter={e => { if (tab !== t.id) e.currentTarget.style.background = 'var(--admin-bg)'; }}
                            onMouseLeave={e => { if (tab !== t.id) e.currentTarget.style.background = 'transparent'; }}
                        >
                            <t.icon size={16} />
                            {t.label}
                        </button>
                    ))}
                </motion.div>

                {/* Content */}
                <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="admin-card" style={{ padding: 28 }}>

                    {/* Profile Tab */}
                    {tab === 'profile' && (
                        <div>
                            <h3 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>Admin Profile</h3>
                            {/* Avatar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, padding: 20, background: 'var(--admin-bg)', borderRadius: 16 }}>
                                <div style={{ width: 70, height: 70, borderRadius: 18, background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 900, boxShadow: '0 8px 24px rgba(10,44,90,0.22)' }}>
                                    SA
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: 'var(--admin-text)' }}>Super Admin</h4>
                                    <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-muted)' }}>admin@creditu.in • Full Access</p>
                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ marginTop: 10, gap: 6 }}>
                                        Change Logo
                                    </button>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email Address', key: 'email', type: 'email' },
                                    { label: 'Phone Number', key: 'phone', type: 'tel' },
                                ].map(field => (
                                    <div key={field.key} style={field.key === 'phone' ? { gridColumn: '1 / -1' } : {}}>
                                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7, display: 'block' }}>{field.label}</label>
                                        <input className="admin-input" type={field.type} value={form[field.key]}
                                            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {tab === 'security' && (
                        <div>
                            <h3 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>Change Password</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                {[
                                    { label: 'Current Password', key: 'currentPass', show: showPass, toggle: () => setShowPass(p => !p) },
                                    { label: 'New Password', key: 'newPass', show: showNewPass, toggle: () => setShowNewPass(p => !p) },
                                    { label: 'Confirm New Password', key: 'confirmPass', show: showNewPass, toggle: null },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7, display: 'block' }}>{field.label}</label>
                                        <div style={{ position: 'relative' }}>
                                            <input className="admin-input" type={field.show ? 'text' : 'password'}
                                                placeholder="••••••••" value={form[field.key]}
                                                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                                style={{ paddingRight: 44 }} />
                                            {field.toggle && (
                                                <button onClick={field.toggle} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)' }}>
                                                    {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Password strength info */}
                            {form.newPass && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{ marginTop: 16, padding: 16, background: 'var(--admin-bg)', borderRadius: 12 }}>
                                    <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: 'var(--admin-text)' }}>Password Strength</p>
                                    <div style={{ height: 5, background: '#e5ebf5', borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${Math.min(form.newPass.length * 10, 100)}%`, background: form.newPass.length > 10 ? '#00A651' : form.newPass.length > 6 ? '#F4A100' : '#ef4444', borderRadius: 3, transition: 'all 0.3s' }} />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {tab === 'notifications' && (
                        <div>
                            <h3 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>Notification Preferences</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { key: 'notifLoans', label: 'New Loan Applications', desc: 'Get notified when a new loan is submitted' },
                                    { key: 'notifEMI', label: 'EMI Overdue Alerts', desc: 'Alert when EMI payment is missed' },
                                    { key: 'notifKYC', label: 'KYC Submissions', desc: 'Notify on new KYC document uploads' },
                                    { key: 'notifReports', label: 'Daily Reports', desc: 'Receive daily summary report at 9 AM' },
                                ].map(item => (
                                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--admin-bg)', borderRadius: 14 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--admin-text)', marginBottom: 3 }}>{item.label}</div>
                                            <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{item.desc}</div>
                                        </div>
                                        <div
                                            onClick={() => setForm(f => ({ ...f, [item.key]: !f[item.key] }))}
                                            style={{
                                                width: 46, height: 26, borderRadius: 13, cursor: 'pointer',
                                                background: form[item.key] ? 'var(--admin-green)' : '#d0dae8',
                                                position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                                            }}
                                        >
                                            <div style={{
                                                position: 'absolute', top: 3, left: form[item.key] ? 23 : 3,
                                                width: 20, height: 20, borderRadius: '50%', background: 'white',
                                                boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s',
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* System Tab */}
                    {tab === 'system' && (
                        <div>
                            <h3 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 800, color: 'var(--admin-text)' }}>System Configuration</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ padding: 20, background: 'var(--admin-bg)', borderRadius: 14 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>Theme Color</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <input type="color" value={form.themeColor} onChange={e => setForm(f => ({ ...f, themeColor: e.target.value }))}
                                            style={{ width: 44, height: 44, borderRadius: 10, border: '2px solid var(--admin-border)', cursor: 'pointer', padding: 2 }} />
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--admin-text)' }}>Primary Brand Color</div>
                                            <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>Current: {form.themeColor} (Future ready)</div>
                                        </div>
                                    </div>
                                </div>
                                {[
                                    { label: 'Application Version', value: 'v2.1.4' },
                                    { label: 'Environment', value: 'Production' },
                                    { label: 'API Base URL', value: 'https://api.creditu.in/v2' },
                                    { label: 'Database Region', value: 'Asia South (Mumbai)' },
                                    { label: 'Last Backup', value: '24 Feb 2026, 3:00 AM' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', background: 'var(--admin-bg)', borderRadius: 12 }}>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>{item.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--admin-text)', fontFamily: item.label === 'API Base URL' ? 'monospace' : 'inherit' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button className="admin-btn admin-btn-ghost">Reset</button>
                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            className="admin-btn admin-btn-primary"
                            onClick={handleSave}
                            style={{ gap: 8, minWidth: 140, justifyContent: 'center', background: saved ? 'var(--admin-green)' : 'var(--admin-primary)' }}
                        >
                            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminSettings;
