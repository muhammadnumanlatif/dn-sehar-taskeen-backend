'use client';

import { AnnouncementProvider } from '../context/AnnouncementContext';
import { AuthProvider } from '../context/AuthContext';
import { ContentProvider } from '../context/ContentContext';

export function Providers({ children }) {
    return (
        <AuthProvider>
            <ContentProvider>
                <AnnouncementProvider>
                    {children}
                </AnnouncementProvider>
            </ContentProvider>
        </AuthProvider>
    );
}
