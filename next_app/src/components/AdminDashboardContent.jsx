'use client';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Nav, Table, Modal, Badge, InputGroup } from 'react-bootstrap';
import { useAnnouncement } from '../context/AnnouncementContext';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

const AdminDashboard = () => {
    const { config, updateConfig } = useAnnouncement();
    const { users, currentUser, isAuthenticated, login, logout, forgotPassword, addUser, removeUser, syncAdmins } = useAuth();
    const {
        courses, addCourse, updateCourse, deleteCourse,
        services, addService, updateService, deleteService,
        sessions, addSession, updateSession, deleteSession,
        about, updateAbout,
        testimonials, addTestimonial, updateTestimonial, deleteTestimonial
    } = useContent();

    // --- Auth States ---
    const [emailInput, setEmailInput] = useState('muhammadnumanlatif@gmail.com');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [authError, setAuthError] = useState('');
    const [authSuccess, setAuthSuccess] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // --- Dashboard Global States ---
    const [localConfig, setLocalConfig] = useState(config);
    const [activeTab, setActiveTab] = useState('editor');
    const [saveStatus, setSaveStatus] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // --- Modals visibility ---
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false); // For Announcements
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [showTestimonialModal, setShowTestimonialModal] = useState(false);

    // --- Temp states for modals ---
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'admin', password: '' });
    const [tempAbout, setTempAbout] = useState(about);
    const [tempItem, setTempItem] = useState({ id: null, message: '', link: '', bgColor: '#d4af37', textColor: '#0a1f0a' });
    const [tempCourse, setTempCourse] = useState({});
    const [tempService, setTempService] = useState({});
    const [tempSession, setTempSession] = useState({});
    const [tempTestimonial, setTempTestimonial] = useState({});

    // UI Helpers for lists inside modals
    const [newEdu, setNewEdu] = useState({ title: '', sub: '', desc: '' });
    const [newExp, setNewExp] = useState({ title: '', desc: '' });
    const [newCurriculumItem, setNewCurriculumItem] = useState('');
    const [newServiceDetail, setNewServiceDetail] = useState('');
    const [newServiceApproach, setNewServiceApproach] = useState({ title: '', desc: '' });
    const [newServiceFAQ, setNewServiceFAQ] = useState({ q: '', a: '' });
    const [newSessionFeature, setNewSessionFeature] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => { setLocalConfig(config); }, [config]);
    useEffect(() => { setTempAbout(about); }, [about]);

    // LOGIN FLOW
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError('');
        const res = await login(emailInput, passwordInput);
        if (!res.success) setAuthError(res.message);
        setAuthLoading(false);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError('');
        setAuthSuccess('');
        const res = await forgotPassword(emailInput);
        if (res.success) setAuthSuccess("Password reset email sent!");
        else setAuthError(res.message);
        setAuthLoading(false);
    };

    // HANDLERS
    const handleAddUser = async (e) => {
        e.preventDefault();
        const res = await addUser(newUser.name, newUser.email, newUser.role, newUser.password);
        if (res.success) { setShowUserModal(false); setNewUser({ name: '', email: '', role: 'admin', password: '' }); }
        else alert(res.message);
    };

    const handleSaveAnnouncement = () => {
        if (editingId) {
            setLocalConfig(prev => ({
                ...prev,
                items: prev.items.map(i => i.id === editingId ? tempItem : i)
            }));
        } else {
            setLocalConfig(prev => ({
                ...prev,
                items: [...prev.items, { ...tempItem, id: Date.now() }]
            }));
        }
        setShowItemModal(false);
    };

    const handleSaveCourse = () => {
        const payload = { ...tempCourse, slug: tempCourse.slug || tempCourse.title?.toLowerCase().replace(/ /g, '-') };
        if (editingId) updateCourse(editingId, payload);
        else addCourse({ ...payload, id: Date.now().toString() });
        setShowCourseModal(false);
    };

    const handleSaveService = () => {
        const payload = { ...tempService, slug: tempService.slug || tempService.title?.toLowerCase().replace(/ /g, '-') };
        if (editingId) updateService(editingId, payload);
        else addService({ ...payload, id: Date.now().toString() });
        setShowServiceModal(false);
    };

    const handleSaveSession = () => {
        const payload = { ...tempSession, slug: tempSession.slug || tempSession.title?.toLowerCase().replace(/ /g, '-') };
        if (editingId) updateSession(editingId, payload);
        else addSession({ ...payload, id: Date.now().toString() });
        setShowSessionModal(false);
    };

    const handleSaveTestimonial = () => {
        if (editingId) updateTestimonial(editingId, tempTestimonial);
        else addTestimonial({ ...tempTestimonial, id: Date.now() });
        setShowTestimonialModal(false);
    };

    const handleSaveAbout = () => {
        updateAbout(tempAbout);
        setShowAboutModal(false);
        setSaveStatus({ type: 'success', msg: 'Profile updated!' });
        setTimeout(() => setSaveStatus(null), 3000);
    };

    const handleImageUpload = async (file, callback) => {
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        try {
            const response = await fetch(`${API_URL}/api/upload-image`, { method: 'POST', body: formData });
            const res = await response.json();
            if (res.success) callback(res.imageUrl);
            else alert(res.message);
        } catch (err) { alert("Upload error connecting to backend"); }
        finally { setIsUploading(false); }
    };

    // --- LOGIN RENDER ---
    if (!isAuthenticated) {
        return (
            <div className="login-page">
                <div className="login-background">
                    <div className="blob"></div>
                    <div className="blob second"></div>
                </div>

                <Container className="d-flex align-items-center justify-content-center min-vh-100">
                    <Card className="login-card shadow-2xl animate-fade-up">
                        <Card.Body className="p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div className="login-icon-wrapper mb-3">
                                    <div className="login-icon">
                                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="fw-800 text-dark mb-2">Admin Portal</h2>
                                <p className="text-muted small">Optimun Nutrafit Academy Management</p>
                            </div>

                            {authError && <Alert variant="danger" className="py-2 small text-center rounded-3 border-0 animate-shake">{authError}</Alert>}
                            {authSuccess && <Alert variant="success" className="py-2 small text-center rounded-3 border-0">{authSuccess}</Alert>}

                            <Form onSubmit={showForgot ? handleForgotPassword : handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small-label fw-700">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={emailInput}
                                        onChange={e => setEmailInput(e.target.value)}
                                        className="modern-input"
                                        placeholder="drTaskeen@academy.com"
                                        required
                                    />
                                </Form.Group>

                                {!showForgot && (
                                    <Form.Group className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <Form.Label className="small-label fw-700">Secure Password</Form.Label>
                                            <Button variant="link" size="sm" className="forgot-link" onClick={() => setShowForgot(true)}>Forgot Password?</Button>
                                        </div>
                                        <InputGroup className="modern-input-group">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                value={passwordInput}
                                                onChange={e => setPasswordInput(e.target.value)}
                                                className="modern-input border-end-0"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <InputGroup.Text
                                                className="modern-input-append"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {showPassword ? "🙈" : "👁️"}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                )}

                                <Button
                                    className={`w-100 py-3 fw-800 modern-button ${showForgot ? 'warning' : 'primary'}`}
                                    type="submit"
                                    disabled={authLoading}
                                >
                                    {authLoading ? (
                                        <span className="d-flex align-items-center justify-content-center gap-2">
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            {showForgot ? 'Sending...' : 'Authenticating...'}
                                        </span>
                                    ) : (showForgot ? 'Send Reset Link' : 'Secure Login')}
                                </Button>

                                {showForgot && (
                                    <Button variant="link" className="w-100 mt-3 text-decoration-none small text-muted" onClick={() => setShowForgot(false)}>
                                        ← Back to Login
                                    </Button>
                                )}
                            </Form>
                        </Card.Body>
                        <div className="card-footer-note py-3 text-center border-top">
                            <p className="extra-small text-muted mb-0">Protected by Firebase Enterprise Encryption</p>
                        </div>
                    </Card>
                </Container>

                <style jsx global>{`
                    .login-page { background: #f4f7f6; position: relative; overflow: hidden; }
                    .login-background { position: absolute; width: 100%; height: 100%; z-index: 0; }
                    .blob { position: absolute; width: 500px; height: 500px; background: rgba(25, 135, 84, 0.1); filter: blur(80px); border-radius: 50%; top: -100px; right: -100px; animation: move 20s infinite alternate; }
                    .blob.second { background: rgba(212, 175, 55, 0.08); bottom: -100px; left: -100px; animation-delay: -5s; }
                    @keyframes move { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 100px); } }
                    .login-card { width: 100%; max-width: 440px; border: none; border-radius: 30px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); z-index: 10; transition: transform 0.3s; }
                    .login-icon-wrapper { display: inline-flex; padding: 15px; background: var(--primary-main); color: white; border-radius: 20px; box-shadow: 0 10px 20px rgba(25, 135, 84, 0.2); }
                    .small-label { font-size: 0.75rem; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
                    .modern-input { border: 2px solid #edf2f7; border-radius: 12px; padding: 12px 16px; font-size: 0.95rem; transition: all 0.2s; }
                    .modern-input:focus { border-color: var(--primary-main); box-shadow: 0 0 0 4px rgba(25, 135, 84, 0.1); }
                    .modern-input-append { background: white; border: 2px solid #edf2f7; border-left: none; border-radius: 0 12px 12px 0; color: #718096; }
                    .forgot-link { padding: 0; font-size: 0.75rem; color: var(--primary-main); text-decoration: none; font-weight: 700; }
                    .modern-button { border-radius: 15px; border: none; box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: all 0.3s; }
                    .modern-button.primary { background: var(--primary-main); }
                    .modern-button.warning { background: #d4af37; }
                    .fw-800 { font-weight: 800; }
                    .fw-700 { font-weight: 700; }
                    .animate-fade-up { animation: fadeUp 0.6s ease-out; }
                    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                `}</style>
            </div>
        );
    }

    // --- DASHBOARD RENDER ---
    return (
        <main style={{ minHeight: '100vh', background: '#f8faf9', padding: '120px 0 50px' }}>
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div><h2 className="fw-800 m-0">Academy Dashboard</h2><p className="text-muted small">Logged in as {currentUser?.email}</p></div>
                    <Button variant="outline-danger" size="sm" onClick={logout} className="rounded-pill px-3">Sign Out</Button>
                </div>

                {saveStatus && <Alert variant={saveStatus.type} className="rounded-4 shadow-sm border-0">{saveStatus.msg}</Alert>}

                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                            <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
                                <Nav variant="tabs" activeKey={activeTab} onSelect={k => setActiveTab(k)} className="modern-tabs">
                                    <Nav.Item><Nav.Link eventKey="editor">Announcements</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="profile">Profile</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="courses">Courses</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="services">Services</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="sessions">Sessions</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="stories">Stories</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="users">Admins</Nav.Link></Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-4" style={{ minHeight: '500px' }}>

                                {activeTab === 'editor' && (
                                    <div className="animate-fade-in">
                                        <div className="d-flex justify-content-between mb-3"><h5 className="fw-800">Site-wide Banners</h5><Button size="sm" variant="success" className="rounded-pill" onClick={() => { setTempItem({ id: null, message: '', link: '', bgColor: '#d4af37', textColor: '#ffffff' }); setEditingId(null); setShowItemModal(true); }}>+ Add Message</Button></div>
                                        <div className="list-group list-group-flush mb-4 rounded-4 overflow-hidden border">
                                            {localConfig.items.map(item => (
                                                <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                    <div className="small d-flex align-items-center gap-3">
                                                        <div style={{ width: '12px', height: '12px', background: item.bgColor, borderRadius: '50%' }}></div>
                                                        <div dangerouslySetInnerHTML={{ __html: item.message }}></div>
                                                    </div>
                                                    <div className="d-flex gap-2">
                                                        <Button variant="light" size="sm" className="rounded-pill px-3" onClick={() => { setTempItem(item); setEditingId(item.id); setShowItemModal(true); }}>Edit</Button>
                                                        <Button variant="light" size="sm" className="rounded-pill px-2 text-danger" onClick={() => setLocalConfig(prev => ({ ...prev, items: prev.items.filter(i => i.id !== item.id) }))}>🗑️</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button className="w-100 py-3 fw-bold rounded-4 shadow-sm border-0" style={{ background: 'var(--primary-main)' }} onClick={() => { updateConfig(localConfig); setSaveStatus({ type: 'success', msg: 'Announcements Applied!' }); setTimeout(() => setSaveStatus(null), 3000); }}>Publish Banner Updates</Button>
                                    </div>
                                )}

                                {activeTab === 'profile' && (
                                    <div className="animate-fade-in">
                                        <Card className="profile-edit-card rounded-4 border-0 p-4 bg-light">
                                            <Row className="align-items-center mb-4">
                                                <Col md={3} className="text-center">
                                                    <div className="profile-img-preview mx-auto mb-2" style={{ backgroundImage: `url(${about.image})`, width: '100px', height: '100px' }}></div>
                                                    <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => setShowAboutModal(true)}>Edit Details</Button>
                                                </Col>
                                                <Col md={9}>
                                                    <h4 className="fw-800 mb-1">{about.name}</h4>
                                                    <p className="text-muted fw-bold small">{about.title}</p>
                                                    <p className="extra-small text-muted fst-italic">"{about.quote}"</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <h6 className="fw-800 small text-uppercase">Education ({about.education?.length || 0})</h6>
                                                    <div className="list-group list-group-flush small">{about.education?.slice(0, 3).map(e => <div key={e.id} className="list-group-item py-1 bg-transparent px-0 border-0">• {e.title}</div>)}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <h6 className="fw-800 small text-uppercase">Milestones ({about.experience?.length || 0})</h6>
                                                    <div className="list-group list-group-flush small">{about.experience?.slice(0, 3).map(e => <div key={e.id} className="list-group-item py-1 bg-transparent px-0 border-0">• {e.title}</div>)}</div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                )}

                                {activeTab === 'courses' && (
                                    <div className="animate-fade-in">
                                        <div className="d-flex justify-content-between mb-3"><h5 className="fw-800">Course Catalog</h5><Button size="sm" variant="success" className="rounded-pill" onClick={() => { setTempCourse({ title: '', price: '', duration: '', description: '', curriculum: [] }); setEditingId(null); setShowCourseModal(true); }}>+ New Course</Button></div>
                                        <Row className="g-3">
                                            {courses.map(c => (
                                                <Col md={6} key={c.id}>
                                                    <Card className="course-admin-card h-100 p-3 border-0 shadow-sm rounded-4 border-start border-4 border-success">
                                                        <h6 className="fw-800 mb-1">{c.title}</h6>
                                                        <p className="extra-small text-muted mb-3 fw-bold">{c.price} • {c.duration}</p>
                                                        <div className="d-flex gap-2">
                                                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => { setTempCourse(c); setEditingId(c.id); setShowCourseModal(true); }}>Edit</Button>
                                                            <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => { if (confirm("Delete this course?")) deleteCourse(c.id); }}>🗑️</Button>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}

                                {activeTab === 'services' && (
                                    <div className="animate-fade-in">
                                        <div className="d-flex justify-content-between mb-3"><h5 className="fw-800">Offerings & Clinical Care</h5><Button size="sm" variant="success" className="rounded-pill" onClick={() => { setTempService({ title: '', icon: '🌸', description: '', hero_title: '', approach_points: [], details: [], faqs: [] }); setEditingId(null); setShowServiceModal(true); }}>+ Create Service</Button></div>
                                        <Row className="g-3">
                                            {services.map(s => (
                                                <Col md={6} key={s.id}>
                                                    <Card className="course-admin-card h-100 p-3 border-0 shadow-sm rounded-4 border-start border-4 border-primary">
                                                        <div className="d-flex gap-2 align-items-center mb-1"><span className="fs-5">{s.icon}</span><h6 className="fw-800 m-0">{s.title}</h6></div>
                                                        <p className="extra-small text-muted mb-3">{s.description?.substring(0, 60)}...</p>
                                                        <div className="d-flex gap-2">
                                                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => { setTempService(s); setEditingId(s.id); setShowServiceModal(true); }}>Edit</Button>
                                                            <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => { if (confirm("Delete this service?")) deleteService(s.id); }}>🗑️</Button>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}

                                {activeTab === 'sessions' && (
                                    <div className="animate-fade-in">
                                        <div className="d-flex justify-content-between mb-3"><h5 className="fw-800">1-on-1 Sessions</h5><Button size="sm" variant="success" className="rounded-pill" onClick={() => { setTempSession({ title: '', price: '', description: '', features: [] }); setEditingId(null); setShowSessionModal(true); }}>+ New Session</Button></div>
                                        <Row className="g-3">
                                            {sessions.map(s => (
                                                <Col md={6} key={s.id}>
                                                    <Card className="course-admin-card h-100 p-3 border-0 shadow-sm rounded-4 border-start border-4 border-warning">
                                                        <h6 className="fw-800 mb-1">{s.title}</h6>
                                                        <p className="extra-small text-muted mb-3 fw-bold">{s.price}</p>
                                                        <div className="d-flex gap-2">
                                                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => { setTempSession(s); setEditingId(s.id); setShowSessionModal(true); }}>Edit</Button>
                                                            <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => { if (confirm("Delete session?")) deleteSession(s.id); }}>🗑️</Button>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}

                                {activeTab === 'stories' && (
                                    <div className="animate-fade-in">
                                        <div className="d-flex justify-content-between mb-3"><h5 className="fw-800">Clinical Success Stories</h5><Button size="sm" variant="success" className="rounded-pill" onClick={() => { setTempTestimonial({ name: '', loc: '', res: '', quote: '', avatar: '' }); setEditingId(null); setShowTestimonialModal(true); }}>+ Log Result</Button></div>
                                        <Row className="g-3">
                                            {testimonials.map(t => (
                                                <Col md={6} key={t.id}>
                                                    <Card className="course-admin-card h-100 p-3 border-0 shadow-sm rounded-4">
                                                        <div className="d-flex gap-3 align-items-center mb-2">
                                                            <div className="rounded-pill bg-light border d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '0.8rem', fontWeight: 'bold', backgroundImage: `url(${t.avatar})`, backgroundSize: 'cover' }}>{!t.avatar && t.name?.charAt(0)}</div>
                                                            <div><h6 className="fw-800 m-0 small">{t.name}</h6><p className="extra-small text-success m-0 fw-bold">{t.res}</p></div>
                                                        </div>
                                                        <div className="d-flex gap-2 mt-2">
                                                            <Button variant="link" size="sm" className="p-0 text-decoration-none small" onClick={() => { setTempTestimonial(t); setEditingId(t.id); setShowTestimonialModal(true); }}>Edit</Button>
                                                            <Button variant="link" size="sm" className="p-0 text-decoration-none small text-danger" onClick={() => { if (confirm("Remove story?")) deleteTestimonial(t.id); }}>Delete</Button>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}

                                {activeTab === 'users' && (
                                    <div className="animate-fade-in">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="fw-800">Management Team</h5>
                                            <div className="d-flex gap-2">
                                                <Button size="sm" variant="light" className="rounded-pill border" onClick={async () => { const res = await syncAdmins(); alert(res.success ? `Synced ${res.count} admins!` : res.message); }}>🔄 Sync Database</Button>
                                                <Button size="sm" variant="success" className="rounded-pill" onClick={() => setShowUserModal(true)}>+ Invite Admin</Button>
                                            </div>
                                        </div>
                                        <Table hover responsive borderless className="align-middle">
                                            <thead className="text-muted small border-bottom"><tr><th>Name</th><th>Official Email</th><th>Role</th><th>Action</th></tr></thead>
                                            <tbody>
                                                {users.map(u => (<tr key={u.id}>
                                                    <td className="fw-bold small">{u.name}</td>
                                                    <td className="small text-muted">{u.email}</td>
                                                    <td><Badge bg="dark" className="rounded-pill extra-small">{u.role}</Badge></td>
                                                    <td>{u.email !== currentUser?.email && <Button variant="link" size="sm" className="text-danger p-0" onClick={() => removeUser(u.email)}>Revoke</Button>}</td>
                                                </tr>))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <Card className="p-4 bg-dark text-white border-0 shadow-lg rounded-4 mb-4">
                                <h6 className="fw-800 mb-4 opacity-50 text-uppercase letter-spacing-1 small">Academy Performance</h6>
                                <div className="stat-row d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-secondary small">Staff Admins</span>
                                    <span className="fw-800 fs-5">{users.length}</span>
                                </div>
                                <div className="stat-row d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-secondary small">Course Catalog</span>
                                    <span className="fw-800 fs-5">{courses.length}</span>
                                </div>
                                <div className="stat-row d-flex justify-content-between align-items-center">
                                    <span className="text-secondary small">Success Stories</span>
                                    <span className="fw-800 fs-5">{testimonials.length}</span>
                                </div>
                            </Card>
                            <Alert variant="info" className="rounded-4 border-0 shadow-sm small d-flex gap-3 align-items-start">
                                <span className="fs-4">💡</span>
                                <div><b>Management Tip:</b> Changes saved here impact public SEO and content instantly. Always verify link slugs before saving.</div>
                            </Alert>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* --- MODALS --- */}

            {/* 1. Announcement Modal */}
            <Modal show={showItemModal} onHide={() => setShowItemModal(false)} centered>
                <Modal.Header closeButton><Modal.Title className="fw-800 h5">{editingId ? 'Edit Message' : 'New Banner'}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-700">Message (HTML Allowed)</Form.Label>
                            <Form.Control as="textarea" rows={2} className="modern-input" value={tempItem.message} onChange={e => setTempItem({ ...tempItem, message: e.target.value })} placeholder="e.g. <b>New Course!</b> Enrollment open." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-700">Link URL (Optional)</Form.Label>
                            <Form.Control className="modern-input" value={tempItem.link} onChange={e => setTempItem({ ...tempItem, link: e.target.value })} placeholder="/courses/pcos-specialization" />
                        </Form.Group>
                        <Row>
                            <Col><Form.Label className="small fw-700">Background</Form.Label><Form.Control type="color" className="modern-input px-1 py-1" value={tempItem.bgColor} onChange={e => setTempItem({ ...tempItem, bgColor: e.target.value })} /></Col>
                            <Col><Form.Label className="small fw-700">Text Color</Form.Label><Form.Control type="color" className="modern-input px-1 py-1" value={tempItem.textColor} onChange={e => setTempItem({ ...tempItem, textColor: e.target.value })} /></Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0"><Button variant="primary" className="w-100 rounded-pill fw-bold" onClick={handleSaveAnnouncement}>Confirm Changes</Button></Modal.Footer>
            </Modal>

            {/* 2. Profile Modal */}
            <Modal show={showAboutModal} onHide={() => setShowAboutModal(false)} size="lg" centered scrollable>
                <Modal.Header closeButton><Modal.Title className="fw-800 h5">Expert Profile Editor</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}><Form.Label className="small fw-700">Full Name</Form.Label><Form.Control className="modern-input" value={tempAbout.name} onChange={e => setTempAbout({ ...tempAbout, name: e.target.value })} /></Col>
                            <Col md={6}><Form.Label className="small fw-700">Professional Title</Form.Label><Form.Control className="modern-input" value={tempAbout.title} onChange={e => setTempAbout({ ...tempAbout, title: e.target.value })} /></Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-700">Profile Quote</Form.Label>
                            <Form.Control as="textarea" rows={2} className="modern-input" value={tempAbout.quote} onChange={e => setTempAbout({ ...tempAbout, quote: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-700">Profile Photo</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control className="modern-input" value={tempAbout.image} onChange={e => setTempAbout({ ...tempAbout, image: e.target.value })} />
                                <div style={{ position: 'relative', overflow: 'hidden' }}><Button variant="outline-success" className="px-3 rounded-3">{isUploading ? '...' : '📸'}</Button><input type="file" accept="image/*" style={{ position: 'absolute', top: 0, left: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} onChange={(e) => handleImageUpload(e.target.files[0], (url) => setTempAbout({ ...tempAbout, image: url }))} /></div>
                            </div>
                        </Form.Group>

                        <hr />
                        <h6 className="fw-800 small mb-3">Education & Degrees</h6>
                        {tempAbout.education?.map(edu => (
                            <div key={edu.id} className="d-flex gap-2 mb-2 p-2 rounded bg-light border small align-items-center">
                                <div className="flex-grow-1"><b>{edu.title}</b><br />{edu.sub}</div>
                                <Button variant="link" className="text-danger p-0" onClick={() => setTempAbout(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))}>x</Button>
                            </div>
                        ))}
                        <div className="d-flex gap-2 mb-4">
                            <Form.Control size="sm" className="modern-input" placeholder="Title" value={newEdu.title} onChange={e => setNewEdu({ ...newEdu, title: e.target.value })} />
                            <Form.Control size="sm" className="modern-input" placeholder="Institute" value={newEdu.sub} onChange={e => setNewEdu({ ...newEdu, sub: e.target.value })} />
                            <Button size="sm" onClick={() => { if (newEdu.title) { setTempAbout(prev => ({ ...prev, education: [...prev.education, { ...newEdu, id: Date.now() }] })); setNewEdu({ title: '', sub: '', desc: '' }); } }}>Add</Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button className="w-100 py-3 fw-bold modern-button primary" onClick={handleSaveAbout}>Commit Expert Bio</Button></Modal.Footer>
            </Modal>

            {/* 3. Course Modal */}
            <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} size="lg" centered scrollable>
                <Modal.Header closeButton><Modal.Title className="fw-800 h5">{editingId ? 'Edit Course' : 'Create Course'}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={8}><Form.Label className="small fw-700">Course Title</Form.Label><Form.Control className="modern-input" value={tempCourse.title || ''} onChange={e => setTempCourse({ ...tempCourse, title: e.target.value })} /></Col>
                            <Col md={4}><Form.Label className="small fw-700">Price (Show)</Form.Label><Form.Control className="modern-input" value={tempCourse.price || ''} onChange={e => setTempCourse({ ...tempCourse, price: e.target.value })} /></Col>
                        </Row>
                        <Form.Label className="small fw-700">Detailed Description</Form.Label>
                        <Form.Control as="textarea" rows={3} className="modern-input mb-3" value={tempCourse.description || ''} onChange={e => setTempCourse({ ...tempCourse, description: e.target.value })} />

                        <h6 className="fw-800 small text-uppercase mb-2">Curriculum Highlights</h6>
                        <div className="list-group mb-2">{tempCourse.curriculum?.map((c, i) => <div key={i} className="list-group-item d-flex justify-content-between py-1 small">{c}<Button variant="link" size="sm" className="text-danger p-0" onClick={() => setTempCourse(prev => ({ ...prev, curriculum: prev.curriculum.filter((_, idx) => idx !== i) }))}>x</Button></div>)}</div>
                        <InputGroup className="mb-4">
                            <Form.Control size="sm" placeholder="Add Topic..." value={newCurriculumItem} onChange={e => setNewCurriculumItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), setTempCourse(p => ({ ...p, curriculum: [...(p.curriculum || []), newCurriculumItem] })), setNewCurriculumItem(''))} />
                            <Button size="sm" variant="outline-success" onClick={() => { setTempCourse(p => ({ ...p, curriculum: [...(p.curriculum || []), newCurriculumItem] })); setNewCurriculumItem(''); }}>Add</Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button className="w-100 py-3 fw-bold modern-button primary" onClick={handleSaveCourse}>Save Course Repository</Button></Modal.Footer>
            </Modal>

            {/* 4. Service Modal */}
            <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} size="lg" centered scrollable>
                <Modal.Header closeButton><Modal.Title className="fw-800 h5">{editingId ? 'Edit Clinical Service' : 'New Service'}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={9}><Form.Label className="small fw-700">Service Title</Form.Label><Form.Control className="modern-input" value={tempService.title || ''} onChange={e => setTempService({ ...tempService, title: e.target.value })} /></Col>
                            <Col md={3}><Form.Label className="small fw-700">Icon</Form.Label><Form.Control className="modern-input" value={tempService.icon || ''} onChange={e => setTempService({ ...tempService, icon: e.target.value })} /></Col>
                        </Row>
                        <Form.Label className="small fw-700">Expert Hero Title</Form.Label>
                        <Form.Control className="modern-input mb-3" value={tempService.hero_title || ''} onChange={e => setTempService({ ...tempService, hero_title: e.target.value })} />
                        <Form.Label className="small fw-700">Card Preview Description</Form.Label>
                        <Form.Control as="textarea" rows={2} className="modern-input mb-4" value={tempService.description || ''} onChange={e => setTempService({ ...tempService, description: e.target.value })} />

                        <h6 className="fw-800 small mb-2">Conditions Included</h6>
                        <div className="d-flex flex-wrap gap-2 mb-3">{tempService.details?.map((d, i) => <Badge key={i} bg="primary" className="rounded-pill p-2" onClick={() => setTempService(prev => ({ ...prev, details: prev.details.filter((_, idx) => idx !== i) }))}>{d} x</Badge>)}</div>
                        <InputGroup className="mb-4">
                            <Form.Control size="sm" placeholder="e.g. Hormonal Imbalance" value={newServiceDetail} onChange={e => setNewServiceDetail(e.target.value)} />
                            <Button size="sm" variant="outline-primary" onClick={() => { setTempService(p => ({ ...p, details: [...(p.details || []), newServiceDetail] })); setNewServiceDetail(''); }}>Add Tag</Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button className="w-100 py-3 fw-bold modern-button primary" onClick={handleSaveService}>Commit Clinical Logic</Button></Modal.Footer>
            </Modal>

            {/* 5. Session Modal */}
            <Modal show={showSessionModal} onHide={() => setShowSessionModal(false)} centered scrollable>
                <Modal.Header closeButton><Modal.Title className="fw-800 h5">{editingId ? 'Modify Session' : 'New Intake Session'}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3"><Form.Label className="small fw-700">Session Name</Form.Label><Form.Control className="modern-input" value={tempSession.title || ''} onChange={e => setTempSession({ ...tempSession, title: e.target.value })} /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label className="small fw-700">Pricing</Form.Label><Form.Control className="modern-input" value={tempSession.price || ''} onChange={e => setTempSession({ ...tempSession, price: e.target.value })} /></Form.Group>
                        <Form.Group className="mb-4"><Form.Label className="small fw-700">General Overview</Form.Label><Form.Control as="textarea" className="modern-input" rows={2} value={tempSession.description || ''} onChange={e => setTempSession({ ...tempSession, description: e.target.value })} /></Form.Group>

                        <h6 className="fw-800 small mb-2">Inclusions (Bullets)</h6>
                        <div className="list-group mb-2">{tempSession.features?.map((f, i) => <div key={i} className="list-group-item d-flex justify-content-between p-2 small">{f}<Button variant="link" className="text-danger p-0" onClick={() => setTempSession(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }))}>x</Button></div>)}</div>
                        <InputGroup>
                            <Form.Control size="sm" placeholder="e.g. 45-min Zoom call" value={newSessionFeature} onChange={e => setNewSessionFeature(e.target.value)} />
                            <Button size="sm" onClick={() => { setTempSession(p => ({ ...p, features: [...(p.features || []), newSessionFeature] })); setNewSessionFeature(''); }}>Add</Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button className="w-100 py-3 fw-bold modern-button primary" onClick={handleSaveSession}>Save Session Profile</Button></Modal.Footer>
            </Modal>

            {/* 6. Stories Modal */}
            <Modal show={showTestimonialModal} onHide={() => setShowTestimonialModal(false)} centered>
                <Modal.Header closeButton><Modal.Title className="fw-800 h5">Log Success Story</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={7}><Form.Label className="small fw-700">Patient Name</Form.Label><Form.Control className="modern-input" value={tempTestimonial.name} onChange={e => setTempTestimonial({ ...tempTestimonial, name: e.target.value })} /></Col>
                            <Col md={5}><Form.Label className="small fw-700">Location</Form.Label><Form.Control className="modern-input" value={tempTestimonial.loc} onChange={e => setTempTestimonial({ ...tempTestimonial, loc: e.target.value })} /></Col>
                        </Row>
                        <Form.Group className="mb-3"><Form.Label className="small fw-700 text-success">Clinical Result</Form.Label><Form.Control className="modern-input" value={tempTestimonial.res} onChange={e => setTempTestimonial({ ...tempTestimonial, res: e.target.value })} placeholder="e.g. ✓ 12kg Loss in 3 Months" /></Form.Group>
                        <Form.Group className="mb-4"><Form.Label className="small fw-700">Patient Transformation Quote</Form.Label><Form.Control as="textarea" rows={3} className="modern-input" value={tempTestimonial.quote} onChange={e => setTempTestimonial({ ...tempTestimonial, quote: e.target.value })} /></Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer><Button className="w-100 py-3 fw-bold modern-button primary" onClick={handleSaveTestimonial}>Confirm Story Publication</Button></Modal.Footer>
            </Modal>

            {/* 7. User Invitation Modal */}
            <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
                <Modal.Header closeButton className="border-0 px-4 pt-4"><Modal.Title className="fw-800 h5">Invite New Academy Member</Modal.Title></Modal.Header>
                <Modal.Body className="px-4 pb-4">
                    <Form onSubmit={handleAddUser}>
                        <Form.Group className="mb-3"><Form.Label className="small fw-700">Full Name</Form.Label><Form.Control className="modern-input" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="Sarah Khan" /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label className="small fw-700">Official Email</Form.Label><Form.Control className="modern-input" type="email" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="sarah@academy.com" /></Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-700">Set Initial Password</Form.Label>
                            <InputGroup>
                                <Form.Control className="modern-input" type={showPassword ? "text" : "password"} required value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="••••••••" />
                                <Button variant="outline-success" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🫣' : '👁️'}</Button>
                            </InputGroup>
                            <Form.Text className="text-muted">Min. 6 characters for security.</Form.Text>
                        </Form.Group>
                        <Button type="submit" className="w-100 py-3 fw-800 modern-button primary">Grant Security Access</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <style jsx global>{`
                .modern-tabs .nav-link { border: none; color: #718096; font-weight: 700; padding: 1rem 1.2rem; transition: all 0.2s; font-size: 0.9rem; }
                .modern-tabs .nav-link.active { color: var(--primary-main); font-weight: 800; border-bottom: 3px solid var(--primary-main); }
                .course-admin-card { background: white; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .course-admin-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
                .profile-img-preview { border-radius: 50%; background-size: cover; background-position: center; border: 3px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
                .extra-small { font-size: 0.7rem; }
                .stat-row { border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.8rem; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </main>
    );
};

export default AdminDashboard;
