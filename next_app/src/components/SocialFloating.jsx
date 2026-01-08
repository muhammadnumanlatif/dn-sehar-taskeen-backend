'use client';
import React, { useState } from 'react';

const SocialFloating = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    React.useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return null;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        { url: 'mailto:sehartaskeen786@gmail.com', label: 'Email Us', icon: '✉️' },
        { url: 'https://www.pinterest.com/sehartaskeen/', label: 'Pinterest', icon: '📌' },
        { url: 'https://x.com/Seharnutrition1', label: 'X (Twitter)', icon: '𝕏' },
        { url: 'https://www.linkedin.com/in/dn-sehar-taskeen-222476308/', label: 'LinkedIn', icon: '💼' },
        { url: 'https://www.instagram.com/sehar_nutritionist?utm_source=qr&igsh=dnFvN2t6dXhibHMz', label: 'Instagram (Dr)', icon: '📷' },
        { url: 'https://www.instagram.com/optimum_nutrafit_academy?utm_source=qr&igsh=bDA4MXE4NXh3Njlx', label: 'Instagram (Academy)', icon: '📷' },
        { url: 'https://www.tiktok.com/@drseharnutritioni?_r=1&_t=ZS-92R86xWCfNB', label: 'TikTok (Dr)', icon: '🎵' },
        { url: 'https://www.tiktok.com/@optimum_nutrafit_academy?_r=1&_t=ZN-92R8hQnvlEk', label: 'TikTok (Academy)', icon: '🎵' },
        { url: 'https://www.snapchat.com/add/sehartaskeen22?share_id=44UjitfJnJA&locale=en-US', label: 'Snapchat', icon: '👻' },
        { url: 'https://youtube.com/@dr.seharnutrition?si=1xgfHVlYiCMcpCA-', label: 'YouTube', icon: '▶️' }
    ];

    return (
        <div id="social-floating-container" style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 9999, fontFamily: 'Inter, sans-serif' }}>
            {/* Trigger/Label */}
            <div
                onClick={toggleSidebar}
                style={{
                    background: 'var(--accent-gold, #d4af37)',
                    color: 'var(--primary-deep, #0a1f0a)',
                    padding: '15px 8px',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    borderRadius: '8px 0 0 8px',
                    cursor: 'pointer',
                    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                    opacity: isOpen ? 0 : 1,
                    visibility: isOpen ? 'hidden' : 'visible',
                    pointerEvents: isOpen ? 'none' : 'auto'
                }}
            >
                Follow us or contact us
            </div>

            {/* content */}
            <div style={{
                position: 'absolute',
                right: isOpen ? '0px' : '-320px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'white',
                width: '280px',
                borderRadius: '12px 0 0 12px',
                boxShadow: '-5px 0 20px rgba(0,0,0,0.15)',
                padding: '20px',
                transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                maxHeight: '80vh',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary-main, #1a3d1a)', fontSize: '1.1rem' }}>Connect With Us</span>
                    <span onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#999', lineHeight: 1 }}>&times;</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', padding: '8px 12px', borderRadius: '6px', transition: 'background 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <span style={{ fontSize: '1.2rem', width: '24px', textAlign: 'center' }}>{link.icon}</span>
                            <span style={{ fontWeight: 500 }}>{link.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialFloating;
