import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navLinks = [
        { label: '關於我們', path: '/about' },
        { label: '服務項目', path: '/services' },
        { label: '證書查詢', path: '/certificates' },
        { label: '教育訓練', path: '/education' },
        { label: '文件下載', path: '/downloads' },
        { label: '最新消息', path: '/news' },
        { label: '聯絡我們', path: '/contact' },
    ];
    return (_jsxs("nav", { className: "fixed top-0 left-0 w-full z-50 bg-white shadow-md", children: [_jsxs("div", { className: "container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl py-3", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3 cursor-pointer shrink-0", children: [_jsx("img", { src: "/assets/magpiecert_full_page_1775046941679.png", alt: "\u85CD\u9D72\u6A19\u8A8C", className: "h-14 w-auto object-contain" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-magpie-primary font-bold text-xl leading-tight tracking-wide", children: "\u85CD\u9D72\u9A57\u8B49" }), _jsx("span", { className: "text-magpie-primary text-xs leading-none tracking-widest font-medium", children: "MagpieCert" })] })] }), _jsx("div", { className: "hidden lg:flex items-center space-x-8", children: navLinks.map((link) => {
                            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                            return (_jsx(Link, { to: link.path, className: `font-bold text-base tracking-wide transition-colors border-b-2 pb-1 ${isActive ? 'text-magpie-primary border-magpie-primary' : 'text-magpie-dark hover:text-magpie-primary border-transparent hover:border-magpie-primary'}`, children: link.label }, link.label));
                        }) }), _jsx("button", { className: "lg:hidden text-magpie-primary hover:text-magpie-dark transition", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? _jsx(X, { size: 28 }) : _jsx(Menu, { size: 28 }) })] }), mobileMenuOpen && (_jsx("div", { className: "lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 flex flex-col space-y-4 border-t border-gray-100", children: navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (_jsx(Link, { to: link.path, onClick: () => setMobileMenuOpen(false), className: `font-bold border-b border-gray-100 pb-3 block ${isActive ? 'text-magpie-primary' : 'text-magpie-dark hover:text-magpie-primary'}`, children: link.label }, link.label));
                }) }))] }));
};
export default Navbar;
