import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { coursesApi } from '../../services/api';
const courseTypeMap = {
    physical: { label: '實體課程', categories: ['品質管理', '農產品驗證', 'ESG查驗'] },
    online: { label: '線上講座', categories: ['品質管理', '農產品驗證', 'ESG查驗'] },
    videos: { label: '知識影片', categories: ['全部影片'] },
    corporate: { label: '企業包班', categories: ['企業包班方案'] },
};
const emptyCourse = (type) => ({
    title: '',
    category: '品質管理',
    type,
    date: new Date().toISOString().slice(0, 10),
    status: '草稿',
    students: 0,
    maxStudents: 30,
});
const CourseManage = () => {
    const { type } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [editingCourse, setEditingCourse] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const config = courseTypeMap[type || 'physical'] || courseTypeMap.physical;
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await coursesApi.getAll();
            const filtered = data.filter((c) => c.type === (type || 'physical'));
            setCourses(filtered);
        }
        catch (err) {
            console.error('Failed to fetch courses:', err);
            setCourses([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [type]);
    const handleSave = async () => {
        if (!editingCourse || !editingCourse.title)
            return;
        try {
            if (isNew) {
                await coursesApi.create({ ...editingCourse, type: type || 'physical' });
            }
            else {
                await coursesApi.update(editingCourse.id, editingCourse);
            }
            setEditingCourse(null);
            setIsNew(false);
            fetchCourses();
        }
        catch (err) {
            console.error('Failed to save course:', err);
            alert('儲存失敗，請稍後再試');
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('確定要刪除此課程嗎？'))
            return;
        try {
            await coursesApi.delete(id);
            fetchCourses();
        }
        catch (err) {
            console.error('Failed to delete course:', err);
            alert('刪除失敗，請稍後再試');
        }
    };
    const filtered = courses.filter(c => (selectedCategory === '全部' || c.category === selectedCategory) &&
        c.title.includes(searchTerm));
    const statusColors = {
        '報名中': 'bg-green-100 text-green-700',
        '即將開課': 'bg-blue-100 text-blue-700',
        '草稿': 'bg-gray-100 text-gray-500',
        '已結束': 'bg-red-100 text-red-500',
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h2", { className: "text-2xl font-bold text-magpie-dark", children: [config.label, "\u7BA1\u7406"] }), _jsxs("button", { onClick: () => { setEditingCourse(emptyCourse(type || 'physical')); setIsNew(true); }, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm", children: [_jsx(Plus, { size: 16 }), " \u65B0\u589E", config.label] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-4 mb-6", children: _jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "\u641C\u5C0B\u8AB2\u7A0B\u540D\u7A31...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm" })] }), config.categories.length > 1 && (_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setSelectedCategory('全部'), className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${selectedCategory === '全部' ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`, children: "\u5168\u90E8" }), config.categories.map((cat) => (_jsx("button", { onClick: () => setSelectedCategory(cat), className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`, children: cat }, cat)))] }))] }) }), editingCourse && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-lg font-bold text-magpie-dark", children: [isNew ? '新增' : '編輯', "\u8AB2\u7A0B"] }), _jsx("button", { onClick: () => { setEditingCourse(null); setIsNew(false); }, className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u8AB2\u7A0B\u540D\u7A31" }), _jsx("input", { type: "text", value: editingCourse.title || '', onChange: (e) => setEditingCourse({ ...editingCourse, title: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u5206\u985E" }), _jsx("select", { value: editingCourse.category || '', onChange: (e) => setEditingCourse({ ...editingCourse, category: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: config.categories.map(cat => _jsx("option", { value: cat, children: cat }, cat)) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u65E5\u671F" }), _jsx("input", { type: "date", value: editingCourse.date || '', onChange: (e) => setEditingCourse({ ...editingCourse, date: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u72C0\u614B" }), _jsxs("select", { value: editingCourse.status || '草稿', onChange: (e) => setEditingCourse({ ...editingCourse, status: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u8349\u7A3F", children: "\u8349\u7A3F" }), _jsx("option", { value: "\u5831\u540D\u4E2D", children: "\u5831\u540D\u4E2D" }), _jsx("option", { value: "\u5373\u5C07\u958B\u8AB2", children: "\u5373\u5C07\u958B\u8AB2" }), _jsx("option", { value: "\u5DF2\u7D50\u675F", children: "\u5DF2\u7D50\u675F" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u6700\u5927\u4EBA\u6578" }), _jsx("input", { type: "number", value: editingCourse.maxStudents || 30, onChange: (e) => setEditingCourse({ ...editingCourse, maxStudents: parseInt(e.target.value) }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => { setEditingCourse(null); setIsNew(false); }, className: "px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50", children: "\u53D6\u6D88" }), _jsxs("button", { onClick: handleSave, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold", children: [_jsx(Save, { size: 16 }), " \u5132\u5B58"] })] })] }) })), _jsx("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: loading ? (_jsx("div", { className: "p-8 text-center text-gray-500", children: "\u8F09\u5165\u4E2D..." })) : (_jsxs(_Fragment, { children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { className: "text-left", children: [_jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u8AB2\u7A0B\u540D\u7A31" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u5206\u985E" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u65E5\u671F" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u5831\u540D\u4EBA\u6578" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u72C0\u614B" }), _jsx("th", { className: "py-3 px-4 font-bold text-gray-600", children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "py-8 text-center text-gray-400", children: "\u5C1A\u7121\u8CC7\u6599" }) })) : filtered.map((course) => (_jsxs("tr", { className: "border-t border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4 font-medium", children: course.title }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 bg-magpie-lighter text-magpie-primary text-xs font-bold rounded", children: course.category }) }), _jsx("td", { className: "py-3 px-4 text-gray-500", children: course.date }), _jsx("td", { className: "py-3 px-4", children: _jsxs("span", { className: `font-bold ${(course.students || 0) >= (course.maxStudents || 30) ? 'text-red-500' : 'text-gray-700'}`, children: [course.students || 0, "/", course.maxStudents || 30] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded text-xs font-bold ${statusColors[course.status] || 'bg-gray-100 text-gray-500'}`, children: course.status }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => { setEditingCourse(course); setIsNew(false); }, className: "p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded", title: "\u7DE8\u8F2F", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => handleDelete(course.id), className: "p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded", title: "\u522A\u9664", children: _jsx(Trash2, { size: 14 }) })] }) })] }, course.id))) })] }), _jsxs("div", { className: "px-4 py-3 border-t border-gray-100 text-sm text-gray-500", children: ["\u5171 ", filtered.length, " \u7B46\u8CC7\u6599"] })] })) })] }));
};
export default CourseManage;
