'use client';
import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicy = () => {
    return (
        <main className="section">
            <Container>
                <div className="max-w-4xl mx-auto py-5">
                    <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--primary-deep)' }}>Privacy Policy</h1>
                    <p className="text-muted mb-5">Last Updated: January 8, 2026</p>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>1. Introduction</h2>
                        <p>Welcome to Dr. Sehar Taskeen's clinical nutrition platform. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>2. Information We Collect</h2>
                        <p>We collect personal information that you voluntarily provide to us when you:</p>
                        <ul>
                            <li>Request a free health assessment or quote.</li>
                            <li>Register for our courses or sessions.</li>
                            <li>Contact us via WhatsApp or email.</li>
                            <li>Subscribe to our newsletter.</li>
                        </ul>
                        <p>This information may include your name, phone number, email address, health goals, and clinical history relevant to nutritional planning.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Provide personalized clinical nutrition protocols.</li>
                            <li>Communicate with you regarding your appointments and progress.</li>
                            <li>Send administrative information and updates.</li>
                            <li>Improve our website and services based on user feedback.</li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>4. WhatsApp & Communication</h2>
                        <p>By providing your phone number, you consent to receive communications via WhatsApp for appointment reminders, OTP verification, and protocol delivery. Your data is handled in accordance with Meta's developer policies.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>5. Data Security</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet is 100% secure.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>6. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal data. Please contact us at support@drsehartaskeen.online for any privacy-related requests.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>7. Data Deletion Instructions (Facebook/Meta)</h2>
                        <p>To have your data deleted from our platform, you can:</p>
                        <ul>
                            <li>Email <strong>delete-me@drsehartaskeen.online</strong> with the subject "Data Deletion Request".</li>
                            <li>Include your registered WhatsApp number or email address in the message.</li>
                        </ul>
                        <p>We will process your request and delete all associated personal data within 48-72 hours, sending you a confirmation once complete.</p>
                    </section>

                    <section className="mt-5 p-4 bg-light rounded shadow-sm">
                        <h3 className="h5 fw-bold mb-2">Contact Us</h3>
                        <p className="mb-1"><strong>Optimum Nutrafit Academy by Dr. Sehar Taskeen</strong></p>
                        <p className="mb-1">Address: DHA Phase 5, Lahore, Pakistan</p>
                        <p className="mb-0">Email: <strong>privacy@drsehartaskeen.online</strong></p>
                    </section>
                </div>
            </Container>
        </main>
    );
};

export default PrivacyPolicy;
