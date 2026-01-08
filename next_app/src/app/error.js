'use client';

import { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Container>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🩺</div>
                <h1 className="mb-3">Something Went Wrong</h1>
                <p className="text-muted mb-4 lead">
                    We encountered an unexpected symptom. <br />
                    Please try refreshing the page or contact support if the issue persists.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <Button variant="primary" onClick={() => reset()}>Try Again</Button>
                    <Button variant="outline-secondary" onClick={() => window.location.href = '/'}>Go Home</Button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-5 p-3 bg-light text-start rounded overflow-auto" style={{ maxHeight: '200px' }}>
                        <small className="text-danger font-monospace">{error.message}</small>
                    </div>
                )}
            </Container>
        </div>
    );
}
