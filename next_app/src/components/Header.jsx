'use client';
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Header = ({ onSearchClick }) => {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Navbar expand="lg" className="bg-white border-bottom shadow-sm py-2" sticky="top" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.95)' }}>
                <Container>
                    <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2">
                        <img
                            src="/images/logo.png"
                            alt="Dr. Sehar Taskeen"
                            style={{ height: '45px', width: 'auto' }}
                        />
                        <span className="logo fw-bold d-none d-sm-inline" style={{ color: 'var(--primary-main)', fontSize: '1.2rem' }}>
                            Dr. Sehar Taskeen
                        </span>
                    </Navbar.Brand>

                    <div className="ms-auto d-lg-none me-2">
                        <Button variant="link" onClick={onSearchClick} className="p-0 text-muted fs-4 text-decoration-none">🔍</Button>
                    </div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center gap-lg-4 gap-2 nav-links-custom">
                            <Nav.Link as={Link} href="/" active={pathname === '/'}>Home</Nav.Link>
                            <Nav.Link as={Link} href="/services" active={pathname === '/services'}>Services</Nav.Link>
                            <Nav.Link as={Link} href="/courses" active={pathname === '/courses'}>Courses</Nav.Link>
                            <Nav.Link as={Link} href="/sessions" active={pathname === '/sessions'}>Sessions</Nav.Link>
                            <Nav.Link as={Link} href="/about" active={pathname === '/about'}>About</Nav.Link>
                            <Nav.Link as={Link} href="/admin" active={pathname === '/admin'} className="text-secondary opacity-75 small">
                                {isAuthenticated ? '📊 Dashboard' : '🔐 Admin'}
                            </Nav.Link>

                            <div className="d-none d-lg-block border-start ps-4">
                                <Button
                                    variant="light"
                                    onClick={onSearchClick}
                                    className="d-flex align-items-center gap-2 border bg-white rounded-pill px-3 py-1"
                                >
                                    <span className="text-muted small">Search...</span>
                                    <kbd className="bg-light text-muted border-0 shadow-none px-2 py-0" style={{ fontSize: '0.7rem' }}>⌘K</kbd>
                                </Button>
                            </div>

                            <Button as={Link} href="/quote" className="btn btn-primary btn-sm px-4">
                                Get Free Assessment
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
