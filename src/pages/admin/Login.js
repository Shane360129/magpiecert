import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, KeyRound, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    if (user) {
        return _jsx(Navigate, { to: "/admin/dashboard", replace: true });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const result = await login(username, password);
            if (result.success) {
                navigate('/admin/dashboard');
            }
            else {
                setError(result.error || '登入失敗');
            }
        }
        catch {
            setError('伺服器連線失敗，請稍後再試');
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen relative flex items-center justify-center bg-gray-50 overflow-hidden font-sans", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-[40vh] bg-magpie-dark clip-path-slant z-0" }), _jsxs("div", { className: "relative z-10 w-full max-w-md px-4", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: [_jsxs("div", { className: "p-8 text-center bg-magpie-dark text-white border-b-4 border-magpie-accent", children: [_jsx(Shield, { size: 48, className: "mx-auto mb-4 text-magpie-lighter" }), _jsx("h1", { className: "text-2xl font-black tracking-widest", children: "\u85CD\u9D72\u9A57\u8B49 \u5F8C\u53F0\u7CFB\u7D71" }), _jsx("p", { className: "text-magpie-light text-sm mt-2", children: "Executive Internal Portal" })] }), _jsxs("div", { className: "p-8", children: [_jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-lg", children: error })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "\u7BA1\u7406\u54E1\u5E33\u865F ID" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "text", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magpie-primary focus:bg-white transition", placeholder: "\u8ACB\u8F38\u5165\u5E33\u865F" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "\u5BC6\u78BC PASSWORD" }), _jsxs("div", { className: "relative", children: [_jsx(KeyRound, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magpie-primary focus:bg-white transition", placeholder: "\u8ACB\u8F38\u5165\u5BC6\u78BC" })] })] }), _jsx("button", { type: "submit", disabled: submitting, className: "w-full bg-magpie-primary hover:bg-magpie-hover text-white font-bold py-3 rounded-lg shadow-md transition-colors mt-4 disabled:opacity-50", children: submitting ? '登入中...' : '安 全 登 入' })] }), _jsx("div", { className: "mt-8 text-center text-xs text-gray-400 font-medium", children: "Protected by MagpieCert Security" })] })] }), _jsx("div", { className: "text-center mt-6", children: _jsx("button", { onClick: () => navigate('/'), className: "text-magpie-primary hover:text-magpie-dark font-bold text-sm transition-colors", children: "\u2190 \u8FD4\u56DE\u524D\u53F0\u5B98\u7DB2" }) })] })] }));
};
export default Login;
