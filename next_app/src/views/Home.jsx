'use client';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { useContent } from '../context/ContentContext';

const Home = () => {
    const { testimonials } = useContent();
    return (
        <main>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <span className="section-label">Clinical Nutrition Excellence</span>
                    <h1>Transform Your Health with Evidence-Based Nutrition</h1>
                    <p className="text-lead">Specialized protocols for PCOS, Gut Health, and Metabolic Disorders. Empowering 10,000+ clients globally with personalized clinical nutrition.</p>
                    <div className="hero-actions">
                        <Link href="/quote" className="btn btn-accent btn-lg text-decoration-none">Start Your Journey</Link>
                        <Link href="/about" className="btn btn-outline btn-lg text-decoration-none" style={{ color: 'white', borderColor: 'white' }}>Meet Dr. Sehar</Link>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="section section-light">
                <Container>
                    <Row className="text-center">
                        {[
                            { val: '10,000+', label: 'Clients Transformed' },
                            { val: '150+', label: 'Specialized Protocols' },
                            { val: '50+', label: 'Countries Served' },
                            { val: '95%', label: 'Success Rate' }
                        ].map((stat, i) => (
                            <Col md={3} sm={6} xs={6} key={i} className="mb-4 mb-md-0">
                                <Reveal delay={i * 0.1}>
                                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '8px', lineHeight: 1 }}>
                                        {stat.val}
                                    </div>
                                    <div style={{ color: 'var(--neutral-700)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px', fontWeight: 600 }}>
                                        {stat.label}
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* SPECIALTIES SECTION */}
            <section className="section">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Clinical Expertise</span>
                        <h2>Core Specializations</h2>
                        <p className="text-lead">Evidence-based protocols for complex health challenges</p>
                    </div>

                    <Row className="g-4">
                        {[
                            { icon: '🌸', title: 'Hormonal Health', desc: 'PCOS, Insulin Resistance, Thyroid Disorders, and Menopause Management with targeted nutritional interventions.', link: '/services#hormonal' },
                            { icon: '🌿', title: 'Gut Health', desc: 'SIBO, IBS, IBD, and Gut-Brain Axis Restoration through personalized microbiome protocols.', link: '/services#gut' },
                            { icon: '💪', title: 'Metabolic Wellness', desc: 'Weight Management, Diabetes Reversal, and Cardiovascular Health optimization.', link: '/services#metabolic' },
                            { icon: '🤰', title: 'Maternal & Pediatric', desc: 'GDM Management, Prenatal Nutrition, and Infant Feeding Protocols for healthy development.', link: '/services#maternal' },
                            { icon: '🏃', title: 'Sports Performance', desc: 'Athletic Nutrition, MMA Weight Cuts, and RED-S Recovery for elite performers.', link: '/services#sports' },
                            { icon: '🧠', title: 'Clinical MNT', desc: 'Renal Disease, Autoimmune Conditions, and Chronic Illness Management protocols.', link: '/services#clinical' }
                        ].map((item, i) => (
                            <Col lg={4} md={6} key={i}>
                                <Reveal delay={i * 0.1}>
                                    <div className="specialty-card h-100">
                                        <div className="specialty-icon">{item.icon}</div>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                        <Link href={item.link} className="btn btn-ghost btn-sm mt-md text-decoration-none">Learn More →</Link>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="section section-dark" id="testimonials">
                <Container>
                    <div className="section-header">
                        <span className="section-label" style={{ background: 'var(--accent-gold)', color: 'var(--primary-deep)' }}>Success Stories</span>
                        <h2 style={{ color: 'white' }}>Real Results from Real Clients</h2>
                        <p className="text-lead" style={{ color: 'var(--accent-mint)' }}>Clinically verified transformations across the globe</p>
                    </div>

                    <Row className="g-4">
                        {testimonials.map((t, i) => (
                            <Col lg={4} md={6} key={i}>
                                <Reveal delay={i * 0.1}>
                                    <div className="testimonial-card h-100">
                                        <div className="testimonial-header">
                                            <div className="testimonial-avatar">{t.avatar}</div>
                                            <div className="testimonial-info">
                                                <h4>{t.name}</h4>
                                                <div className="testimonial-location">{t.loc}</div>
                                            </div>
                                        </div>
                                        <p>"{t.quote}"</p>
                                        <div className="testimonial-result">{t.res}</div>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>

                    <div className="text-center mt-xl">
                        <Button variant="link" className="btn btn-accent btn-lg text-decoration-none border-0 text-white">View All Success Stories</Button>
                    </div>
                </Container>
            </section>
            {/* GLOBAL PRESENCE SECTION */}
            <section className="section bg-light border-top border-bottom">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <Reveal>
                                <span className="section-label">International Network</span>
                                <h2 className="mb-4">Global Reach, Local Expertise</h2>
                                <p className="lead text-muted mb-4">
                                    Serving clients in over <strong>50 countries</strong> through advanced Telehealth protocols. From high-tech clusters in Dubai and London to 60+ clinical network points across Pakistan.
                                </p>
                                <div className="row g-3 mb-4">
                                    {[
                                        'Lahore & Islamabad', 'Karachi & Sindh Hubs',
                                        'Northern Pakistan (AJK-GB)', 'Dubai & Middle East',
                                        'UK & Europe (Telehealth)', 'North America (Telehealth)'
                                    ].map(item => (
                                        <div key={item} className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <span className="text-success me-2">📍</span>
                                                <span className="small fw-semibold">{item}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/sitemap-catalog" className="btn btn-outline-success btn-lg text-decoration-none">
                                    Explore Clinical Network →
                                </Link>
                            </Reveal>
                        </Col>
                        <Col lg={6}>
                            <Reveal delay={0.2}>
                                <div className="p-4 rounded-4 bg-white shadow-sm border">
                                    <h3 className="h5 mb-3 border-bottom pb-2">Top Served Locations</h3>
                                    <div className="d-flex flex-wrap gap-2">
                                        {[
                                            { name: 'Lahore', country: 'pakistan' },
                                            { name: 'Karachi', country: 'pakistan' },
                                            { name: 'Faisalabad', country: 'pakistan' },
                                            { name: 'Islamabad', country: 'pakistan' },
                                            { name: 'Rawalpindi', country: 'pakistan' },
                                            { name: 'Multan', country: 'pakistan' },
                                            { name: 'Peshawar', country: 'pakistan' },
                                            { name: 'Quetta', country: 'pakistan' },
                                            { name: 'Dubai', country: 'uae' },
                                            { name: 'Abu Dhabi', country: 'uae' }
                                        ].map(city => (
                                            <Link
                                                key={city.name}
                                                href={`/locations/${city.country}/${city.name.toLowerCase().replace(/ /g, '-')}`}
                                                className="btn btn-sm btn-light border text-capitalize"
                                            >
                                                {city.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <p className="mt-4 small text-muted">
                                        <em>Evidence-based nutrition protocols delivered directly to your doorstep, anywhere in the world.</em>
                                    </p>
                                </div>
                            </Reveal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA SECTION */}
            <section className="section section-accent">
                <Container className="text-center">
                    <h2 style={{ color: 'white', marginBottom: 'var(--space-md)' }}>Ready to Transform Your Health?</h2>
                    <p className="text-lead" style={{ color: 'var(--accent-mint)', marginBottom: 'var(--space-xl)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Get your personalized clinical nutrition assessment today. Join thousands of clients who have transformed their health with evidence-based protocols.
                    </p>
                    <Link href="/quote" className="btn btn-accent btn-lg text-decoration-none">Start Free Assessment</Link>
                </Container>
            </section>
        </main>
    );
};

export default Home;
