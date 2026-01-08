'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { useContent } from '../context/ContentContext';

const About = () => {
    const { about } = useContent();

    return (
        <>
            {/* HERO */}
            <section className="hero" style={{ padding: '80px 5% 60px' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <div className="hero-content text-start p-0">
                                <span className="section-label ms-0">Clinical Excellence</span>
                                <h1 className="ms-0 text-start">Meet {about.name}</h1>
                                <p className="text-lead text-start ms-0" style={{ maxWidth: '600px', marginBottom: '30px' }}>
                                    {about.hero_tagline}
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '30px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <p style={{ color: 'white', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px', fontStyle: 'italic' }}>
                                        "{about.quote}"
                                    </p>
                                    <div style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>— {about.name}, {about.title}</div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <Reveal delay={0.3}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '20px', left: '20px', width: '100%', height: '100%', border: '2px solid var(--accent-gold)', borderRadius: '30px', zIndex: 0 }}></div>
                                    <img
                                        src={about.image}
                                        alt={about.name}
                                        style={{ width: '100%', borderRadius: '30px', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-xl)' }}
                                    />
                                </div>
                            </Reveal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CREDENTIALS */}
            <section className="section section-light">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Qualifications</span>
                        <h2>Clinical Credentials & Expertise</h2>
                    </div>
                    <Row className="g-4">
                        <Col md={6}>
                            <Reveal>
                                <div className="card h-100">
                                    <h3 style={{ color: 'var(--primary-main)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '2rem' }}>🎓</span> Education & Certifications
                                    </h3>
                                    {about.education?.map((item) => (
                                        <div className="mb-4" key={item.id}>
                                            <h5 style={{ color: 'var(--accent-gold)', marginBottom: '8px' }}>{item.title}</h5>
                                            <p style={{ color: 'var(--neutral-700)', fontSize: '0.9rem', marginBottom: '5px' }}>{item.sub}</p>
                                            <p style={{ color: 'var(--neutral-700)', fontSize: '0.85rem' }}>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </Col>
                        <Col md={6}>
                            <Reveal delay={0.2}>
                                <div className="card h-100">
                                    <h3 style={{ color: 'var(--primary-main)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '2rem' }}>🏆</span> Experience & Achievements
                                    </h3>
                                    {about.experience?.map((item) => (
                                        <div className="mb-4" key={item.id}>
                                            <h5 style={{ color: 'var(--accent-gold)', marginBottom: '8px' }}>{item.title}</h5>
                                            <p style={{ color: 'var(--neutral-700)', fontSize: '0.9rem' }}>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Rest of the sections (Specialization, Philosophy, etc) stay mostly static or can be moved to context too if needed */}


            {/* SPECIALIZATION AREAS */}
            <section className="section">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Clinical Expertise</span>
                        <h2>Areas of Specialization</h2>
                        <p className="text-lead">Comprehensive clinical nutrition across multiple disciplines</p>
                    </div>
                    <Row className="g-4">
                        {[
                            { icon: '🌸', title: 'Hormonal Disorders', desc: 'PCOS, insulin resistance, thyroid dysfunction, and menopause management' },
                            { icon: '🌿', title: 'Digestive Health', desc: 'SIBO, IBS, IBD, and comprehensive gut microbiome restoration' },
                            { icon: '💪', title: 'Metabolic Wellness', desc: 'Diabetes reversal, weight management, and cardiovascular health' },
                            { icon: '🤰', title: 'Maternal Health', desc: 'GDM management, prenatal nutrition, and postpartum recovery' },
                            { icon: '🏃', title: 'Sports Nutrition', desc: 'Athletic performance, MMA weight cuts, and RED-S recovery' },
                            { icon: '🧠', title: 'Medical Nutrition', desc: 'Renal disease, autoimmune conditions, and chronic illness' }
                        ].map((item, i) => (
                            <Col lg={4} md={6} key={i}>
                                <Reveal delay={i * 0.1}>
                                    <div className="card h-100 reveal active" style={{ opacity: 1, transform: 'translateY(0px)' }}>
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

            {/* PHILOSOPHY */}
            <section className="section section-dark">
                <Container>
                    <div className="section-header">
                        <span className="section-label" style={{ background: 'var(--accent-gold)', color: 'var(--primary-deep)' }}>Our Philosophy</span>
                        <h2 style={{ color: 'white' }}>Evidence-Based, Patient-Centered Care</h2>
                    </div>
                    <Row className="gy-5">
                        <Col md={6}>
                            <Reveal>
                                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Root-Cause Approach</h3>
                                <p style={{ color: 'var(--neutral-200)', lineHeight: '1.8' }}>
                                    We don't just treat symptoms—we identify and address the underlying causes of your health
                                    challenges. Through comprehensive assessment, advanced testing, and personalized protocols, we
                                    create sustainable solutions that transform your health from the inside out.
                                </p>
                            </Reveal>
                        </Col>
                        <Col md={6}>
                            <Reveal delay={0.2}>
                                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Science Meets Compassion</h3>
                                <p style={{ color: 'var(--neutral-200)', lineHeight: '1.8' }}>
                                    Every recommendation is backed by peer-reviewed research and clinical evidence, but delivered
                                    with empathy and understanding. We recognize that health is deeply personal, and our protocols
                                    are designed to fit your unique lifestyle, preferences, and goals.
                                </p>
                            </Reveal>
                        </Col>
                    </Row>
                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                            <h3 style={{ color: 'white', marginBottom: '20px', marginTop: '10px' }}>Our Core Values</h3>
                            <Row className="g-4">
                                {[
                                    { icon: '🔬', title: 'Evidence-Based', desc: 'Every protocol backed by research' },
                                    { icon: '👤', title: 'Personalized', desc: 'Customized to your unique needs' },
                                    { icon: '📊', title: 'Results-Driven', desc: 'Measurable, sustainable outcomes' }
                                ].map((item, i) => (
                                    <Col md={4} key={i}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{item.icon}</div>
                                        <h5 style={{ color: 'var(--accent-mint)', marginBottom: '8px' }}>{item.title}</h5>
                                        <p style={{ color: 'var(--neutral-300)', fontSize: '0.9rem' }}>{item.desc}</p>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>

            {/* MEMBERSHIPS */}
            <section className="section section-light">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Professional Affiliations</span>
                        <h2>Memberships & Certifications</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        {['International PCOS Association', 'Institute for Functional Medicine', 'American Nutrition Association', 'International Society of Sports Nutrition'].map((m) => (
                            <div className="badge badge-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }} key={m}>{m}</div>
                        ))}
                        <div className="badge badge-accent" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>Board Certified Nutritionist</div>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section-accent">
                <Container className="text-center">
                    <h2 style={{ color: 'white', marginBottom: 'var(--space-md)' }}>Ready to Transform Your Health?</h2>
                    <p className="text-lead" style={{ color: 'var(--accent-mint)', marginBottom: 'var(--space-xl)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Schedule your personalized consultation and discover how evidence-based clinical nutrition can transform your life.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/quote" className="btn btn-accent btn-lg text-decoration-none">Book Free Consultation</Link>
                        <Link href="/services" className="btn btn-outline btn-lg text-decoration-none" style={{ borderColor: 'white', color: 'white' }}>View Services</Link>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default About;
