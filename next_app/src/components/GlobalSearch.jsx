'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, Form, ListGroup, InputGroup, Badge } from 'react-bootstrap';
import { courses, services, sessions, locations } from '../data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GlobalSearch = ({ show, onHide }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const router = useRouter();

    const flattenData = useMemo(() => {
        const items = [];

        // Services
        services.forEach(s => items.push({ type: 'Service', icon: '🌸', title: s.title, slug: `/services/${s.slug}`, keywords: `${s.title} ${s.description} ${s.details.join(' ')}` }));

        // Courses
        courses.forEach(c => items.push({ type: 'Course', icon: '🎓', title: c.title, slug: `/courses/${c.slug}`, keywords: `${c.title} ${c.description}` }));

        // Sessions
        sessions.forEach(s => items.push({ type: 'Session', icon: '📅', title: s.title, slug: `/sessions/${s.slug}`, keywords: `${s.title} ${s.description}` }));

        // Locations
        locations.forEach(loc => {
            loc.cities.forEach(city => {
                items.push({
                    type: 'Location',
                    icon: '📍',
                    title: `${city.name} (${city.province || loc.country})`,
                    slug: `/locations/${loc.country}/${city.slug}`,
                    keywords: `${city.name} ${city.province} ${city.landmarks?.join(' ') || ''} ${city.desc || ''}`
                });
            });
        });

        return items;
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const q = query.toLowerCase();
        const filtered = flattenData.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.keywords.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
        ).slice(0, 8); // Limit to top 8 results

        setResults(filtered);
    }, [query, flattenData]);

    // Handle Keyboard Shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                onHide ? onHide(false) : null; // Close if open? Wait, toggling would be better.
                // For layout integration, we'll use a better toggle.
                window.dispatchEvent(new CustomEvent('toggle-search'));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onHide]);

    useEffect(() => {
        if (show && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [show]);

    const handleSelect = (slug) => {
        router.push(slug);
        onHide();
        setQuery('');
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            className="search-modal"
            contentClassName="search-modal-content"
        >
            <Modal.Body className="p-0">
                <div className="search-input-wrapper p-4 border-bottom">
                    <InputGroup size="lg">
                        <InputGroup.Text className="bg-transparent border-0 pe-0">
                            🔍
                        </InputGroup.Text>
                        <Form.Control
                            ref={inputRef}
                            placeholder="Search services, cities, landmarks, or courses..."
                            className="border-0 shadow-none fs-4"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <InputGroup.Text className="bg-transparent border-0 text-muted small">
                            <Badge bg="light" text="dark">ESC</Badge>
                        </InputGroup.Text>
                    </InputGroup>
                </div>

                <div className="search-results-wrapper p-2" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    {query.length > 0 && results.length === 0 && (
                        <div className="p-5 text-center text-muted">
                            <div className="fs-1 mb-3">🎐</div>
                            <p>No results found for "<strong>{query}</strong>"</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <ListGroup variant="flush">
                            {results.map((res, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    action
                                    onClick={() => handleSelect(res.slug)}
                                    className="border-0 rounded-3 mb-1 d-flex align-items-center justify-content-between p-3"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="fs-3 me-3">{res.icon}</span>
                                        <div>
                                            <div className="fw-bold">{res.title}</div>
                                            <small className="text-muted">{res.type}</small>
                                        </div>
                                    </div>
                                    <span className="text-muted small">Enter ↵</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    {query.length === 0 && (
                        <div className="p-4">
                            <p className="text-muted small text-uppercase fw-bold mb-3">Popular Searches</p>
                            <div className="d-flex flex-wrap gap-2">
                                {['PCOS Reversal', 'Lahore Clinic', 'Gut Health', 'Initial Consultation', 'Dubai'].map(tag => (
                                    <Badge
                                        key={tag}
                                        bg="light"
                                        text="dark"
                                        className="p-2 px-3 border cursor-pointer hover-shadow"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setQuery(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="search-footer p-3 bg-light border-top d-flex justify-content-between align-items-center rounded-bottom">
                    <div className="d-flex gap-3 small text-muted">
                        <span><Badge bg="secondary" className="me-1">↑↓</Badge> Navigate</span>
                        <span><Badge bg="secondary" className="me-1">↵</Badge> Select</span>
                    </div>
                    <div className="small text-muted">
                        Press <kbd className="bg-white text-dark border shadow-sm">⌘ K</kbd> anywhere
                    </div>
                </div>
            </Modal.Body>

            <style jsx global>{`
                .search-modal-content {
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.2);
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                }
                .search-input-wrapper input::placeholder {
                    color: #adb5bd;
                    font-weight: 300;
                }
                .list-group-item-action:hover {
                    background-color: var(--neutral-100) !important;
                    transform: translateX(5px);
                    transition: 0.2s;
                }
                .cursor-pointer:hover {
                    border-color: var(--primary-main) !important;
                    color: var(--primary-main) !important;
                }
            `}</style>
        </Modal>
    );
};

// Use memo to prevent re-renders of the static data flattener
import { useMemo } from 'react';

export default GlobalSearch;
