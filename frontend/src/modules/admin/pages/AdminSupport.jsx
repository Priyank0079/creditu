import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Clock, CheckCircle, X, Send, User, ChevronRight, AlertTriangle } from 'lucide-react';
import { supportTickets } from '../utils/dummyData';

const priorityColors = { High: '#ef4444', Medium: '#F4A100', Low: '#00A651' };
const statusColors = { Open: 'badge-warning', 'In Progress': 'badge-info', Closed: 'badge-success' };

const AdminSupport = () => {
    const [tickets, setTickets] = useState(supportTickets);
    const [search, setSearch] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [reply, setReply] = useState('');

    const filtered = tickets.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.id.includes(search)
    );

    const handleSendReply = () => {
        if (!reply.trim()) return;
        // Mock sending reply
        setTickets(prev => prev.map(t =>
            t.id === selectedTicket.id ? { ...t, status: 'In Progress' } : t
        ));
        setReply('');
        alert('Reply sent to user: ' + selectedTicket.name);
    };

    const handleCloseTicket = (id) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
        if (selectedTicket && selectedTicket.id === id) {
            setSelectedTicket(prev => ({ ...prev, status: 'Closed' }));
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 140px)', display: 'flex', gap: 20 }}>
            {/* Tickets List */}
            <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1.5px solid var(--admin-border)', borderRadius: 12, padding: '0 12px' }}>
                    <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
                    <input className="admin-input" placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '10px 0', fontSize: 13 }} />
                </div>

                <div className="admin-card admin-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 0 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--admin-border)' }}>
                        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>Tickets ({filtered.length})</h3>
                    </div>
                    {filtered.map(ticket => (
                        <div
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(10,44,90,0.04)',
                                cursor: 'pointer',
                                background: selectedTicket?.id === ticket.id ? 'var(--admin-bg)' : 'transparent',
                                transition: '0.2s'
                            }}
                            onMouseEnter={e => !selectedTicket || selectedTicket.id !== ticket.id ? e.currentTarget.style.background = 'rgba(10,44,90,0.02)' : null}
                            onMouseLeave={e => !selectedTicket || selectedTicket.id !== ticket.id ? e.currentTarget.style.background = 'transparent' : null}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--admin-primary)' }}>{ticket.id}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: priorityColors[ticket.priority] }}>● {ticket.priority}</span>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--admin-text)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ticket.subject}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--admin-primary)', color: 'white', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ticket.avatar}</div>
                                <span style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontWeight: 600 }}>{ticket.name}</span>
                                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#ccc' }}>{ticket.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ticket Detail & Chat */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {selectedTicket ? (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="admin-card" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {/* Detail Header */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-bg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--admin-primary), #1a6fba)', color: 'white', fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selectedTicket.avatar}</div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{selectedTicket.subject}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                                        <span style={{ fontSize: 12, color: 'var(--admin-text-muted)', fontWeight: 600 }}>{selectedTicket.name} • {selectedTicket.userId}</span>
                                        <span className={`badge ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {selectedTicket.status !== 'Closed' && (
                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => handleCloseTicket(selectedTicket.id)} style={{ color: 'var(--admin-green)' }}>
                                        <CheckCircle size={14} /> Close Ticket
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div style={{ flex: 1, padding: 24, overflowY: 'auto', background: 'rgba(10,44,90,0.01)', display: 'flex', flexDirection: 'column', gap: 20 }} className="admin-scrollbar">
                            <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                                <div style={{ background: 'white', padding: '14px 18px', borderRadius: '16px 16px 16px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid var(--admin-border)' }}>
                                    <p style={{ margin: 0, fontSize: 14, color: 'var(--admin-text)', lineHeight: 1.5 }}>{selectedTicket.lastMsg}</p>
                                </div>
                                <span style={{ fontSize: 10, color: 'var(--admin-text-muted)', marginTop: 4, display: 'block' }}>{selectedTicket.date} • {selectedTicket.name}</span>
                            </div>

                            {/* Placeholder for admin replies */}
                            <div style={{ alignSelf: 'center', padding: '10px 20px', background: 'rgba(10,44,90,0.04)', borderRadius: 100, fontSize: 11, fontWeight: 700, color: 'var(--admin-text-muted)' }}>
                                No previous replies found.
                            </div>
                        </div>

                        {/* Reply Area */}
                        {selectedTicket.status !== 'Closed' ? (
                            <div style={{ padding: 20, borderTop: '1px solid var(--admin-border)', background: 'white' }}>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        className="admin-input"
                                        placeholder="Type your reply here..."
                                        rows={3}
                                        value={reply}
                                        onChange={e => setReply(e.target.value)}
                                        style={{ width: '100%', padding: '14px 60px 14px 16px', borderRadius: 14, resize: 'none' }}
                                    />
                                    <button
                                        onClick={handleSendReply}
                                        style={{ position: 'absolute', right: 10, bottom: 10, width: 40, height: 40, borderRadius: 10, background: 'var(--admin-primary)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ padding: 20, textAlign: 'center', background: 'var(--admin-bg)', color: 'var(--admin-text-muted)', fontSize: 13, fontWeight: 700 }}>
                                This ticket has been closed.
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="admin-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: 'var(--admin-text-muted)' }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageSquare size={32} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ margin: '0 0 4px', color: 'var(--admin-text)' }}>Select a ticket</h4>
                            <p style={{ margin: 0, fontSize: 13 }}>Choose a ticket from the list to view details and reply.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSupport;
