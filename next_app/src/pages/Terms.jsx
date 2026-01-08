'use client';
import React from 'react';
import { Container } from 'react-bootstrap';

const Terms = () => {
    return (
        <main className="section">
            <Container>
                <div className="max-w-4xl mx-auto py-5">
                    <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--primary-deep)' }}>Terms of Service</h1>
                    <p className="text-muted mb-5">Last Updated: January 8, 2026</p>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>1. Agreement to Terms</h2>
                        <p>By accessing or using Dr. Sehar Taskeen's website and clinical nutrition services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>2. Professional Disclaimer</h2>
                        <p>The information provided on this website is for educational and nutritional guidance purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>3. Clinical Services</h2>
                        <p>Our clinical nutrition protocols are personalized based on the information you provide. Accuracy in sharing your health history is essential for safe and effective nutritional planning.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>4. Payments and Refunds</h2>
                        <p>Fees for courses, sessions, and consultations are non-refundable once the service has commenced or digital materials have been delivered, unless otherwise required by law.</p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--primary-main)' }}>5. Intellectual Property</h2>
                        <p>All content on this website, including clinical protocols, course materials, and branding, is the intellectual property of Dr. Sehar Taskeen and Optimum Nutrafit Academy. No part of this content may be reproduced or shared without explicit permission.</p>
                    </section>

                    <section className="mt-5 p-4 bg-light rounded shadow-sm">
                        <h3 className="h5 fw-bold mb-2">Legal Contact</h3>
                        <p className="mb-0">For legal inquiries, please contact: <strong>legal@drsehartaskeen.online</strong></p>
                    </section>
                </div>
            </Container>
        </main>
    );
};

export default Terms;
