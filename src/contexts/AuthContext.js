import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const savedToken = sessionStorage.getItem('auth_token');
        if (savedToken) {
            fetch(`${API_BASE}/auth/verify`, {
                headers: { Authorization: `Bearer ${savedToken}` },
            })
                .then((res) => res.json())
                .then((data) => {
                if (data.valid) {
                    setToken(savedToken);
                    setUser(data.user);
                }
                else {
                    sessionStorage.removeItem('auth_token');
                }
            })
                .catch(() => {
                sessionStorage.removeItem('auth_token');
            })
                .finally(() => setLoading(false));
        }
        else {
            setLoading(false);
        }
    }, []);
    const login = async (username, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
            sessionStorage.setItem('auth_token', data.token);
            setToken(data.token);
            setUser(data.user);
            return { success: true };
        }
        return { success: false, error: data.error };
    };
    const logout = () => {
        sessionStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, loading, login, logout }, children: children }));
};
