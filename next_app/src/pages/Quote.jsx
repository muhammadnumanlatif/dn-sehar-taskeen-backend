'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { handleStatus } from '../utils/statusHandler';
import { useContent } from '../context/ContentContext';

const Quote = () => {
    const { courses, services, sessions } = useContent();
    const totalSteps = 3;
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        service_type: '',
        health_concern: '',
        previous_consultation: 'No',
        course_interest: '',
        profession: '',
        group_topic: '',
        name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        message: '',
        _honeypot: '' // Hidden field to catch bots
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            if (currentStep === 1) {
                if (!formData.service_type) {
                    alert("Please select a service type");
                    return;
                }
                if (formData.service_type === '1-on-1 Consultation' && !formData.health_concern) {
                    alert("Please select a primary health concern");
                    return;
                }
                if (formData.service_type === 'Professional Course' && (!formData.course_interest || !formData.profession)) {
                    alert("Please complete course details");
                    return;
                }
                if (formData.service_type === 'Group Session' && !formData.group_topic) {
                    alert("Please select a group topic");
                    return;
                }
            }
            if (currentStep === 2) {
                if (!formData.name || !formData.email || !formData.phone || !formData.country) {
                    alert("Please fill in all required fields");
                    return;
                }
            }

            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Anti-spam check
        if (formData._honeypot) {
            console.log("Bot detected!");
            return;
        }

        setIsSubmitting(true);
        const form = e.target;

        fetch(form.action, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            const statusResult = handleStatus(response.status);

            if (response.ok) {
                alert(statusResult.message);
                form.reset();
                setFormData({
                    service_type: '', health_concern: '', previous_consultation: 'No', course_interest: '', profession: '', group_topic: '', name: '', email: '', phone: '', country: '', city: '', message: '', _honeypot: ''
                });
                setCurrentStep(1);
            } else {
                alert(`${statusResult.title}: ${statusResult.message}`);
            }
        }).catch(error => {
            alert("Network Error: Please check your connection and try again.");
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    const getStep3Title = () => {
        if (formData.service_type === '1-on-1 Consultation') return "Step 3: Tell us about your health goals";
        if (formData.service_type === 'Professional Course') return "Step 3: Tell us about your career goals";
        if (formData.service_type === 'Group Session') return "Step 3: Group Session Details";
        return "Step 3: Tell us how we can help";
    };

    const getStep3Label = () => {
        if (formData.service_type === '1-on-1 Consultation') return "Describe your health goals and challenges";
        if (formData.service_type === 'Professional Course') return "Why do you want to take this course? What is your background?";
        if (formData.service_type === 'Group Session') return "Any specific questions or expectations for the group session?";
        return "Describe what you need guidance with";
    };

    return (
        <main>
            <section className="hero" style={{ padding: '100px 5% 60px' }}>
                <Container className="text-center">
                    <span className="section-label">Start Your Journey</span>
                    <h1>Get Your Free Health Assessment</h1>
                    <p className="text-lead">Discover personalized nutrition solutions for your unique health goals</p>
                </Container>
            </section>

            <section className="section">
                <Container style={{ maxWidth: '800px' }}>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Free Consultation Request</h3>
                            <p className="card-subtitle">Complete the 3-step form below</p>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-4 position-relative">
                                {[1, 2, 3].map(step => (
                                    <div key={step}
                                        style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: step < currentStep ? 'var(--primary-main)' : step === currentStep ? 'var(--accent-gold)' : 'var(--neutral-200)',
                                            color: step < currentStep ? 'white' : step === currentStep ? 'var(--primary-deep)' : 'var(--neutral-700)',
                                            fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.3s ease', zIndex: 1
                                        }}
                                    >
                                        {step}
                                    </div>
                                ))}
                                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: 'var(--neutral-200)', zIndex: 0, transform: 'translateY(-50%)' }}>
                                    <div style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`, height: '100%', background: 'var(--primary-main)', transition: 'width 0.3s ease' }}></div>
                                </div>
                            </div>

                            <Form onSubmit={handleSubmit} method="POST" action="https://formspree.io/f/xnjaozzw">
                                {currentStep === 1 && (
                                    <div className="animate-fade-in">
                                        <h3 className="mb-4">Step 1: What are you interested in?</h3>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Select Service Type *</Form.Label>
                                            <Form.Select name="service_type" value={formData.service_type} onChange={handleChange} required>
                                                <option value="">Choose a service...</option>
                                                <option value="1-on-1 Consultation">1-on-1 Consultation</option>
                                                <option value="Professional Course">Professional Course</option>
                                                <option value="Group Session">Group Session</option>
                                                <option value="Not Sure">Not Sure / Need Guidance</option>
                                            </Form.Select>
                                        </Form.Group>

                                        {formData.service_type === '1-on-1 Consultation' && (
                                            <div className="animate-fade-in">
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">Primary Health Concern *</Form.Label>
                                                    <Form.Select name="health_concern" value={formData.health_concern} onChange={handleChange} required>
                                                        <option value="">Select your main concern...</option>
                                                        {services.map(s => (
                                                            <option key={s.id} value={s.title}>{s.title}</option>
                                                        ))}
                                                        <option value="Other">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">Have you consulted a nutritionist before?</Form.Label>
                                                    <Form.Select name="previous_consultation" value={formData.previous_consultation} onChange={handleChange}>
                                                        <option value="No">No, this is my first time</option>
                                                        <option value="Yes">Yes</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        )}

                                        {formData.service_type === 'Professional Course' && (
                                            <div className="animate-fade-in">
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">Which Course are you interested in? *</Form.Label>
                                                    <Form.Select name="course_interest" value={formData.course_interest} onChange={handleChange} required>
                                                        <option value="">Select a course...</option>
                                                        {courses.map(c => (
                                                            <option key={c.id} value={c.title}>{c.title}</option>
                                                        ))}
                                                        <option value="Not Sure">Not Sure / Recommend one</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">Current Profession *</Form.Label>
                                                    <Form.Select name="profession" value={formData.profession} onChange={handleChange} required>
                                                        <option value="">Select profession...</option>
                                                        <option value="Nutritionist/Dietitian">Nutritionist / Dietitian</option>
                                                        <option value="Health Coach">Health Coach</option>
                                                        <option value="Personal Trainer">Personal Trainer</option>
                                                        <option value="Medical Doctor">Medical Doctor</option>
                                                        <option value="Student">Student</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        )}

                                        {formData.service_type === 'Group Session' && (
                                            <div className="animate-fade-in">
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">Preferred Topic *</Form.Label>
                                                    <Form.Select name="group_topic" value={formData.group_topic} onChange={handleChange} required>
                                                        <option value="">Select topic...</option>
                                                        <option value="PCOS Support">PCOS Support Group</option>
                                                        <option value="Weight Loss Challenge">Weight Loss Challenge</option>
                                                        <option value="Gut Healing">Gut Healing Workshop</option>
                                                        <option value="General Wellness">General Wellness</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        )}

                                        <Button variant="accent" size="lg" className="w-100" onClick={nextStep}>Next Step →</Button>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="animate-fade-in">
                                        <h3 className="mb-4">Step 2: Your Information</h3>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Full Name *</Form.Label>
                                            <Form.Control type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                                        </Form.Group>
                                        <Row className="g-3 mb-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-bold">Email Address *</Form.Label>
                                                    <Form.Control type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-bold">Phone Number *</Form.Label>
                                                    <Form.Control type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="g-3 mb-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-bold">Country *</Form.Label>
                                                    <Form.Select name="country" value={formData.country} onChange={handleChange} required>
                                                        <option value="">Select your country</option>
                                                        <option value="Pakistan">Pakistan</option>
                                                        <option value="UAE">United Arab Emirates</option>
                                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                                        <option value="Qatar">Qatar</option>
                                                        <option value="Kuwait">Kuwait</option>
                                                        <option value="Oman">Oman</option>
                                                        <option value="UK">United Kingdom</option>
                                                        <option value="USA">United States</option>
                                                        <option value="Turkey">Turkey</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-bold">City</Form.Label>
                                                    <Form.Control type="text" name="city" placeholder="Your city" value={formData.city} onChange={handleChange} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="d-flex gap-3">
                                            <Button variant="outline-dark" className="flex-grow-1" onClick={prevStep}>← Back</Button>
                                            <Button variant="accent" size="lg" className="flex-grow-1" onClick={nextStep}>Next Step →</Button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="animate-fade-in">
                                        <h3 className="mb-4">{getStep3Title()}</h3>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold">{getStep3Label()}</Form.Label>
                                            <Form.Control as="textarea" rows={6} name="message" placeholder="Please provide any additional details that will help us understand your needs..." value={formData.message} onChange={handleChange} />
                                        </Form.Group>

                                        <div style={{ background: 'var(--neutral-100)', padding: '20px', borderRadius: '12px', marginBottom: '20px', borderLeft: '4px solid var(--primary-main)' }}>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--neutral-700)', margin: 0 }}>
                                                <strong>Privacy & Data:</strong> Your data is secure. By submitting, you agree to our <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>.
                                                You can request <Link href="/data-deletion" target="_blank">Data Deletion</Link> at any time.
                                            </p>
                                        </div>

                                        <div style={{ background: 'rgba(25, 135, 84, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', margin: 0 }}>
                                                <strong>What happens next?</strong> After submitting, our team will review your information and contact you within 24 hours to schedule your session.
                                            </p>
                                        </div>

                                        <div className="d-flex gap-3">
                                            <Button variant="outline-dark" className="flex-grow-1" onClick={prevStep}>← Back</Button>
                                            <Button type="submit" variant="accent" size="lg" className="flex-grow-1" disabled={isSubmitting}>
                                                {isSubmitting ? 'Sending...' : 'Submit Request'}
                                            </Button>
                                        </div>
                                        <Form.Control type="text" name="_honeypot" style={{ display: 'none' }} value={formData._honeypot} onChange={handleChange} />
                                    </div>
                                )}
                            </Form>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="section section-light">
                <Container>
                    <div className="section-header">
                        <h2>Why Work With Us?</h2>
                    </div>
                    <Row className="g-4">
                        {[
                            { icon: '🔬', title: 'Evidence-Based', desc: 'All protocols backed by peer-reviewed research' },
                            { icon: '👤', title: 'Personalized', desc: 'Customized plans for your unique needs' },
                            { icon: '🌍', title: 'Global Reach', desc: 'Serving clients in 50+ countries' }
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
        </main>
    );
};

export default Quote;
