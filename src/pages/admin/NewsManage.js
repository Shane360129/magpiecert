import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { newsApi } from '../../services/api';
const newsTypeMap = {
    agriculture: '農產新知',
    media: '新聞媒體',
    faq: '常見問題',
};
const emptyNews = (category) => ({
    title: '',
    category,
    status: '草稿',
    author: 'Admin',
    date: new Date().toISOString().slice(0, 10),
    views: 0,
    body: '',
});
const NewsManage = () => {
    const { type } = useParams();
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingNews, setEditingNews] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const newsType = newsTypeMap[type || 'agriculture'] || '農產新知';
    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await newsApi.getAll();
            const filtered = data.filter((n) => n.category === newsType);
            setNewsList(filtered);
        }
        catch (err) {
            console.error('Failed to fetch news:', err);
            setNewsList([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchNews();
    }, [type]);
    const handleSave = async () => {
        if (!editingNews || !editingNews.title)
            return;
        try {
            if (isNew) {
                await newsApi.create({ ...editingNews, category: newsType });
            }
            else {
                await newsApi.update(editingNews.id, editingNews);
            }
            setEditingNews(null);
            setIsNew(false);
            fetchNews();
        }
        catch (err) {
            console.error('Failed to save news:', err);
            alert('儲存失敗，請稍後再試');
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('確定要刪除此文章嗎？'))
            return;
        try {
            await newsApi.delete(id);
            fetchNews();
        }
        catch (err) {
            console.error('Failed to delete news:', err);
            alert('刪除失敗，請稍後再試');
        }
    };
    const filtered = newsList.filter(n => n.title.includes(searchTerm));
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h2", { className: "text-2xl font-bold text-magpie-dark", children: [newsType, "\u7BA1\u7406"] }), _jsxs("button", { onClick: () => { setEditingNews(emptyNews(newsType)); setIsNew(true); }, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm", children: [_jsx(Plus, { size: 16 }), " \u65B0\u589E", newsType] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-4 mb-6", children: _jsxs("div", { className: "relative max-w-md", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: `搜尋${newsType}標題...`, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm" })] }) }), editingNews && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-magpie-dark", children: [isNew ? '新增' : '編輯', newsType] }), _jsx("button", { onClick: () => { setEditingNews(null); setIsNew(false); }, className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u6A19\u984C" }), _jsx("input", { type: "text", value: editingNews.title || '', onChange: (e) => setEditingNews({ ...editingNews, title: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u72C0\u614B" }), _jsxs("select", { value: editingNews.status || '草稿', onChange: (e) => setEditingNews({ ...editingNews, status: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u8349\u7A3F", children: "\u8349\u7A3F" }), _jsx("option", { value: "\u5DF2\u767C\u5E03", children: "\u5DF2\u767C\u5E03" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u65E5\u671F" }), _jsx("input", { type: "date", value: editingNews.date || '', onChange: (e) => setEditingNews({ ...editingNews, date: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u5167\u6587" }), _jsx("textarea", { rows: 6, value: editingNews.body || '', onChange: (e) => setEditingNews({ ...editingNews, body: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => { setEditingNews(null); setIsNew(false); }, className: "px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50", children: "\u53D6\u6D88" }), _jsxs("button", { onClick: handleSave, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold", children: [_jsx(Save, { size: 16 }), " \u5132\u5B58"] })] })] }) })), _jsx("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: loading ? (_jsx("div", { className: "p-8 text-center text-gray-500", children: "\u8F09\u5165\u4E2D..." })) : (_jsxs(_Fragment, { children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { className: "text-left", children: [_jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u6A19\u984C" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u4F5C\u8005" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u767C\u5E03\u65E5\u671F" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u700F\u89BD\u6578" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u72C0\u614B" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "py-8 text-center text-gray-400", children: "\u5C1A\u7121\u8CC7\u6599" }) })) : filtered.map((item) => (_jsxs("tr", { className: "border-t border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4 font-medium max-w-sm", children: _jsx("p", { className: "truncate", children: item.title }) }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: item.author }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: item.date }), _jsx("td", { className: "py-3 px-4 font-bold text-gray-700", children: (item.views || 0).toLocaleString() }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded text-xs font-bold ${item.status === '已發布' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`, children: item.status }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => { setEditingNews(item); setIsNew(false); }, className: "p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded", title: "\u7DE8\u8F2F", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => handleDelete(item.id), className: "p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded", title: "\u522A\u9664", children: _jsx(Trash2, { size: 14 }) })] }) })] }, item.id))) })] }), _jsxs("div", { className: "px-4 py-3 border-t border-gray-100 text-sm text-gray-500", children: ["\u5171 ", filtered.length, " \u7B46\u8CC7\u6599"] })] })) })] }));
};
export default NewsManage;
