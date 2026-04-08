import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, FileText, X, Save } from 'lucide-react';
import { downloadsApi } from '../../services/api';
const categories = ['全部', '品質管理', '農產品驗證', 'ESG查驗'];
const emptyFile = () => ({
    name: '',
    category: '品質管理',
    format: 'PDF',
    size: '0 MB',
    downloads: 0,
    updatedAt: new Date().toISOString().slice(0, 10),
});
const DownloadManage = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingFile, setEditingFile] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const fetchFiles = async () => {
        setLoading(true);
        try {
            const data = await downloadsApi.getAll();
            setFiles(data);
        }
        catch (err) {
            console.error('Failed to fetch downloads:', err);
            setFiles([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFiles();
    }, []);
    const handleSave = async () => {
        if (!editingFile || !editingFile.name)
            return;
        try {
            if (isNew) {
                await downloadsApi.create(editingFile);
            }
            else {
                await downloadsApi.update(editingFile.id, editingFile);
            }
            setEditingFile(null);
            setIsNew(false);
            fetchFiles();
        }
        catch (err) {
            console.error('Failed to save file:', err);
            alert('儲存失敗，請稍後再試');
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('確定要刪除此文件嗎？'))
            return;
        try {
            await downloadsApi.delete(id);
            fetchFiles();
        }
        catch (err) {
            console.error('Failed to delete file:', err);
            alert('刪除失敗，請稍後再試');
        }
    };
    const filtered = files.filter(f => (selectedCategory === '全部' || f.category === selectedCategory) &&
        f.name.includes(searchTerm));
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-magpie-dark", children: "\u6587\u4EF6\u4E0B\u8F09\u7BA1\u7406" }), _jsxs("button", { onClick: () => { setEditingFile(emptyFile()); setIsNew(true); }, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm", children: [_jsx(Plus, { size: 16 }), " \u65B0\u589E\u6587\u4EF6"] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-4 mb-6", children: _jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "\u641C\u5C0B\u6587\u4EF6\u540D\u7A31...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm" })] }), _jsx("div", { className: "flex gap-2", children: categories.map((cat) => (_jsx("button", { onClick: () => setSelectedCategory(cat), className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`, children: cat }, cat))) })] }) }), editingFile && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-magpie-dark", children: [isNew ? '新增' : '編輯', "\u6587\u4EF6"] }), _jsx("button", { onClick: () => { setEditingFile(null); setIsNew(false); }, className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u6587\u4EF6\u540D\u7A31" }), _jsx("input", { type: "text", value: editingFile.name || '', onChange: (e) => setEditingFile({ ...editingFile, name: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u5206\u985E" }), _jsxs("select", { value: editingFile.category || '品質管理', onChange: (e) => setEditingFile({ ...editingFile, category: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u54C1\u8CEA\u7BA1\u7406", children: "\u54C1\u8CEA\u7BA1\u7406" }), _jsx("option", { value: "\u8FB2\u7522\u54C1\u9A57\u8B49", children: "\u8FB2\u7522\u54C1\u9A57\u8B49" }), _jsx("option", { value: "ESG\u67E5\u9A57", children: "ESG\u67E5\u9A57" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u683C\u5F0F" }), _jsxs("select", { value: editingFile.format || 'PDF', onChange: (e) => setEditingFile({ ...editingFile, format: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "PDF", children: "PDF" }), _jsx("option", { value: "DOC", children: "DOC" }), _jsx("option", { value: "XLS", children: "XLS" })] })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => { setEditingFile(null); setIsNew(false); }, className: "px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50", children: "\u53D6\u6D88" }), _jsxs("button", { onClick: handleSave, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold", children: [_jsx(Save, { size: 16 }), " \u5132\u5B58"] })] })] }) })), _jsx("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: loading ? (_jsx("div", { className: "p-8 text-center text-gray-500", children: "\u8F09\u5165\u4E2D..." })) : (_jsxs(_Fragment, { children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { className: "text-left", children: [_jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u6587\u4EF6\u540D\u7A31" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u5206\u985E" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u683C\u5F0F" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u5927\u5C0F" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u4E0B\u8F09\u6B21\u6578" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u66F4\u65B0\u65E5\u671F" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "py-8 text-center text-gray-400", children: "\u5C1A\u7121\u8CC7\u6599" }) })) : filtered.map((file) => (_jsxs("tr", { className: "border-t border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FileText, { size: 16, className: "text-red-500 shrink-0" }), _jsx("span", { className: "font-medium", children: file.name })] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 bg-magpie-lighter text-magpie-primary text-xs font-bold rounded", children: file.category }) }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: file.format }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: file.size }), _jsx("td", { className: "py-3 px-4 font-bold text-gray-700", children: file.downloads || 0 }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: file.updatedAt }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => { setEditingFile(file); setIsNew(false); }, className: "p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded", title: "\u7DE8\u8F2F", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => handleDelete(file.id), className: "p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded", title: "\u522A\u9664", children: _jsx(Trash2, { size: 14 }) })] }) })] }, file.id))) })] }), _jsxs("div", { className: "px-4 py-3 border-t border-gray-100 text-sm text-gray-500", children: ["\u5171 ", filtered.length, " \u7B46\u6587\u4EF6"] })] })) })] }));
};
export default DownloadManage;
