'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { useContent } from '../context/ContentContext';

const Services = () => {
    const { services } = useContent();
    return (
        <main>
            {/* HERO */}
            <section className="hero" style={{ padding: '100px 5% 60px' }}>
                <Container className="text-center">
                    <span className="section-label">Clinical Expertise</span>
                    <h1>Specialized Nutrition Services</h1>
                    <p className="text-lead">Evidence-based protocols for complex health challenges. Personalized clinical nutrition designed for your unique needs.</p>
                </Container>
            </section>

            {/* HORMONAL HEALTH */}
            <section id="hormonal" className="section">
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={6}>
                            <Reveal>
                                <span className="section-label">Hormonal Health</span>
                                <h2>PCOS & Hormonal Balance</h2>
                                <p className="text-lead">Comprehensive protocols for hormonal disorders</p>
                                <p>Our evidence-based approach addresses the root causes of hormonal imbalances through targeted nutritional interventions. We specialize in PCOS management, insulin resistance reversal, thyroid optimization, and menopause support.</p>
                                <h4 className="mt-4 mb-3">What We Treat:</h4>
                                <ul style={{ lineHeight: 2, color: 'var(--neutral-700)', listStyle: 'none', paddingLeft: 0 }}>
                                    {[
                                        'Polycystic Ovary Syndrome (PCOS)',
                                        'Insulin Resistance & Metabolic Syndrome',
                                        'Thyroid Disorders (Hashimoto\'s, Hypothyroidism)',
                                        'Menopause & Perimenopause Management',
                                        'Hormonal Acne & Skin Issues'
                                    ].map((item, i) => <li key={i}>✓ {item}</li>)}
                                </ul>
                            </Reveal>
                        </Col>
                        <Col lg={6}>
                            <Reveal delay={0.2}>
                                <div className="card card-featured">
                                    <div className="card-header">
                                        <h3 className="card-title">Hormonal Health Package</h3>
                                        <p className="card-subtitle">12-Week Protocol</p>
                                    </div>
                                    <div className="card-body">
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '10px' }}>$299</div>
                                        <p style={{ color: 'var(--neutral-700)', marginBottom: '20px' }}>Comprehensive hormonal restoration program</p>
                                        <h5 className="mb-3">Includes:</h5>
                                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                                            {[
                                                'Initial 60-min consultation',
                                                'Personalized meal plans',
                                                'Supplement protocols',
                                                'Weekly check-ins',
                                                'Lab interpretation',
                                                'Lifetime recipe access'
                                            ].map((item, i) => <li key={i}>✓ {item}</li>)}
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        <Link href="/quote" className="btn btn-accent w-100 text-decoration-none">Book Consultation</Link>
                                    </div>
                                </div>
                            </Reveal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* BENEFITS */}
            <section className="section section-light">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Why Choose Us</span>
                        <h2>Evidence-Based Approach</h2>
                        <p className="text-lead">Clinical excellence backed by science</p>
                    </div>
                    <Row className="g-4">
                        {[
                            { icon: '🔬', title: 'Science-Backed Protocols', desc: 'Every recommendation is based on peer-reviewed research and clinical evidence. No fad diets or quick fixes.' },
                            { icon: '👤', title: 'Personalized Plans', desc: 'Customized nutrition protocols tailored to your unique health history, genetics, and lifestyle.' },
                            { icon: '📊', title: 'Measurable Results', desc: 'Track your progress with clinical markers, symptom reduction, and objective health improvements.' }
                        ].map((item, i) => (
                            <Col md={4} key={i}>
                                <Reveal delay={i * 0.1}>
                                    <div className="card h-100">
                                        <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--accent-mint), var(--accent-sage))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px' }}>
                                            {item.icon}
                                        </div>
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* GUT HEALTH */}
            <section id="gut" className="section">
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={6} className="order-lg-1 order-2">
                            <Reveal>
                                <div className="card card-featured">
                                    <div className="card-header">
                                        <h3 className="card-title">Gut Health Restoration</h3>
                                        <p className="card-subtitle">16-Week Protocol</p>
                                    </div>
                                    <div className="card-body">
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '10px' }}>$349</div>
                                        <p style={{ color: 'var(--neutral-700)', marginBottom: '20px' }}>Comprehensive gut microbiome optimization</p>
                                        <h5 className="mb-3">Includes:</h5>
                                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                                            {[
                                                'SIBO/IBS protocols',
                                                'Elimination diet guidance',
                                                'Probiotic recommendations',
                                                'Gut-brain axis support',
                                                'Bi-weekly consultations',
                                                'Food sensitivity testing'
                                            ].map((item, i) => <li key={i}>✓ {item}</li>)}
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        <Link href="/quote" className="btn btn-accent w-100 text-decoration-none">Book Consultation</Link>
                                    </div>
                                </div>
                            </Reveal>
                        </Col>
                        <Col lg={6} className="order-lg-2 order-1">
                            <Reveal delay={0.2}>
                                <span className="section-label">Gut Health</span>
                                <h2>Digestive Wellness</h2>
                                <p className="text-lead">Restore your gut, transform your health</p>
                                <p>The gut is the foundation of overall health. Our comprehensive protocols address SIBO, IBS, IBD, and other digestive disorders through targeted nutritional interventions and microbiome optimization.</p>
                                <h4 className="mt-4 mb-3">Conditions We Address:</h4>
                                <ul style={{ lineHeight: 2, color: 'var(--neutral-700)', listStyle: 'none', paddingLeft: 0 }}>
                                    {[
                                        'Small Intestinal Bacterial Overgrowth (SIBO)',
                                        'Irritable Bowel Syndrome (IBS)',
                                        'Inflammatory Bowel Disease (IBD)',
                                        'Leaky Gut Syndrome',
                                        'Food Sensitivities & Intolerances',
                                        'Chronic Bloating & Digestive Distress'
                                    ].map((item, i) => <li key={i}>✓ {item}</li>)}
                                </ul>
                            </Reveal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* METABOLIC WELLNESS */}
            <section id="metabolic" className="section section-light">
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={6}>
                            <Reveal>
                                <span className="section-label">Metabolic Wellness</span>
                                <h2>Weight & Metabolic Health</h2>
                                <p className="text-lead">Sustainable weight management and metabolic optimization</p>
                                <p>Our metabolic wellness programs focus on long-term health, not quick fixes. We address insulin resistance, diabetes, cardiovascular health, and sustainable weight management through evidence-based nutrition.</p>
                                <h4 className="mt-4 mb-3">Our Approach:</h4>
                                <ul style={{ lineHeight: 2, color: 'var(--neutral-700)', listStyle: 'none', paddingLeft: 0 }}>
                                    {[
                                        'Type 2 Diabetes Reversal',
                                        'Cardiovascular Disease Prevention',
                                        'Metabolic Syndrome Management',
                                        'Sustainable Weight Loss',
                                        'Blood Sugar Optimization'
                                    ].map((item, i) => <li key={i}>✓ {item}</li>)}
                                </ul>
                            </Reveal>
                        </Col>
                        <Col lg={6}>
                            <Reveal delay={0.2}>
                                <div className="card card-featured">
                                    <div className="card-header">
                                        <h3 className="card-title">Metabolic Reset Program</h3>
                                        <p className="card-subtitle">12-Week Protocol</p>
                                    </div>
                                    <div className="card-body">
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '10px' }}>$279</div>
                                        <p style={{ color: 'var(--neutral-700)', marginBottom: '20px' }}>Complete metabolic transformation</p>
                                        <h5 className="mb-3">Includes:</h5>
                                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                                            {[
                                                'Metabolic assessment',
                                                'Personalized meal plans',
                                                'Exercise integration',
                                                'Blood sugar monitoring',
                                                'Weekly accountability',
                                                'Maintenance protocols'
                                            ].map((item, i) => <li key={i}>✓ {item}</li>)}
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        <Link href="/quote" className="btn btn-accent w-100 text-decoration-none">Book Consultation</Link>
                                    </div>
                                </div>
                            </Reveal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ALL SERVICES OVERVIEW */}
            <section className="section">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Complete Care</span>
                        <h2>All Clinical Services</h2>
                    </div>
                    <Row className="g-4">
                        {services.map((item, i) => (
                            <Col md={4} key={item.id || i}>
                                <Reveal delay={i * 0.1}>
                                    <div className="card h-100">
                                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <Link href="/quote" className="btn btn-ghost btn-sm mt-md text-decoration-none">Learn More →</Link>
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
                    <h2 style={{ color: 'white', marginBottom: 'var(--space-md)' }}>Ready to Start Your Transformation?</h2>
                    <p className="text-lead" style={{ color: 'var(--accent-mint)', marginBottom: 'var(--space-xl)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Book your free 15-minute discovery call to discuss your health goals and find the right protocol for you.
                    </p>
                    <Link href="/quote" className="btn btn-accent btn-lg text-decoration-none">Schedule Free Consultation</Link>
                </Container>
            </section>
        </main>
    );
};

export default Services;
