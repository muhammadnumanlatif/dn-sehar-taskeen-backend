'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const AnnouncementContext = createContext();

export const useAnnouncement = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }) => {
    const defaultConfig = {
        isActive: true,
        interval: 3000,
        isDismissible: true,
        size: 'medium',
        items: [
            {
                id: 1,
                message: "🎉 <strong>New Course Launched:</strong> PCOS Specialization! Enroll Now.",
                link: "/courses",
                bgColor: "#d4af37",
                textColor: "#0a1f0a",
            }
        ]
    };

    const [config, setConfig] = useState(defaultConfig);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'site_content', 'announcements'), (docSnap) => {
            if (docSnap.exists()) {
                setConfig(docSnap.data());
            } else {
                setConfig(defaultConfig);
            }
            setLoading(false);
        });

        return unsub;
    }, []);

    const updateConfig = async (newConfig) => {
        try {
            await setDoc(doc(db, 'site_content', 'announcements'), newConfig);
        } catch (e) {
            console.error("Failed to update announcement config", e);
        }
    };

    const resetConfig = async () => {
        await updateConfig(defaultConfig);
    };

    return (
        <AnnouncementContext.Provider value={{ config, updateConfig, resetConfig, loading }}>
            {children}
        </AnnouncementContext.Provider>
    );
};
