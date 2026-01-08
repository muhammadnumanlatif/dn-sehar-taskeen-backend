'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        {
            label: 'Services',
            href: '/services',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            )
        },
        {
            label: 'Sessions',
            href: '/sessions',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            )
        },
        {
            label: 'Academy',
            href: '/courses',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            )
        },
        {
            label: 'Form',
            href: '/quote',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
            )
        }
    ];

    return (
        <div className="bottom-nav-wrapper d-lg-none">
            <nav className="bottom-nav shadow-lg">
                {navItems.map((item, idx) => {
                    const isActive = pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/');

                    return (
                        <Link
                            key={idx}
                            href={item.href}
                            className={`nav-item-link ${isActive ? 'active' : ''}`}
                        >
                            <div className="icon-wrapper">
                                <div className="nav-icon">{item.icon}</div>
                            </div>
                            <span className="nav-label">{item.label}</span>
                            {isActive && <div className="active-indicator" />}
                        </Link>
                    );
                })}
            </nav>

            <style jsx>{`
                .bottom-nav-wrapper {
                    position: fixed;
                    bottom: 25px;
                    left: 20px;
                    right: 20px;
                    z-index: 1050;
                    display: flex;
                    justify-content: center;
                    pointer-events: none;
                }
                .bottom-nav {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 6px 10px;
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    pointer-events: auto;
                    width: 100%;
                    max-width: 480px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
                }
                .nav-item-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none !important;
                    color: #6c757d !important;
                    padding: 8px 0;
                    position: relative;
                    flex: 1;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    -webkit-tap-highlight-color: transparent;
                }
                .icon-wrapper {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 14px;
                    transition: all 0.3s;
                    margin-bottom: 2px;
                }
                .nav-icon {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .nav-label {
                    font-size: 0.65rem;
                    font-weight: 700;
                    text-transform: capitalize;
                    letter-spacing: 0.2px;
                    opacity: 0.9;
                }
                .nav-item-link.active {
                    color: var(--primary-main) !important;
                }
                .nav-item-link.active .icon-wrapper {
                    background: var(--primary-main);
                    color: white !important;
                    transform: translateY(-8px);
                    box-shadow: 0 8px 15px rgba(25, 135, 84, 0.25);
                }
                .nav-item-link.active .nav-label {
                    font-weight: 800;
                    transform: translateY(-2px);
                }
                .active-indicator {
                    width: 4px;
                    height: 4px;
                    background: var(--primary-main);
                    border-radius: 50%;
                    position: absolute;
                    bottom: 0px;
                }
                .nav-item-link:active {
                    transform: scale(0.9);
                }
            `}</style>
        </div>
    );
};

export default BottomNav;
