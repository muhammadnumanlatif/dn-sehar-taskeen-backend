'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth';
import {
    collection,
    query,
    onSnapshot,
    doc,
    setDoc,
    deleteDoc
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]); // All admins from Firestore

    // 1. Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // We cross-reference with our 'admins' collection to get role/name
                setCurrentUser(user);
                setIsAuthenticated(true);
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // 2. Fetch all admin users metadata from Firestore
    useEffect(() => {
        if (!isAuthenticated) {
            setUsers([]);
            return;
        }

        const q = query(collection(db, "admins"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const adminList = [];
            querySnapshot.forEach((doc) => {
                adminList.push({ id: doc.id, ...doc.data() });
            });
            setUsers(adminList);
        });

        return unsubscribe;
    }, [isAuthenticated]);

    // 3. Login
    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: result.user };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: error.message };
        }
    };

    // 4. Logout
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // 5. Forgot Password
    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // 6. User Management (Metadata in Firestore)
    // Note: To actually CREATE a Firebase Auth user, we would ideally use a backend function.
    // For now, these handle the 'admins' display list.
    const addUser = async (name, email, role = 'admin', password = 'Default123!') => {
        try {
            // Trigger backend to create Auth user and Firestore metadata
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const response = await fetch(`${API_URL}/api/admin/create-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, role, password })
            });

            const res = await response.json();
            if (!res.success) throw new Error(res.message);

            return { success: true };
        } catch (error) {
            console.error("Add User Error:", error);
            return { success: false, message: error.message };
        }
    };

    const removeUser = async (email) => {
        try {
            // Trigger backend to delete Auth user and Firestore metadata
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const response = await fetch(`${API_URL}/api/admin/delete-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const res = await response.json();
            if (!res.success) throw new Error(res.message);

            return { success: true };
        } catch (error) {
            console.error("Remove User Error:", error);
            return { success: false, message: error.message };
        }
    };

    const syncAdmins = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const response = await fetch(`${API_URL}/api/admin/sync-admins`, { method: 'POST' });
            const res = await response.json();
            return res;
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const value = {
        currentUser,
        users,
        isAuthenticated,
        loading,
        login,
        logout,
        forgotPassword,
        addUser,
        removeUser,
        syncAdmins
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};