import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsx("div", { className: "text-magpie-primary font-bold text-lg", children: "\u8F09\u5165\u4E2D..." }) }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/admin/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
