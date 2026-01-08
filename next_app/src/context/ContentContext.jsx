'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { courses as initialCoursesData, services as initialServicesData, sessions as initialSessionsData } from '../data/index';

const ContentContext = createContext({
    courses: [],
    services: [],
    sessions: [],
    about: { education: [], experience: [] },
    testimonials: []
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
    // --- COURSES ---
    const [courses, setCourses] = useState(initialCoursesData);

    // --- SERVICES ---
    const [services, setServices] = useState(initialServicesData);

    // --- SESSIONS ---
    const [sessions, setSessions] = useState(initialSessionsData);

    // --- ABOUT ---
    const initialAboutData = {
        name: 'Dr. Sehar Taskeen',
        title: 'Clinical Nutritionist',
        image: '/images/dr-sehar.png', // Default generated image
        hero_tagline: 'Leading clinical nutritionist specializing in evidence-based protocols for PCOS, gut health, and metabolic disorders. Transforming lives through personalized clinical nutrition.',
        quote: "My mission is to empower individuals with evidence-based nutritional strategies that address the root causes of chronic health conditions. Every client deserves personalized care backed by clinical research and measurable outcomes.",
        education: [
            { id: 1, title: 'DDNS Doctor of Dietetics And Nutritional Sciences', sub: 'Advanced Clinical Nutrition Institute', desc: 'Specialized in metabolic disorders and hormonal health' },
            { id: 2, title: 'MS Allied Health Sciences', sub: 'University of Health Sciences', desc: 'Focus: Gut microbiome and digestive health' },
            { id: 3, title: 'Certified PCOS Specialist', sub: 'International PCOS Association', desc: 'Advanced protocols for hormonal balance' },
            { id: 4, title: 'Functional Medicine Practitioner', sub: 'Institute for Functional Medicine', desc: 'Root-cause approach to chronic disease' }
        ],
        experience: [
            { id: 1, title: '10+ Years Clinical Practice', desc: 'Over 10,000 clients successfully treated across 50+ countries' },
            { id: 2, title: 'Published Researcher', desc: 'Multiple peer-reviewed publications on PCOS and metabolic health' },
            { id: 3, title: 'International Speaker', desc: 'Regular presenter at global nutrition and wellness conferences' },
            { id: 4, title: 'Clinical Excellence Award', desc: 'Recognized for outstanding patient outcomes in metabolic health' },
            { id: 5, title: 'Founder, Optimum Nutrafit Academy', desc: 'Training the next generation of clinical nutritionists' }
        ]
    };

    const initialTestimonialsData = [
        { id: 1, avatar: 'SA', name: 'Sarah Ahmed', loc: 'Dubai, UAE', quote: "Reversed my PCOS symptoms in 6 months. Regular cycles, clear skin, and lost 15kg naturally. Dr. Sehar's evidence-based approach changed my life.", res: '✓ PCOS Reversal' },
        { id: 2, avatar: 'MK', name: 'Maria Khan', loc: 'Lahore, Pakistan', quote: "Finally found relief from chronic IBS after years of suffering. The gut protocol was comprehensive and actually worked. No more bloating or pain!", res: '✓ IBS Recovery' },
        { id: 3, avatar: 'JD', name: 'James Davidson', loc: 'London, UK', quote: "Reduced HbA1c from 8.5 to 5.8 in 4 months. No more diabetes medication. The personalized nutrition plan was scientifically sound and easy to follow.", res: '✓ Diabetes Reversal' }
    ];

    const [about, setAbout] = useState(initialAboutData);
    const [testimonials, setTestimonials] = useState(initialTestimonialsData);

    // --- EFFECTS: LOAD ON MOUNT ---
    useEffect(() => {
        const load = (key, setter) => {
            try {
                const saved = localStorage.getItem(key);
                if (saved) setter(JSON.parse(saved));
            } catch (e) { console.error(`Failed to load ${key}`, e); }
        };
        load('courses_data', setCourses);
        load('services_data', setServices);
        load('sessions_data', setSessions);
        load('about_data', setAbout);
        load('testimonials_data', setTestimonials);
    }, []);

    // --- EFFECTS: SAVE TO LOCAL STORAGE ---
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('courses_data', JSON.stringify(courses));
        }
    }, [courses]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('services_data', JSON.stringify(services));
        }
    }, [services]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('sessions_data', JSON.stringify(sessions));
        }
    }, [sessions]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('about_data', JSON.stringify(about));
        }
    }, [about]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('testimonials_data', JSON.stringify(testimonials));
        }
    }, [testimonials]);

    // --- HANDLERS: COURSES ---
    const addCourse = (course) => setCourses(prev => [...prev, course]);
    const updateCourse = (id, updated) => setCourses(prev => prev.map(item => item.id === id ? updated : item));
    const deleteCourse = (id) => setCourses(prev => prev.filter(item => item.id !== id));

    // --- HANDLERS: SERVICES ---
    const addService = (service) => setServices(prev => [...prev, service]);
    const updateService = (id, updated) => setServices(prev => prev.map(item => item.id === id ? updated : item));
    const deleteService = (id) => setServices(prev => prev.filter(item => item.id !== id));

    // --- HANDLERS: SESSIONS ---
    const addSession = (session) => setSessions(prev => [...prev, session]);
    const updateSession = (id, updated) => setSessions(prev => prev.map(item => item.id === id ? updated : item));
    const deleteSession = (id) => setSessions(prev => prev.filter(item => item.id !== id));

    const updateAbout = (updated) => setAbout(updated);

    // --- HANDLERS: TESTIMONIALS ---
    const addTestimonial = (testimonial) => setTestimonials(prev => [...prev, { ...testimonial, id: Date.now() }]);
    const updateTestimonial = (id, updated) => setTestimonials(prev => prev.map(item => item.id === id ? updated : item));
    const deleteTestimonial = (id) => setTestimonials(prev => prev.filter(item => item.id !== id));

    return (
        <ContentContext.Provider value={{
            courses, addCourse, updateCourse, deleteCourse,
            services, addService, updateService, deleteService,
            sessions, addSession, updateSession, deleteSession,
            about, updateAbout,
            testimonials, addTestimonial, updateTestimonial, deleteTestimonial
        }}>
            {children}
        </ContentContext.Provider>
    );
};
