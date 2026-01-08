'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const Footer = () => {
    const [isHydrated, setIsHydrated] = React.useState(false);
    React.useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <footer style={{ background: 'var(--primary-deep)', color: 'white', padding: '60px 0 30px' }}>
            <Container>
                <Row className="gy-4">
                    <Col lg={3} md={6}>
                        <h3 style={{ color: 'white', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>Dr. Sehar Taskeen</h3>
                        <p style={{ color: 'var(--neutral-300)', fontSize: '0.9rem' }}>
                            Evidence-based clinical nutrition specializing in PCOS, Gut Health, and Metabolic Disorders. Empowering global health through personalized protocols.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                            {isHydrated && ['📘', '📷', '🔗'].map((icon, i) => (
                                <a key={i} href="#" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: 'all 0.3s' }}>
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </Col>

                    <Col lg={3} md={6}>
                        <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Services</h4>
                        <ul className="list-unstyled">
                            {isHydrated && [
                                { name: 'Hormonal Health', path: '/services/hormonal-health' },
                                { name: 'Gut Health', path: '/services/gut-health' },
                                { name: 'Metabolic Wellness', path: '/services/metabolic-wellness' },
                                { name: 'Sports Performance', path: '/services/sports-performance' },
                                { name: 'Maternal Care', path: '/services/maternal-pediatric' }
                            ].map((item, i) => (
                                <li key={i} className="mb-2">
                                    <Link href={item.path} style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.3s' }}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Locations</h4>
                        <ul className="list-unstyled">
                            {isHydrated && [
                                { name: 'Lahore', path: '/locations/pakistan/lahore' },
                                { name: 'Islamabad', path: '/locations/pakistan/islamabad' },
                                { name: 'Dubai', path: '/locations/uae/dubai' },
                                { name: 'Online / Global', path: '/locations/global' }
                            ].map((item, i) => (
                                <li key={i} className="mb-2">
                                    <Link href={item.path} style={{ color: 'var(--neutral-300)', textDecoration: 'none', transition: 'color 0.3s' }}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Presence</h4>
                        <p style={{ color: 'var(--neutral-300)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Serving clients in 50+ countries including Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Oman, UK, USA, and Turkey.
                        </p>
                        <div className="mt-3">
                            <span className="badge badge-success">Verified Nutritionist</span>
                        </div>
                    </Col>
                </Row>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '30px', textAlign: 'center', color: 'var(--neutral-300)', fontSize: '0.875rem' }}>
                    <p className="mb-2">© {isHydrated ? new Date().getFullYear() : '2026'} Dr. Sehar Taskeen | Optimum Nutrafit Academy. All rights reserved.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link href="/privacy-policy" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Privacy Policy</Link>
                        <span>|</span>
                        <Link href="/terms" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Terms of Service</Link>
                        <span>|</span>
                        <Link href="/data-deletion" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Data Deletion</Link>
                        <span>|</span>
                        <Link href="/sitemap-catalog" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Sitemap</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
