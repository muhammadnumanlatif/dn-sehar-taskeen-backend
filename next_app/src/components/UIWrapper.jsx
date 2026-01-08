'use client';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import GlobalSearch from './GlobalSearch';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import SocialFloating from './SocialFloating';
import ScrollToTop from './ScrollToTop';
import Breadcrumbs from './Breadcrumbs';

export default function UIWrapper({ children }) {
    const [showSearch, setShowSearch] = useState(false);

    // Listen for custom search events
    useEffect(() => {
        const toggleSearch = () => setShowSearch(prev => !prev);
        window.addEventListener('toggle-search', toggleSearch);
        return () => window.removeEventListener('toggle-search', toggleSearch);
    }, []);

    return (
        <div className="app-wrapper">
            <AnnouncementBar />
            <Header onSearchClick={() => setShowSearch(true)} />
            <Breadcrumbs />

            <main style={{ minHeight: '100vh', paddingBottom: '80px' }} className="animate-fade-in">
                {children}
            </main>

            <Footer />
            <BottomNav />
            <GlobalSearch show={showSearch} onHide={() => setShowSearch(false)} />

            <SocialFloating />
            <ScrollToTop />

            {/* Global Padding for Mobile Bottom Nav */}
            <style jsx global>{`
                @media (max-width: 991px) {
                    main {
                        padding-bottom: 100px !important;
                    }
                    footer {
                        padding-bottom: 120px !important;
                    }
                    .social-floating {
                        bottom: 90px !important;
                    }
                }
            `}</style>
        </div>
    );
}
