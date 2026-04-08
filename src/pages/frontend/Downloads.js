import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { FileDown, FileText, Download } from 'lucide-react';
import { downloadsApi } from '../../services/api';
const Downloads = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFiles = async () => {
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
        fetchFiles();
    }, []);
    // Group files by category
    const grouped = files.reduce((acc, file) => {
        const cat = file.category || '其他';
        if (!acc[cat])
            acc[cat] = [];
        acc[cat].push(file);
        return acc;
    }, {});
    const categoryOrder = ['品質管理', '農產品驗證', 'ESG查驗', '其他'];
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
        const ai = categoryOrder.indexOf(a);
        const bi = categoryOrder.indexOf(b);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
    return (_jsxs("div", { className: "min-h-screen bg-grid-pattern pb-24", children: [_jsxs("div", { className: "bg-magpie-dark py-20 text-center text-white relative", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen", style: { backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" } }), _jsxs("div", { className: "relative z-10", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-black mb-4 tracking-wide", children: "\u6587\u4EF6\u4E0B\u8F09" }), _jsx("div", { className: "w-16 h-1 bg-magpie-accent mx-auto mb-4" }), _jsx("p", { className: "text-lg text-magpie-lighter", children: "\u63D0\u4F9B\u6700\u65B0\u7248\u672C\u7684\u898F\u7BC4\u6307\u5357\u8207\u7533\u8ACB\u8868\u55AE\u4F9B\u6C11\u773E\u4E0B\u8F09" })] })] }), _jsxs("div", { className: "container mx-auto px-4 max-w-5xl mt-12", children: [loading ? (_jsx("div", { className: "text-center py-16 text-gray-400", children: "\u8F09\u5165\u4E2D..." })) : sortedCategories.length === 0 ? (_jsx("div", { className: "text-center py-16 text-gray-400", children: "\u76EE\u524D\u5C1A\u7121\u4E0B\u8F09\u6587\u4EF6" })) : (_jsx("div", { className: "space-y-12", children: sortedCategories.map((catName) => (_jsxs("div", { className: "bg-white rounded-xl shadow-md overflow-hidden border border-gray-100", children: [_jsxs("div", { className: "bg-gray-50 px-8 py-5 border-b border-gray-100 flex items-center gap-3", children: [_jsx(FileDown, { className: "text-magpie-primary", size: 24 }), _jsx("h2", { className: "text-xl font-bold text-magpie-dark tracking-wide", children: catName })] }), _jsx("div", { className: "divide-y divide-gray-50", children: grouped[catName].map((file) => (_jsxs("div", { className: "px-8 py-5 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-magpie-lighter/30 transition-colors group", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4 sm:mb-0", children: [_jsx("div", { className: `w-12 h-12 flex items-center justify-center rounded-lg ${(file.format || 'PDF') === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`, children: _jsx(FileText, { size: 24 }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-gray-800 group-hover:text-magpie-primary transition-colors", children: file.name }), _jsxs("p", { className: "text-sm text-gray-400 font-medium", children: [file.format || 'PDF', " \u683C\u5F0F ", file.size ? `‧ 大小 ${file.size}` : ''] })] })] }), _jsxs("button", { className: "flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:border-magpie-primary text-gray-700 hover:text-magpie-primary hover:bg-magpie-lighter rounded font-bold transition-all shadow-sm", children: [_jsx(Download, { size: 18 }), " \u9EDE\u64CA\u4E0B\u8F09"] })] }, file.id))) })] }, catName))) })), _jsxs("div", { className: "mt-16 text-center", children: [_jsx("h4", { className: "font-bold text-xl text-gray-800 mb-4", children: "\u627E\u4E0D\u5230\u60A8\u9700\u8981\u7684\u6587\u4EF6\u55CE\uFF1F" }), _jsx("p", { className: "text-gray-500 mb-6", children: "\u5982\u9700\u7533\u8ACB\u7279\u5B9A\u7684\u820A\u7248\u6587\u4EF6\u6216\u7D22\u53D6\u7D19\u672C\u6587\u4EF6\uFF0C\u8ACB\u806F\u7E6B\u6211\u5011\u7684\u5BA2\u670D\u7A97\u53E3\u3002" })] })] })] }));
};
export default Downloads;
