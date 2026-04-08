import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { certificatesApi } from '../../services/api';
const emptyCert = () => ({
    name: '',
    type: '有機驗證農糧',
    issueDate: new Date().toISOString().slice(0, 10),
    status: 'pending',
});
const Certificates = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCert, setEditingCert] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchCerts = async () => {
        setLoading(true);
        try {
            const data = await certificatesApi.getAll();
            setCerts(data);
        }
        catch (err) {
            console.error('Failed to fetch certificates:', err);
            setCerts([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCerts();
    }, []);
    const handleSave = async () => {
        if (!editingCert || !editingCert.name)
            return;
        try {
            if (isNew) {
                await certificatesApi.create(editingCert);
            }
            else {
                await certificatesApi.update(editingCert.id, editingCert);
            }
            setEditingCert(null);
            setIsNew(false);
            fetchCerts();
        }
        catch (err) {
            console.error('Failed to save certificate:', err);
            alert('儲存失敗，請稍後再試');
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('確定要刪除此證書嗎？'))
            return;
        try {
            await certificatesApi.delete(id);
            fetchCerts();
        }
        catch (err) {
            console.error('Failed to delete certificate:', err);
            alert('刪除失敗，請稍後再試');
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return _jsx("span", { className: "px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold", children: "\u6709\u6548 Active" });
            case 'expired': return _jsx("span", { className: "px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold", children: "\u7D42\u6B62 Expired" });
            case 'pending': return _jsx("span", { className: "px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold", children: "\u5BE9\u6838\u4E2D Pending" });
            default: return _jsx("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold", children: status });
        }
    };
    const filtered = certs.filter(c => c.name.includes(searchTerm) || c.id.includes(searchTerm));
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-extrabold text-magpie-dark tracking-wide", children: "\u8B49\u66F8\u72C0\u614B\u8207\u8CC7\u6599\u67E5\u8A62" }), _jsx("p", { className: "text-gray-500 mt-1", children: "\u7BA1\u7406\u8207\u7DAD\u8B77\u7CFB\u7D71\u5167\u6240\u6709\u7684\u751F\u7522\u8005\u9A57\u8B49\u72C0\u614B" })] }), _jsxs("button", { onClick: () => { setEditingCert(emptyCert()); setIsNew(true); }, className: "flex items-center gap-2 bg-magpie-primary hover:bg-magpie-hover text-white px-4 py-2 rounded shadow transition font-medium", children: [_jsx(Plus, { size: 18 }), " \u65B0\u589E\u9A57\u8B49\u7D00\u9304"] })] }), editingCert && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-magpie-dark", children: [isNew ? '新增' : '編輯', "\u9A57\u8B49\u7D00\u9304"] }), _jsx("button", { onClick: () => { setEditingCert(null); setIsNew(false); }, className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u5BA2\u6236\u540D\u7A31" }), _jsx("input", { type: "text", value: editingCert.name || '', onChange: (e) => setEditingCert({ ...editingCert, name: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u9A57\u8B49\u985E\u5225" }), _jsxs("select", { value: editingCert.type || '', onChange: (e) => setEditingCert({ ...editingCert, type: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u6709\u6A5F\u9A57\u8B49\u8FB2\u7CE7", children: "\u6709\u6A5F\u9A57\u8B49\u8FB2\u7CE7" }), _jsx("option", { value: "\u7522\u92B7\u5C65\u6B77\u6C34\u7522", children: "\u7522\u92B7\u5C65\u6B77\u6C34\u7522" }), _jsx("option", { value: "\u7522\u92B7\u5C65\u6B77\u8FB2\u7522", children: "\u7522\u92B7\u5C65\u6B77\u8FB2\u7522" }), _jsx("option", { value: "\u7522\u92B7\u5C65\u6B77\u8702\u7522", children: "\u7522\u92B7\u5C65\u6B77\u8702\u7522" }), _jsx("option", { value: "\u7522\u92B7\u5C65\u6B77\u755C\u7522", children: "\u7522\u92B7\u5C65\u6B77\u755C\u7522" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u6838\u767C\u65E5\u671F" }), _jsx("input", { type: "date", value: editingCert.issueDate || '', onChange: (e) => setEditingCert({ ...editingCert, issueDate: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u72C0\u614B" }), _jsxs("select", { value: editingCert.status || 'pending', onChange: (e) => setEditingCert({ ...editingCert, status: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "active", children: "\u6709\u6548" }), _jsx("option", { value: "pending", children: "\u5BE9\u6838\u4E2D" }), _jsx("option", { value: "expired", children: "\u7D42\u6B62" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => { setEditingCert(null); setIsNew(false); }, className: "px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50", children: "\u53D6\u6D88" }), _jsxs("button", { onClick: handleSave, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold", children: [_jsx(Save, { size: 16 }), " \u5132\u5B58"] })] })] }) })), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [_jsx("div", { className: "p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50", children: _jsxs("div", { className: "relative flex-1 max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }), _jsx("input", { type: "text", placeholder: "\u641C\u5C0B\u5BA2\u6236\u540D\u7A31\u6216\u8B49\u66F8\u7DE8\u78BC...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-magpie-primary text-sm" })] }) }), loading ? (_jsx("div", { className: "p-8 text-center text-gray-500", children: "\u8F09\u5165\u4E2D..." })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wider", children: [_jsx("th", { className: "p-4 font-bold border-b border-gray-100", children: "\u8B49\u66F8\u7DE8\u78BC" }), _jsx("th", { className: "p-4 font-bold border-b border-gray-100", children: "\u5BA2\u6236\u540D\u7A31" }), _jsx("th", { className: "p-4 font-bold border-b border-gray-100", children: "\u985E\u5225" }), _jsx("th", { className: "p-4 font-bold border-b border-gray-100", children: "\u6838\u767C\u65E5\u671F" }), _jsx("th", { className: "p-4 font-bold border-b border-gray-100", children: "\u72C0\u614B" }), _jsx("th", { className: "p-4 font-bold border-b border-gray-100 text-right", children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { className: "text-sm", children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "py-8 text-center text-gray-400", children: "\u5C1A\u7121\u8CC7\u6599" }) })) : filtered.map((cert) => (_jsxs("tr", { className: "hover:bg-magpie-lighter/40 transition-colors border-b border-gray-50 last:border-0", children: [_jsx("td", { className: "p-4 font-mono font-bold text-magpie-primary", children: cert.id.slice(0, 10) }), _jsx("td", { className: "p-4 font-bold text-gray-800", children: cert.name }), _jsx("td", { className: "p-4 text-gray-600", children: cert.type }), _jsx("td", { className: "p-4 text-gray-600", children: cert.issueDate }), _jsx("td", { className: "p-4", children: getStatusBadge(cert.status) }), _jsx("td", { className: "p-4 text-right", children: _jsxs("div", { className: "flex gap-1 justify-end", children: [_jsx("button", { onClick: () => { setEditingCert(cert); setIsNew(false); }, className: "p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded", title: "\u7DE8\u8F2F", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => handleDelete(cert.id), className: "p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded", title: "\u522A\u9664", children: _jsx(Trash2, { size: 14 }) })] }) })] }, cert.id))) })] }) })), _jsxs("div", { className: "p-4 border-t border-gray-100 text-sm text-gray-500", children: ["\u5171 ", filtered.length, " \u7B46\u8CC7\u6599"] })] })] }));
};
export default Certificates;
