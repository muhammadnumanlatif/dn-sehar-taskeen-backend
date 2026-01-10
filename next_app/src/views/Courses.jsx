'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { useCourse } from '../context/ContentContext';

const Courses = () => {
    const { courses } = useCourse();

    return (
        <main>
            {/* HERO */}
            <section className="hero" style={{ padding: '100px 5% 60px' }}>
                <Container className="text-center">
                    <span className="section-label">Professional Education</span>
                    <h1>Clinical Nutrition Courses</h1>
                    <p className="text-lead">Master evidence-based protocols and become a certified clinical nutrition specialist</p>
                </Container>
            </section>

            {/* COURSES GRID */}
            <section className="section">
                <Container>
                    <Row className="g-4">
                        {courses.map((course, index) => (
                            <Col lg={4} md={6} key={course.id || index}>
                                <Reveal delay={index * 0.1}>
                                    <div className={`card h-100 ${index === 0 ? 'card-featured' : ''}`}>
                                        <div className="card-header">
                                            {index === 0 && <span className="badge badge-accent">Most Popular</span>}
                                            {course.schedule_date && <span className="badge bg-info text-dark mb-2 ms-2">Live: {course.schedule_day} {course.schedule_time}</span>}
                                            <h3 className="card-title mt-2">{course.title}</h3>
                                            <p className="card-subtitle">{course.duration}</p>
                                        </div>
                                        <div className="card-body">
                                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '10px' }}>{course.price}</div>
                                            <p>{course.description}</p>
                                            <h5 className="mt-4 mb-3">What You'll Learn:</h5>
                                            <ul style={{ lineHeight: 2, color: 'var(--neutral-700)', listStyle: 'none', paddingLeft: 0 }}>
                                                {course.curriculum && course.curriculum.slice(0, 6).map((item, i) => (
                                                    <li key={i}>✓ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <Link href="/quote" className="btn btn-primary w-100 text-decoration-none">Enroll Now</Link>
                                        </div>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section section-light">
                <Container>
                    <div className="section-header">
                        <span className="section-label">Why Choose Our Courses</span>
                        <h2>Professional Training Excellence</h2>
                    </div>
                    <Row className="g-4">
                        {[
                            { icon: '🎓', title: 'Accredited Certification', desc: 'Internationally recognized credentials upon completion' },
                            { icon: '📚', title: 'Evidence-Based Curriculum', desc: 'Latest research and clinical protocols' },
                            { icon: '👥', title: 'Expert Mentorship', desc: 'Direct access to Dr. Sehar Taskeen' }
                        ].map((item, i) => (
                            <Col md={4} key={i}>
                                <Reveal delay={i * 0.1}>
                                    <div className="card h-100">
                                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
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
                    <h2 style={{ color: 'white', marginBottom: 'var(--space-md)' }}>Ready to Advance Your Career?</h2>
                    <p className="text-lead" style={{ color: 'var(--accent-mint)', marginBottom: 'var(--space-xl)' }}>
                        Join hundreds of certified nutritionists worldwide
                    </p>
                    <Link href="/quote" className="btn btn-accent btn-lg text-decoration-none">View All Courses</Link>
                </Container>
            </section>
        </main>
    );
};

export default Courses;
