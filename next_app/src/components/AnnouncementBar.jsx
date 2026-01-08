'use client';
import React, { useState, useEffect } from 'react';
import { useAnnouncement } from '../context/AnnouncementContext';
import { Container } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const AnnouncementBar = () => {
    const { config } = useAnnouncement();
    const [dismissed, setDismissed] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHydrated, setIsHydrated] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (config.isActive && config.items?.length > 1 && !dismissed) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % config.items.length);
            }, config.interval || 3000);
            return () => clearInterval(timer);
        }
    }, [config.items?.length, config.interval, config.isActive, dismissed]);

    // Conditions for not showing
    const shouldShow = isHydrated &&
        pathname !== '/admin' &&
        config.isActive &&
        !dismissed &&
        config.items?.length > 0;

    if (!shouldShow) return null;

    const currentItem = config.items[currentIndex];

    // Responsive Sizing
    const getSizeStyles = () => {
        switch (config.size) {
            case 'large': return { padding: '16px 0', fontSize: '1.1rem' };
            case 'small': return { padding: '6px 0', fontSize: '0.8rem' };
            default: return { padding: '12px 0', fontSize: '0.95rem' }; // Medium
        }
    };

    return (
        <div
            id="announcement-bar"
            style={{
                background: currentItem.bgColor,
                color: currentItem.textColor,
                ...getSizeStyles(),
                position: 'relative',
                zIndex: 1040,
                textAlign: 'center',
                fontWeight: 600,
                transition: 'background 0.5s ease',
                overflow: 'hidden'
            }}
        >
            <Container style={{ position: 'relative', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentItem.id} // Key triggers animation
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                    >
                        <span dangerouslySetInnerHTML={{ __html: currentItem.message }}></span>

                        {currentItem.link && (
                            <a
                                href={currentItem.link}
                                style={{
                                    textDecoration: 'underline',
                                    color: 'inherit',
                                    fontWeight: 700,
                                    marginLeft: '10px'
                                }}
                            >
                                Learn More →
                            </a>
                        )}
                    </motion.div>
                </AnimatePresence>

                {config.isDismissible && (
                    <button
                        onClick={() => setDismissed(true)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'inherit',
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            padding: '0 5px',
                            lineHeight: 1,
                            zIndex: 10
                        }}
                        aria-label="Close announcement"
                    >
                        &times;
                    </button>
                )}
            </Container>
        </div>
    );
};

export default AnnouncementBar;
