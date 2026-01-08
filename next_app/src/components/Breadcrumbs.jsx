'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';

const Breadcrumbs = () => {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(segment => segment);

    // Capitalize and format segment
    const formatSegment = (segment) => {
        return segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <nav aria-label="breadcrumb" style={{ background: 'var(--neutral-100)', padding: '12px 0', borderBottom: '1px solid var(--neutral-200)' }}>
            <Container>
                <ol className="breadcrumb mb-0" style={{ fontSize: '0.85rem' }}>
                    <li className="breadcrumb-item">
                        <Link href="/" className="text-decoration-none text-muted hover-primary">Home</Link>
                    </li>
                    {pathSegments.map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathSegments.length - 1;

                        return (
                            <li key={href} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                                {isLast ? (
                                    <span className="text-secondary fw-semibold">{formatSegment(segment)}</span>
                                ) : (
                                    <Link href={href} className="text-decoration-none text-muted hover-primary">
                                        {formatSegment(segment)}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </Container>
            <style jsx>{`
                .hover-primary:hover {
                    color: var(--primary-main) !important;
                }
                .breadcrumb-item + .breadcrumb-item::before {
                    content: "›";
                    color: var(--neutral-500);
                    font-size: 1.2rem;
                    line-height: 1;
                    vertical-align: middle;
                }
            `}</style>
        </nav>
    );
};

export default Breadcrumbs;
