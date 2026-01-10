'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    query,
    onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { courses as initialCoursesData, services as initialServicesData, sessions as initialSessionsData } from '../data/index';

const ContentContext = createContext({
    courses: [],
    services: [],
    sessions: [],
    about: { education: [], experience: [] },
    testimonials: [],
    loading: true
});

export const useContent = () => {
    const context = useContext(ContentContext);
    return context || {};
};

// Backwards compatibility alias
export const useCourse = () => {
    const context = useContext(ContentContext);
    const { courses, addCourse, updateCourse, deleteCourse } = context || {};
    return { courses, addCourse, updateCourse, deleteCourse };
};

export const ContentProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [services, setServices] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [about, setAbout] = useState({ education: [], experience: [] });
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const initialAboutData = {
        name: 'Dr. Sehar Taskeen',
        title: 'Clinical Nutritionist',
        image: '/images/dr-sehar.png',
        hero_tagline: 'Leading clinical nutritionist specializing in evidence-based protocols for PCOS, gut health, and metabolic disorders.',
        quote: "My mission is to empower individuals with evidence-based nutritional strategies...",
        education: [
            { id: 1, title: 'DDNS Doctor of Dietetics And Nutritional Sciences', sub: 'Advanced Clinical Nutrition Institute' },
            { id: 2, title: 'MS Allied Health Sciences', sub: 'University of Health Sciences' }
        ],
        experience: [
            { id: 1, title: '10+ Years Clinical Practice', desc: 'Over 10,000 clients successfully treated' }
        ]
    };

    const initialTestimonialsData = [
        { id: 1, avatar: 'SA', name: 'Sarah Ahmed', loc: 'Dubai, UAE', quote: "Reversed my PCOS symptoms in 6 months.", res: '✓ PCOS Reversal' }
    ];

    // --- FIRESTORE SYNC ---
    useEffect(() => {
        // 1. Sync Courses
        const unsubCourses = onSnapshot(collection(db, 'courses'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCourses(data.length > 0 ? data : initialCoursesData);
        });

        // 2. Sync Services
        const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setServices(data.length > 0 ? data : initialServicesData);
        });

        // 3. Sync Sessions
        const unsubSessions = onSnapshot(collection(db, 'sessions'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setSessions(data.length > 0 ? data : initialSessionsData);
        });

        // 4. Sync About Data (Single Document)
        const unsubAbout = onSnapshot(doc(db, 'site_content', 'about'), (docSnap) => {
            if (docSnap.exists()) setAbout(docSnap.data());
            else setAbout(initialAboutData);
        });

        // 5. Sync Testimonials
        const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setTestimonials(data.length > 0 ? data : initialTestimonialsData);
            setLoading(false);
        });

        return () => {
            unsubCourses();
            unsubServices();
            unsubSessions();
            unsubAbout();
            unsubTestimonials();
        };
    }, []);

    // --- HANDLERS: COURSES ---
    const addCourse = async (course) => {
        const id = course.id || Date.now().toString();
        await setDoc(doc(db, 'courses', id), course);
    };
    const updateCourse = async (id, updated) => {
        await setDoc(doc(db, 'courses', id), updated, { merge: true });
    };
    const deleteCourse = async (id) => {
        await deleteDoc(doc(db, 'courses', id));
    };

    // --- HANDLERS: SERVICES ---
    const addService = async (service) => {
        const id = service.id || Date.now().toString();
        await setDoc(doc(db, 'services', id), service);
    };
    const updateService = async (id, updated) => {
        await setDoc(doc(db, 'services', id), updated, { merge: true });
    };
    const deleteService = async (id) => {
        await deleteDoc(doc(db, 'services', id));
    };

    // --- HANDLERS: SESSIONS ---
    const addSession = async (session) => {
        const id = session.id || Date.now().toString();
        await setDoc(doc(db, 'sessions', id), session);
    };
    const updateSession = async (id, updated) => {
        await setDoc(doc(db, 'sessions', id), updated, { merge: true });
    };
    const deleteSession = async (id) => {
        await deleteDoc(doc(db, 'sessions', id));
    };

    // --- HANDLERS: ABOUT ---
    const updateAbout = async (updated) => {
        await setDoc(doc(db, 'site_content', 'about'), updated);
    };

    // --- HANDLERS: TESTIMONIALS ---
    const addTestimonial = async (testimonial) => {
        const id = testimonial.id?.toString() || Date.now().toString();
        await setDoc(doc(db, 'testimonials', id), testimonial);
    };
    const updateTestimonial = async (id, updated) => {
        await setDoc(doc(db, 'testimonials', id.toString()), updated, { merge: true });
    };
    const deleteTestimonial = async (id) => {
        await deleteDoc(doc(db, 'testimonials', id.toString()));
    };

    // Helper to seed database with initial data
    const seedDatabase = async () => {
        try {
            for (const c of initialCoursesData) await addCourse(c);
            for (const s of initialServicesData) await addService(s);
            for (const sess of initialSessionsData) await addSession(sess);
            await updateAbout(initialAboutData);
            console.log("✅ Database seeded successfully!");
        } catch (e) {
            console.error("❌ Seeding failed:", e);
        }
    };

    return (
        <ContentContext.Provider value={{
            courses, addCourse, updateCourse, deleteCourse,
            services, addService, updateService, deleteService,
            sessions, addSession, updateSession, deleteSession,
            about, updateAbout,
            testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
            loading, seedDatabase
        }}>
            {children}
        </ContentContext.Provider>
    );
};
