'use client';

import { Container, Row, Col } from 'react-bootstrap';

export default function Loading() {
    return (
        <main className="animate-fade-in">
            <section className="hero" style={{ padding: '100px 5% 60px' }}>
                <Container className="text-center">
                    <div className="shimmer skeleton-title mx-auto" style={{ width: '200px', height: '16px' }}></div>
                    <div className="shimmer skeleton-title mx-auto mt-3" style={{ width: '70%', height: '48px' }}></div>
                    <div className="shimmer skeleton-text mx-auto mt-4" style={{ width: '50%' }}></div>
                </Container>
            </section>

            <section className="section">
                <Container>
                    <Row className="g-4">
                        {[1, 2, 3].map((i) => (
                            <Col lg={4} md={6} key={i}>
                                <div className="card h-100 p-4" style={{ border: 'none', background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                                    <div className="shimmer skeleton-img"></div>
                                    <div className="shimmer skeleton-title" style={{ width: '80%' }}></div>
                                    <div className="shimmer skeleton-text"></div>
                                    <div className="shimmer skeleton-text"></div>
                                    <div className="shimmer skeleton-text" style={{ width: '40%' }}></div>
                                    <div className="shimmer skeleton-text mt-4" style={{ height: '40px', borderRadius: '8px' }}></div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </main>
    );
}
