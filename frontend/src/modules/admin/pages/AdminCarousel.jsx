import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, Trash2, Edit3, Save, X, Eye, EyeOff, ArrowUp, ArrowDown, Upload, Link as LinkIcon, Type, Subtitles } from 'lucide-react';

const AdminCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        img: '',
        tag: '',
        cta: '',
        redirectUrl: '',
        order: 0,
        isActive: true,
        tagColor: '#FFCCFF',
        tagBg: 'rgba(255,204,255,0.22)'
    });

    useEffect(() => {
        const stored = localStorage.getItem('carouselData');
        if (stored) {
            setSlides(JSON.parse(stored).sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
    }, []);

    const saveToLocal = (updatedSlides) => {
        localStorage.setItem('carouselData', JSON.stringify(updatedSlides));
        setSlides(updatedSlides.sort((a, b) => (a.order || 0) - (b.order || 0)));
        // Dispatch storage event to update other components in real-time
        window.dispatchEvent(new Event('storage'));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();
        let updatedSlides;
        if (editingSlide) {
            updatedSlides = slides.map(s => s.id === editingSlide.id ? { ...formData, id: s.id } : s);
        } else {
            const newSlide = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            updatedSlides = [...slides, newSlide];
        }
        saveToLocal(updatedSlides);
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            const updatedSlides = slides.filter(s => s.id !== id);
            saveToLocal(updatedSlides);
        }
    };

    const toggleActive = (id) => {
        const updatedSlides = slides.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
        saveToLocal(updatedSlides);
    };

    const moveSlide = (index, direction) => {
        const newSlides = [...slides];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newSlides.length) return;

        // Swap orders
        const tempOrder = newSlides[index].order;
        newSlides[index].order = newSlides[targetIndex].order;
        newSlides[targetIndex].order = tempOrder;

        saveToLocal(newSlides);
    };

    const openModal = (slide = null) => {
        if (slide) {
            setEditingSlide(slide);
            setFormData({ ...slide });
        } else {
            setEditingSlide(null);
            setFormData({
                title: '',
                subtitle: '',
                img: '',
                tag: 'New Offer',
                cta: 'Check Details',
                redirectUrl: '',
                order: slides.length,
                isActive: true,
                tagColor: '#FFCCFF',
                tagBg: 'rgba(255,204,255,0.22)'
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSlide(null);
    };

    return (
        <div style={{ paddingBottom: 40 }}>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="admin-page-title">Carousel Management</h1>
                    <p className="admin-page-subtitle">Add, edit or reorder homepage banner slides</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => openModal()} style={{ borderRadius: 12 }}>
                    <Plus size={18} /> Add New Slide
                </button>
            </div>

            <div className="admin-card" style={{ border: 'none', boxShadow: 'var(--admin-shadow)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: 60 }}>Order</th>
                                <th>Slide Info</th>
                                <th>Headline & Subtitle</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slides.map((slide, index) => (
                                <tr key={slide.id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                                            <button onClick={() => moveSlide(index, -1)} disabled={index === 0} style={{ background: 'none', border: 'none', cursor: index === 0 ? 'default' : 'pointer', color: index === 0 ? '#ddd' : 'var(--admin-primary)', opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={14} /></button>
                                            <span style={{ fontWeight: 800, fontSize: 13 }}>{slide.order || 0}</span>
                                            <button onClick={() => moveSlide(index, 1)} disabled={index === slides.length - 1} style={{ background: 'none', border: 'none', cursor: index === slides.length - 1 ? 'default' : 'pointer', color: index === slides.length - 1 ? '#ddd' : 'var(--admin-primary)', opacity: index === slides.length - 1 ? 0.3 : 1 }}><ArrowDown size={14} /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{ width: 100, height: 60, borderRadius: 10, overflow: 'hidden', background: '#f0f0f0', border: '1px solid var(--admin-border)' }}>
                                                <img src={slide.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 13, fontWeight: 700 }}>{slide.tag || 'No Tag'}</div>
                                                <div style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>{slide.cta || 'No CTA'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ maxWidth: 300 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slide.headline || slide.title}</div>
                                        <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{slide.sub || slide.subtitle}</div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleActive(slide.id)}
                                            className={`badge ${slide.isActive ? 'badge-success' : 'badge-danger'}`}
                                            style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                                        >
                                            {slide.isActive ? <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={12} /> Active</div> : <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><EyeOff size={12} /> Disabled</div>}
                                        </button>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => openModal(slide)}>
                                                <Edit3 size={14} />
                                            </button>
                                            <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(slide.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {slides.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--admin-text-muted)' }}>
                                        No slides found. Click "Add New Slide" to begin.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="admin-modal-overlay" onClick={closeModal}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="admin-modal"
                            style={{ maxWidth: 550, padding: 0, overflow: 'hidden' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h3>
                                <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)' }}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleAddOrUpdate} style={{ padding: 24 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                    {/* Image Upload */}
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>Slide Image</label>
                                        <div style={{
                                            width: '100%', height: 160, borderRadius: 16, border: '2px dashed var(--admin-border)',
                                            background: formData.img ? `url(${formData.img}) center/cover` : 'var(--admin-bg)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden'
                                        }} onClick={() => document.getElementById('img-upload').click()}>
                                            {!formData.img && (
                                                <div style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                                                    <Upload size={24} style={{ marginBottom: 8 }} />
                                                    <div style={{ fontSize: 12, fontWeight: 600 }}>Click to upload image</div>
                                                </div>
                                            )}
                                            {formData.img && (
                                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: 0, transition: '0.2s' }} className="hover-overlay-upload">
                                                    <Upload size={24} color="white" />
                                                </div>
                                            )}
                                            <input type="file" id="img-upload" hidden accept="image/*" onChange={handleImageUpload} />
                                        </div>
                                    </div>

                                    {/* Tag & Tech details */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>Tag (e.g. Personal Loan)</label>
                                        <div style={{ position: 'relative' }}>
                                            <ImageIcon size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} placeholder="Tag text" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>CTA (e.g. Apply Now)</label>
                                        <div style={{ position: 'relative' }}>
                                            <Plus size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.cta} onChange={e => setFormData({ ...formData, cta: e.target.value })} placeholder="Button text" required />
                                        </div>
                                    </div>

                                    {/* Headline & Sub */}
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>Headline</label>
                                        <div style={{ position: 'relative' }}>
                                            <Type size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.headline || formData.title} onChange={e => setFormData({ ...formData, headline: e.target.value, title: e.target.value })} placeholder="Main headline" required />
                                        </div>
                                    </div>

                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>Subtitle</label>
                                        <div style={{ position: 'relative' }}>
                                            <Subtitles size={14} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--admin-text-muted)' }} />
                                            <textarea className="admin-input" style={{ paddingLeft: 38, minHeight: 80, resize: 'none' }} value={formData.sub || formData.subtitle} onChange={e => setFormData({ ...formData, sub: e.target.value, subtitle: e.target.value })} placeholder="Brief description..." required />
                                        </div>
                                    </div>

                                    {/* Redirect URL & Order */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>Redirect URL (Optional)</label>
                                        <div style={{ position: 'relative' }}>
                                            <LinkIcon size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                            <input className="admin-input" style={{ paddingLeft: 38 }} value={formData.redirectUrl} onChange={e => setFormData({ ...formData, redirectUrl: e.target.value })} placeholder="https://..." />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8, color: 'var(--admin-text)' }}>Display Order</label>
                                        <input type="number" className="admin-input" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>

                                <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                    <button type="button" className="admin-btn admin-btn-ghost" onClick={closeModal}>Cancel</button>
                                    <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '10px 30px' }}>
                                        <Save size={18} /> {editingSlide ? 'Update Slide' : 'Save Slide'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .hover-overlay-upload:hover { opacity: 1 !important; }
            `}</style>
        </div>
    );
};

export default AdminCarousel;
