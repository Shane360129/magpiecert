import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, X, Save } from 'lucide-react';
import { recruitmentApi } from '../../services/api';
const emptyJob = () => ({
    title: '',
    department: '驗證部',
    type: '全職',
    status: '招募中',
    applicants: 0,
    updatedAt: new Date().toISOString().slice(0, 10),
});
const RecruitmentManage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('全部');
    const [editingJob, setEditingJob] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await recruitmentApi.getAll();
            setJobs(data);
        }
        catch (err) {
            console.error('Failed to fetch jobs:', err);
            setJobs([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchJobs();
    }, []);
    const handleSave = async () => {
        if (!editingJob || !editingJob.title)
            return;
        try {
            if (isNew) {
                await recruitmentApi.create(editingJob);
            }
            else {
                await recruitmentApi.update(editingJob.id, editingJob);
            }
            setEditingJob(null);
            setIsNew(false);
            fetchJobs();
        }
        catch (err) {
            console.error('Failed to save job:', err);
            alert('儲存失敗，請稍後再試');
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('確定要刪除此職缺嗎？'))
            return;
        try {
            await recruitmentApi.delete(id);
            fetchJobs();
        }
        catch (err) {
            console.error('Failed to delete job:', err);
            alert('刪除失敗，請稍後再試');
        }
    };
    const filtered = jobs.filter(j => filter === '全部' || j.status === filter);
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-magpie-dark", children: "\u83C1\u82F1\u62DB\u52DF\u7BA1\u7406" }), _jsxs("button", { onClick: () => { setEditingJob(emptyJob()); setIsNew(true); }, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm", children: [_jsx(Plus, { size: 16 }), " \u65B0\u589E\u8077\u7F3A"] })] }), _jsx("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
                    { label: '招募中', count: jobs.filter(j => j.status === '招募中').length, color: 'text-green-600 bg-green-50' },
                    { label: '已截止', count: jobs.filter(j => j.status === '已截止').length, color: 'text-gray-500 bg-gray-50' },
                    { label: '總應徵數', count: jobs.reduce((sum, j) => sum + (j.applicants || 0), 0), color: 'text-magpie-primary bg-magpie-lighter' },
                ].map(s => (_jsxs("div", { className: `${s.color} rounded-lg p-4 text-center`, children: [_jsx("p", { className: "text-3xl font-bold", children: s.count }), _jsx("p", { className: "text-sm mt-1", children: s.label })] }, s.label))) }), _jsx("div", { className: "flex gap-2 mb-4", children: ['全部', '招募中', '已截止'].map(f => (_jsx("button", { onClick: () => setFilter(f), className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${filter === f ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`, children: f }, f))) }), editingJob && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-magpie-dark", children: [isNew ? '新增' : '編輯', "\u8077\u7F3A"] }), _jsx("button", { onClick: () => { setEditingJob(null); setIsNew(false); }, className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u8077\u7F3A\u540D\u7A31" }), _jsx("input", { type: "text", value: editingJob.title || '', onChange: (e) => setEditingJob({ ...editingJob, title: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u90E8\u9580" }), _jsxs("select", { value: editingJob.department || '驗證部', onChange: (e) => setEditingJob({ ...editingJob, department: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u9A57\u8B49\u90E8", children: "\u9A57\u8B49\u90E8" }), _jsx("option", { value: "\u8FB2\u7522\u54C1\u90E8", children: "\u8FB2\u7522\u54C1\u90E8" }), _jsx("option", { value: "\u6C38\u7E8C\u90E8", children: "\u6C38\u7E8C\u90E8" }), _jsx("option", { value: "\u7BA1\u7406\u90E8", children: "\u7BA1\u7406\u90E8" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u985E\u578B" }), _jsxs("select", { value: editingJob.type || '全職', onChange: (e) => setEditingJob({ ...editingJob, type: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u5168\u8077", children: "\u5168\u8077" }), _jsx("option", { value: "\u517C\u8077", children: "\u517C\u8077" }), _jsx("option", { value: "\u5BE6\u7FD2", children: "\u5BE6\u7FD2" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u72C0\u614B" }), _jsxs("select", { value: editingJob.status || '招募中', onChange: (e) => setEditingJob({ ...editingJob, status: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u62DB\u52DF\u4E2D", children: "\u62DB\u52DF\u4E2D" }), _jsx("option", { value: "\u5DF2\u622A\u6B62", children: "\u5DF2\u622A\u6B62" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => { setEditingJob(null); setIsNew(false); }, className: "px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50", children: "\u53D6\u6D88" }), _jsxs("button", { onClick: handleSave, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold", children: [_jsx(Save, { size: 16 }), " \u5132\u5B58"] })] })] }) })), _jsx("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: loading ? (_jsx("div", { className: "p-8 text-center text-gray-500", children: "\u8F09\u5165\u4E2D..." })) : (_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { className: "text-left", children: [_jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u8077\u7F3A\u540D\u7A31" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u90E8\u9580" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u985E\u578B" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u61C9\u5FB5\u4EBA\u6578" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u72C0\u614B" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u66F4\u65B0\u65E5\u671F" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "py-8 text-center text-gray-400", children: "\u5C1A\u7121\u8CC7\u6599" }) })) : filtered.map((job) => (_jsxs("tr", { className: "border-t border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4 font-medium", children: job.title }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: job.department }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded", children: job.type }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("span", { className: "flex items-center gap-1 font-bold text-gray-700", children: [_jsx(Users, { size: 14 }), " ", job.applicants || 0] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded text-xs font-bold ${job.status === '招募中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`, children: job.status }) }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: job.updatedAt }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => { setEditingJob(job); setIsNew(false); }, className: "p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => handleDelete(job.id), className: "p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded", children: _jsx(Trash2, { size: 14 }) })] }) })] }, job.id))) })] })) })] }));
};
export default RecruitmentManage;
