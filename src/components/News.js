import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const newsItems = [
    {
        id: 1,
        title: '新增服務項目：產銷履歷農產品分裝/流通',
        category: '新消息',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
        date: '2024-08-15'
    },
    {
        id: 2,
        title: '最新公告：驗證申請書改版 (新版次：2.2版)',
        category: '公告',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=400',
        date: '2024-05-09'
    },
    {
        id: 3,
        title: '知識之翼實體課程：ISO14067碳足跡內部查證訓練班',
        category: '活動',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400',
        date: '2024-05-06'
    }
];
const News = () => {
    return (_jsx("section", { id: "news", className: "py-24 bg-white relative border-t border-gray-100", children: _jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-12", children: [_jsx("div", { className: "w-12 h-1 bg-magpie-primary" }), _jsx("h2", { className: "text-3xl md:text-5xl font-bold text-magpie-primary tracking-wide", children: "\u6700\u65B0\u6D88\u606F" }), _jsx("div", { className: "w-3 h-3 bg-magpie-accent rounded-full mt-1" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: newsItems.map((item) => (_jsxs("div", { className: "bg-white border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group flex flex-col", children: [_jsxs("div", { className: "h-48 overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 left-0 bg-magpie-primary text-white px-4 py-1 text-sm font-bold z-10", children: item.category }), _jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 blur-[1px] group-hover:blur-0" })] }), _jsxs("div", { className: "p-6 flex-1 flex flex-col", children: [_jsx("span", { className: "text-magpie-primary font-bold text-sm mb-2 opacity-80", children: item.date }), _jsx("h4", { className: "text-xl font-bold text-magpie-dark mb-4 group-hover:text-magpie-primary transition-colors line-clamp-2", children: item.title }), _jsx("div", { className: "mt-auto", children: _jsxs("span", { className: "text-sm font-bold text-magpie-primary flex justify-end gap-1 items-center", children: ["READ MORE ", _jsx(ArrowRight, { size: 14 })] }) })] })] }, item.id))) }), _jsx("div", { className: "mt-16 text-center", children: _jsxs(Link, { to: "/news", className: "inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-magpie-primary text-magpie-primary hover:bg-magpie-primary hover:text-white font-bold transition-colors", children: ["\u5168\u90E8\u6D88\u606F", _jsx(ArrowRight, { size: 18 })] }) })] }) }));
};
export default News;
