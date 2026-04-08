import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const navLinks = [
    { label: '關於我們', href: '/about' },
    {
        label: '服務項目', href: '/service',
        children: [
            { label: '品質管理', href: '/service/quality' },
            { label: '農產品驗證', href: '/service/agriculture' },
            { label: 'ESG 查驗', href: '/service/esg' },
        ],
    },
    { label: '證書查詢', href: '/certificate' },
    {
        label: '教育訓練', href: '/training',
        children: [
            { label: '實體課程', href: '/training/courses' },
            { label: '線上講座', href: '/training/online' },
            { label: '知識影片', href: '/training/videos' },
            { label: '企業包班', href: '/training/enterprise' },
        ],
    },
    { label: '文件下載', href: '/documents' },
    { label: '最新消息', href: '/news' },
];
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdown, setDropdown] = useState(null);
    const location = useLocation();
    const isHome = location.pathname === '/';
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => { setMobileOpen(false); }, [location]);
    const navBg = isHome
        ? scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        : 'bg-white shadow-sm';
    const textColor = isHome && !scrolled ? 'text-white' : 'text-slate-700';
    const logoColor = isHome && !scrolled ? 'text-white' : 'text-navy-900';
    return (_jsxs("header", { className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`, children: [_jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "flex items-center justify-between h-16 md:h-20", children: [_jsxs(Link, { to: "/", className: `flex items-center gap-3 font-bold text-xl ${logoColor}`, children: [_jsx("div", { className: "w-9 h-9 bg-navy-800 rounded-lg flex items-center justify-center text-white text-xs font-black", children: "MBC" }), _jsx("span", { className: "hidden sm:block", children: "\u85CD\u9D72 MBC" })] }), _jsx("nav", { className: "hidden lg:flex items-center gap-1", children: navLinks.map((item) => (_jsxs("div", { className: "relative group", onMouseEnter: () => setDropdown(item.href), onMouseLeave: () => setDropdown(null), children: [_jsxs(Link, { to: item.href, className: `flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg
                    hover:bg-white/10 hover:text-navy-800 transition-colors ${textColor}`, children: [item.label, item.children && (_jsx("svg", { className: "w-3 h-3 opacity-60", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] }), item.children && dropdown === item.href && (_jsx("div", { className: "absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden", children: item.children.map((child) => (_jsx(Link, { to: child.href, className: "block px-4 py-2.5 text-sm text-slate-700 hover:bg-navy-50 hover:text-navy-800 transition-colors", children: child.label }, child.href))) }))] }, item.href))) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: "/contact", className: "hidden lg:block btn-primary py-2 px-5", children: "\u7372\u5F97\u5831\u50F9" }), _jsx("button", { onClick: () => setMobileOpen(!mobileOpen), className: `lg:hidden p-2 rounded-lg ${textColor}`, children: mobileOpen
                                        ? _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                                        : _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) })] })] }) }), mobileOpen && (_jsx("div", { className: "lg:hidden bg-white border-t border-slate-100 shadow-lg", children: _jsxs("div", { className: "container mx-auto px-4 py-4 space-y-1", children: [navLinks.map((item) => (_jsxs("div", { children: [_jsx(Link, { to: item.href, className: "block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-navy-800 rounded-lg hover:bg-navy-50", children: item.label }), item.children?.map((child) => (_jsx(Link, { to: child.href, className: "block pl-8 py-2 text-sm text-slate-500 hover:text-navy-700", children: child.label }, child.href)))] }, item.href))), _jsx("div", { className: "pt-2 pb-1", children: _jsx(Link, { to: "/contact", className: "btn-primary w-full justify-center", children: "\u7372\u5F97\u5831\u50F9" }) })] }) }))] }));
}
function Footer() {
    return (_jsx("footer", { className: "bg-navy-900 text-slate-400", children: _jsxs("div", { className: "container mx-auto px-4 py-16", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-9 h-9 bg-navy-600 rounded-lg flex items-center justify-center text-white text-xs font-black", children: "MBC" }), _jsx("span", { className: "text-white font-bold text-lg", children: "\u85CD\u9D72 MBC" })] }), _jsx("p", { className: "text-sm leading-relaxed", children: "\u53F0\u7063\u5C08\u696D\u9A57\u8B49\u8207\u6559\u80B2\u8A13\u7DF4\u6A5F\u69CB\uFF0C\u5354\u52A9\u4F01\u696D\u53D6\u5F97\u570B\u969B\u8A8D\u8B49\uFF0C\u63D0\u5347\u54C1\u8CEA\u7AF6\u722D\u529B\u3002" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-semibold mb-4 text-sm", children: "\u670D\u52D9\u9805\u76EE" }), _jsx("ul", { className: "space-y-2 text-sm", children: ['品質管理', '農產品驗證', 'ESG 查驗', '證書查詢'].map((t, i) => (_jsx("li", { children: _jsx(Link, { to: "/service", className: "hover:text-white transition-colors", children: t }) }, i))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-semibold mb-4 text-sm", children: "\u6559\u80B2\u8A13\u7DF4" }), _jsx("ul", { className: "space-y-2 text-sm", children: ['實體課程', '線上講座', '知識影片', '企業包班'].map((t, i) => (_jsx("li", { children: _jsx(Link, { to: "/training", className: "hover:text-white transition-colors", children: t }) }, i))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-semibold mb-4 text-sm", children: "\u806F\u7D61\u8CC7\u8A0A" }), _jsxs("ul", { className: "space-y-2 text-sm", children: [_jsx("li", { children: "\uD83D\uDCCD \u5730\u5740\uFF1A\uFF08\u5F85\u586B\uFF09" }), _jsx("li", { children: "\uD83D\uDCDE \u96FB\u8A71\uFF1A\uFF08\u5F85\u586B\uFF09" }), _jsx("li", { children: "\u2709\uFE0F Email\uFF1A\uFF08\u5F85\u586B\uFF09" })] }), _jsx(Link, { to: "/contact", className: "mt-4 btn-primary py-2 px-5 text-xs inline-flex", children: "\u7372\u5F97\u5831\u50F9" })] })] }), _jsxs("div", { className: "border-t border-navy-800 mt-12 pt-6 text-center text-xs text-slate-600", children: ["\u00A9 ", new Date().getFullYear(), " \u85CD\u9D72 MBC. All rights reserved."] })] }) }));
}
export default function Layout({ children }) {
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: children }), _jsx(Footer, {})] }));
}
