import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, GraduationCap, Download, Newspaper, Users, Info, LogOut, Menu, X, ChevronDown, ChevronRight, Home, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedMenus, setExpandedMenus] = useState(['教育訓練管理']);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };
    const toggleMenu = (label) => {
        setExpandedMenus(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
    };
    const navItems = [
        { label: '控制台總覽', path: '/admin/dashboard', icon: _jsx(LayoutDashboard, { size: 20 }) },
        { label: '首頁管理', path: '/admin/homepage', icon: _jsx(Home, { size: 20 }) },
        { label: '關於我們管理', path: '/admin/about', icon: _jsx(Info, { size: 20 }) },
        { label: '證書查詢管理', path: '/admin/certificates', icon: _jsx(ShieldCheck, { size: 20 }) },
        {
            label: '教育訓練管理', icon: _jsx(GraduationCap, { size: 20 }),
            children: [
                { label: '實體課程', path: '/admin/courses/physical' },
                { label: '線上講座', path: '/admin/courses/online' },
                { label: '知識影片', path: '/admin/courses/videos' },
                { label: '企業包班', path: '/admin/courses/corporate' },
            ]
        },
        { label: '文件下載管理', path: '/admin/downloads', icon: _jsx(Download, { size: 20 }) },
        {
            label: '最新消息管理', icon: _jsx(Newspaper, { size: 20 }),
            children: [
                { label: '農產新知', path: '/admin/news/agriculture' },
                { label: '新聞媒體', path: '/admin/news/media' },
                { label: '常見問題', path: '/admin/news/faq' },
            ]
        },
        { label: '菁英招募管理', path: '/admin/recruitment', icon: _jsx(Users, { size: 20 }) },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex font-sans", children: [_jsxs("aside", { className: `fixed inset-y-0 left-0 bg-magpie-dark text-white w-64 transform transition-transform duration-300 z-50 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`, children: [_jsxs("div", { className: "p-5 border-b border-white/10 flex justify-between items-center shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ShieldCheck, { size: 22, className: "text-cyan-400" }), _jsx("span", { className: "font-black tracking-widest text-base", children: "\u5167\u90E8\u7BA1\u7406\u7CFB\u7D71" })] }), _jsx("button", { className: "md:hidden", onClick: () => setSidebarOpen(false), children: _jsx(X, { size: 24 }) })] }), _jsx("nav", { className: "p-3 space-y-1 flex-1 overflow-y-auto", children: navItems.map((item) => {
                            if (item.children) {
                                const isExpanded = expandedMenus.includes(item.label);
                                return (_jsxs("div", { children: [_jsxs("button", { onClick: () => toggleMenu(item.label), className: "w-full flex items-center justify-between gap-3 px-4 py-3 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [item.icon, _jsx("span", { className: "text-sm", children: item.label })] }), isExpanded ? _jsx(ChevronDown, { size: 16 }) : _jsx(ChevronRight, { size: 16 })] }), isExpanded && (_jsx("div", { className: "ml-9 space-y-1 mt-1", children: item.children.map((child) => (_jsx(NavLink, { to: child.path, className: ({ isActive }) => `block px-4 py-2 rounded text-sm transition-colors ${isActive ? 'bg-magpie-primary text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`, children: child.label }, child.path))) }))] }, item.label));
                            }
                            return (_jsxs(NavLink, { to: item.path, end: item.path === '/admin/dashboard', className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${isActive ? 'bg-magpie-primary text-white font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`, children: [item.icon, item.label] }, item.label));
                        }) }), _jsx("div", { className: "p-3 border-t border-white/10 shrink-0", children: _jsxs(NavLink, { to: "/", className: "flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm", children: [_jsx(FileText, { size: 20 }), "\u524D\u5F80\u5B98\u7DB2"] }) })] }), _jsxs("main", { className: `flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`, children: [_jsxs("header", { className: "bg-white shadow-sm h-16 flex items-center justify-between px-6 z-40 sticky top-0", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "text-gray-500 hover:text-magpie-dark transition-colors", children: _jsx(Menu, { size: 24 }) }), _jsx("h1", { className: "font-bold text-magpie-dark text-lg hidden sm:block", children: "\u85CD\u9D72\u9A57\u8B49 - \u57F7\u884C\u4EBA\u54E1\u5F8C\u53F0" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600 font-medium", children: [_jsx("span", { className: "w-8 h-8 rounded-full bg-magpie-primary text-white flex items-center justify-center font-bold", children: user?.name?.charAt(0) || 'A' }), user?.name || '管理員'] }), _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 text-red-500 hover:text-red-700 transition px-3 py-1.5 rounded hover:bg-red-50 font-bold text-sm", children: [_jsx(LogOut, { size: 16 }), " \u767B\u51FA"] })] })] }), _jsx("div", { className: "p-6 md:p-8 flex-1 overflow-auto", children: _jsx(Outlet, {}) })] })] }));
};
export default AdminLayout;
