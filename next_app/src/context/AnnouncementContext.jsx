'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

const AnnouncementContext = createContext();

export const useAnnouncement = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }) => {
    // Default initial state with multiple items
    const defaultConfig = {
        isActive: true,
        interval: 3000, // 3 seconds default rotation
        isDismissible: true,
        size: 'medium', // small, medium, large
        items: [
            {
                id: 1,
                message: "🎉 <strong>New Course Launched:</strong> PCOS Specialization! Enroll Now.",
                link: "/courses",
                bgColor: "#d4af37", // accent-gold
                textColor: "#0a1f0a", // primary-deep
            },
            {
                id: 2,
                message: "🌿 <strong>Free Consultation:</strong> Book your first session today.",
                link: "/services",
                bgColor: "#2d5a2d", // primary-light
                textColor: "#ffffff",
            }
        ]
    };

    // Load from localStorage if available, else default
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('announcementConfig');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.message) {
                    setConfig({
                        isActive: parsed.isActive,
                        interval: 3000,
                        isDismissible: parsed.isDismissible,
                        size: 'medium',
                        items: [{
                            id: Date.now(),
                            message: parsed.message,
                            link: parsed.link,
                            bgColor: parsed.bgColor,
                            textColor: parsed.textColor
                        }]
                    });
                } else {
                    setConfig(parsed);
                }
            }
        } catch (e) {
            console.error("Failed to parse config", e);
        }
    }, []);

    const updateConfig = (newConfig) => {
        // Deep merge or replacement? Replacement is safer for simple state
        setConfig(newConfig);
        localStorage.setItem('announcementConfig', JSON.stringify(newConfig));
    };

    const resetConfig = () => {
        setConfig(defaultConfig);
        localStorage.setItem('announcementConfig', JSON.stringify(defaultConfig));
    };

    return (
        <AnnouncementContext.Provider value={{ config, updateConfig, resetConfig }}>
            {children}
        </AnnouncementContext.Provider>
    );
};
