'use client';
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const DataDeletion = () => {
    return (
        <main className="section bg-light" style={{ minHeight: '80vh', padding: '100px 0' }}>
            <Container>
                <div className="max-w-2xl mx-auto">
                    <Card className="border-0 shadow-lg p-4 p-md-5 rounded-4">
                        <div className="text-center mb-5">
                            <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                                <span style={{ fontSize: '2.5rem' }}>🗑️</span>
                            </div>
                            <h1 className="display-6 fw-bold" style={{ color: 'var(--primary-deep)' }}>Data Deletion Request</h1>
                            <p className="text-muted">Instructions for removing your personal information</p>
                        </div>

                        <div className="mb-5">
                            <p className="lead border-start border-4 border-primary ps-3 mb-4">
                                At <strong>Dr. Sehar Taskeen's Optimum Nutrafit Academy</strong>, we respect your privacy and your right to control your personal data.
                            </p>

                            <h3 className="h5 fw-bold mb-3">How to request data deletion:</h3>
                            <div className="bg-light p-4 rounded-3 mb-4">
                                <ul className="mb-0">
                                    <li className="mb-3">
                                        <strong>Via Email:</strong> Send an email to <a href="mailto:delete-me@drsehartaskeen.online" className="fw-bold text-decoration-none" style={{ color: 'var(--primary-main)' }}>delete-me@drsehartaskeen.online</a>
                                    </li>
                                    <li>
                                        <strong>Via WhatsApp:</strong> Message our support line and request "Account Deletion".
                                    </li>
                                </ul>
                            </div>

                            <h3 className="h5 fw-bold mb-3">What information is removed?</h3>
                            <p className="text-muted mb-4">
                                Upon receiving your request, we will permanently remove:
                            </p>
                            <div className="row g-3">
                                {['Personal Profile', 'WhatsApp Chat History', 'Clinical Intake Forms', 'Purchase History'].map((item, i) => (
                                    <div key={i} className="col-6">
                                        <div className="d-flex align-items-center small">
                                            <span className="me-2 text-success">✓</span> {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <Link href="/">
                                <Button variant="outline-primary" className="px-4 py-2 rounded-pill fw-bold">Return to Home</Button>
                            </Link>
                            <div className="mt-4 pt-4 border-top">
                                <p className="small text-muted mb-0">
                                    Typical processing time: <strong>48 - 72 Hours</strong>
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Container>
        </main>
    );
};

export default DataDeletion;
