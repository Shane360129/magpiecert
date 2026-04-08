import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Search, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsApi } from '../../services/api';
const News = () => {
    const [activeCategory, setActiveCategory] = useState('全部消息');
    const [searchQuery, setSearchQuery] = useState('');
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsApi.getAll();
                setNewsItems(data.filter((n) => n.status === '已發布'));
            }
            catch (err) {
                console.error('Failed to fetch news:', err);
                setNewsItems([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    const categoryMap = {
        '農業知識': '農產新知',
        '媒體報導': '新聞媒體',
    };
    const categories = ['全部消息', '農業知識', '媒體報導'];
    const filteredNews = newsItems.filter(item => {
        const matchCategory = activeCategory === '全部消息' ||
            item.category === activeCategory ||
            item.category === categoryMap[activeCategory];
        const matchSearch = !searchQuery ||
            (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.body || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col pt-16 md:pt-20", children: [_jsx("div", { className: "bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40 shadow-sm", children: _jsxs("div", { className: "container mx-auto px-4 py-4 md:py-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4", children: [_jsx("div", { className: "flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto", children: categories.map(cat => (_jsx("button", { onClick: () => setActiveCategory(cat), className: `whitespace-nowrap px-6 py-2.5 rounded-md font-bold text-sm transition-all ${activeCategory === cat
                                    ? 'bg-white text-magpie-primary shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'}`, children: cat }, cat))) }), _jsxs("div", { className: "relative w-full md:w-80", children: [_jsx("input", { type: "text", placeholder: "\u641C\u5C0B\u65B0\u805E\u3001\u516C\u544A\u6216\u95DC\u9375\u5B57...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-lg focus:ring-1 focus:ring-magpie-primary outline-none transition-shadow text-sm" }), _jsx(Search, { size: 18, className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" })] })] }) }), _jsxs("div", { className: "container mx-auto px-4 md:px-8 py-10 max-w-6xl flex-1", children: [_jsxs("div", { className: "text-sm text-gray-400 font-medium mb-12 flex items-center gap-2", children: [_jsx(Link, { to: "/", className: "hover:text-magpie-primary transition", children: "\u9996\u9801" }), _jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "text-gray-600", children: "\u6700\u65B0\u6D88\u606F" }), activeCategory !== '全部消息' && (_jsxs(_Fragment, { children: [_jsx(ChevronRight, { size: 14 }), _jsx("span", { className: "text-gray-900 font-bold", children: activeCategory })] }))] }), _jsxs("div", { className: "flex items-center gap-3 mb-10", children: [_jsx("div", { className: "w-2 h-10 bg-[#00A1E0] rounded-full" }), _jsxs("h1", { className: "text-4xl font-black text-gray-900 tracking-wide uppercase", children: ["News ", _jsxs("span", { className: "text-2xl font-bold ml-2 text-gray-400", children: ["/ ", activeCategory] })] })] }), loading ? (_jsx("div", { className: "text-center py-16 text-gray-400", children: "\u8F09\u5165\u4E2D..." })) : filteredNews.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredNews.map((item) => (_jsxs("div", { className: "bg-white rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-sans group cursor-pointer border border-gray-100/50 flex flex-col", children: [_jsxs("div", { className: "h-56 relative overflow-hidden bg-magpie-lighter", children: [item.image ? (_jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center text-magpie-primary text-6xl font-black opacity-20", children: item.category?.charAt(0) || 'N' })), _jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur text-magpie-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-sm", children: item.category })] }), _jsxs("div", { className: "p-6 flex flex-col flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-magpie-primary text-sm font-bold mb-3", children: [_jsx(Calendar, { size: 14 }), item.date] }), _jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-magpie-primary transition-colors line-clamp-2", children: item.title }), _jsx("p", { className: "text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1", children: item.body || '' }), _jsxs("div", { className: "mt-auto border-t border-gray-100 pt-4 flex items-center justify-between text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity", children: [_jsx("span", { className: "text-gray-600 group-hover:text-magpie-primary transition-colors", children: "\u7E7C\u7E8C\u95B1\u8B80" }), _jsx(ArrowRight, { size: 16, className: "text-magpie-primary transform group-hover:translate-x-1 transition-transform" })] })] })] }, item.id))) })) : (_jsxs("div", { className: "bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100 mt-8", children: [_jsx("div", { className: "inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-50 mb-6", children: _jsx(Search, { size: 32, className: "text-gray-300" }) }), _jsx("h3", { className: "text-2xl font-bold text-gray-700 mb-2", children: "\u627E\u4E0D\u5230\u76F8\u95DC\u6D88\u606F" }), _jsx("p", { className: "text-gray-500", children: "\u5F88\u62B1\u6B49\uFF0C\u6C92\u6709\u7B26\u5408\u689D\u4EF6\u7684\u7D50\u679C\uFF0C\u8ACB\u5617\u8A66\u5176\u4ED6\u95DC\u9375\u5B57\u3002" }), _jsx("button", { onClick: () => { setSearchQuery(''); setActiveCategory('全部消息'); }, className: "mt-8 px-6 py-2 bg-magpie-primary text-white font-bold rounded-lg hover:bg-magpie-dark transition-colors", children: "\u986F\u793A\u5168\u90E8\u6D88\u606F" })] }))] })] }));
};
export default News;
