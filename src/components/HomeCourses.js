import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { coursesApi } from '../services/api';
const HomeCourses = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        coursesApi.getAll()
            .then((items) => {
            const sorted = items
                .filter((c) => c.status !== '草稿')
                .sort((a, b) => {
                const dateA = a.startDate || a.date || a.createdAt || '';
                const dateB = b.startDate || b.date || b.createdAt || '';
                return dateB.localeCompare(dateA);
            })
                .slice(0, 5);
            setCourses(sorted);
        })
            .catch(() => { });
    }, []);
    const formatDate = (course) => {
        const raw = course.startDate || course.date || course.createdAt || '';
        if (!raw)
            return '';
        const d = new Date(raw);
        if (isNaN(d.getTime()))
            return raw;
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    };
    return (_jsx("section", { className: "py-24 bg-grid-pattern relative", children: _jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [_jsx("h2", { className: "text-5xl md:text-7xl font-bold text-magpie-primary text-center mb-2 tracking-wide", children: "\u8AB2\u7A0B\u8B1B\u5EA7" }), _jsx("div", { className: "flex justify-center mb-16", children: _jsx("div", { className: "w-3 h-3 bg-magpie-accent rounded-full" }) }), _jsxs("div", { className: "flex flex-col md:flex-row gap-12 items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl md:text-3xl font-bold text-magpie-primary mb-4", children: "\u7A3D\u6838\u8207\u6559\u80B2\u8A13\u7DF4" }), _jsx("p", { className: "text-lg text-gray-700 leading-relaxed mb-8", children: "\u6211\u5011\u63D0\u4F9B\u8FB2\u7522\u54C1\u9A57\u8B49\u3001\u5B89\u5168\u7BA1\u7406\u53CAESG\u76F8\u95DC\u7CFB\u7D71\u7684\u7A3D\u6838\u8AB2\u7A0B\u3002\u4EA6\u63D0\u4F9B\u4E3B\u5C0E\u67E5\u8B49\u54E1\u6559\u80B2\u8A13\u7DF4\u3002" }), _jsx("div", { className: "overflow-hidden rounded-lg shadow-lg", children: _jsx("img", { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600", alt: "\u6559\u80B2\u8A13\u7DF4\u8AB2\u7A0B", className: "w-full h-64 object-cover" }) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-bold text-magpie-primary mb-6 border-b-2 border-magpie-primary inline-block pb-2", children: "\u6700\u65B0\u6D3B\u52D5" }), _jsx("div", { className: "divide-y divide-gray-200", children: courses.length === 0 ? (_jsx("p", { className: "text-gray-400 py-5", children: "\u76EE\u524D\u5C1A\u7121\u8AB2\u7A0B\u8CC7\u6599" })) : (courses.map((item) => (_jsxs(Link, { to: "/education", className: "flex items-center justify-between py-5 hover:bg-gray-50 transition-colors group px-2", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsx("span", { className: "text-magpie-primary font-bold text-sm whitespace-nowrap", children: formatDate(item) }), _jsx("span", { className: "text-gray-800 group-hover:text-magpie-primary transition-colors", children: item.title })] }), _jsx(ChevronRight, { size: 20, className: "text-gray-400 group-hover:text-magpie-primary shrink-0" })] }, item.id)))) }), _jsx("div", { className: "mt-8", children: _jsxs(Link, { to: "/education", className: "inline-flex items-center gap-4 px-10 py-4 bg-magpie-primary hover:bg-magpie-hover text-white font-bold text-lg tracking-wider shadow-lg transition-transform hover:-translate-y-1", children: ["DISCOVER MORE", _jsx(ArrowRight, { size: 22 })] }) })] })] })] }) }));
};
export default HomeCourses;
