'use client';

import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';

export default function NotFound() {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Container>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🥗</div>
                <h1 className="mb-3">404 - Ingredient Missing</h1>
                <p className="text-muted mb-4 lead">
                    The page you are looking for seems to have been removed from the protocol.<br />
                    Let's get you back on track to better health.
                </p>
                <Link href="/" passHref>
                    <Button variant="primary" size="lg">Return to Homepage</Button>
                </Link>
            </Container>
        </div>
    );
}
