'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { useContent } from '../context/ContentContext';

const Sessions = () => {
    const { sessions } = useContent();
    return (
        <main>
            {/* HERO */}
            <section className="hero" style={{ padding: '100px 5% 60px' }}>
                <Container className="text-center">
                    <span className="section-label">Personalized Care</span>
                    <h1>1-on-1 Consultation Sessions</h1>
                    <p className="text-lead">Expert guidance tailored to your unique health journey</p>
                </Container>
            </section>

            {/* SESSIONS & PACKAGES */}
            <section className="section">
                <Container>
                    <Row className="g-4">
                        {sessions.map((item, i) => (
                            <Col lg={4} md={6} key={item.id || i}>
                                <Reveal delay={i * 0.1}>
                                    <div className={`card h-100 ${item.price && parseInt(item.price.replace(/\D/g, '')) > 200 ? 'card-featured' : 'specialty-card'}`}>
                                        <div className="card-header" style={{ background: 'transparent', border: 'none', padding: '0' }}>
                                            {item.price && parseInt(item.price.replace(/\D/g, '')) > 500 && <span className="badge badge-accent mb-2">Best Value</span>}
                                            {item.schedule_date && <span className="badge bg-info text-dark mb-2 ms-2">📅 {item.schedule_day} {item.schedule_time}</span>}
                                            <h3 className="card-title mt-2">{item.title}</h3>
                                            <p className="card-subtitle">{item.description}</p>
                                        </div>
                                        <div className="card-body" style={{ padding: '1rem 0' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '20px' }}>{item.price}</div>
                                            <ul style={{ textAlign: 'left', lineHeight: 2, color: 'var(--neutral-700)', fontSize: '0.9rem', listStyle: 'none', paddingLeft: 0 }}>
                                                {item.features && item.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                                            </ul>
                                        </div>
                                        <div className="card-footer" style={{ background: 'transparent', border: 'none', padding: '0' }}>
                                            <Link href="/quote" className="btn btn-primary w-100 text-decoration-none">Book Now →</Link>
                                        </div>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section-accent">
                <Container className="text-center">
                    <h2 style={{ color: 'white', marginBottom: 'var(--space-md)' }}>Ready to Start Your Journey?</h2>
                    <p className="text-lead" style={{ color: 'var(--accent-mint)', marginBottom: 'var(--space-xl)' }}>
                        Book your consultation today and take the first step toward optimal health
                    </p>
                    <Link href="/quote" className="btn btn-accent btn-lg text-decoration-none">Schedule Consultation</Link>
                </Container>
            </section>
        </main>
    );
};

export default Sessions;
