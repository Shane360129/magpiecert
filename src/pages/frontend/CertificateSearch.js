import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import { certificatesApi } from '../../services/api';
const CertificateSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim())
            return;
        setLoading(true);
        setHasSearched(true);
        try {
            const allCerts = await certificatesApi.getAll();
            const found = allCerts.find((c) => c.id?.includes(searchTerm) ||
                c.name?.includes(searchTerm));
            setResult(found || null);
        }
        catch (err) {
            console.error('Failed to search certificates:', err);
            setResult(null);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-24", children: [_jsxs("div", { className: "bg-magpie-dark py-20 text-center text-white relative", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen", style: { backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" } }), _jsxs("div", { className: "relative z-10", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-black mb-4 tracking-wide", children: "\u8B49\u66F8\u67E5\u8A62" }), _jsx("div", { className: "w-16 h-1 bg-magpie-accent mx-auto mb-4" }), _jsx("p", { className: "text-lg text-magpie-lighter", children: "\u78BA\u4FDD\u54C1\u8CEA\uFF0C\u516C\u958B\u900F\u660E\u7684\u8A8D\u8B49\u72C0\u614B\u5F15\u64CE" })] })] }), _jsxs("div", { className: "container mx-auto px-4 max-w-4xl mt-[-3rem] relative z-20", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-xl p-8 border-t-8 border-magpie-primary", children: [_jsx("h2", { className: "text-2xl font-bold text-magpie-dark mb-6 text-center", children: "\u641C\u5C0B\u72C0\u614B\u8207\u8CC7\u6599\u5217" }), _jsxs("form", { onSubmit: handleSearch, className: "flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx("input", { type: "text", value: searchTerm, onChange: (e) => { setSearchTerm(e.target.value); setHasSearched(false); }, className: "w-full pl-6 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-magpie-primary focus:bg-white transition font-medium", placeholder: "\u8ACB\u8F38\u5165\u5BA2\u6236\u540D\u7A31\u6216\u8B49\u66F8\u7DE8\u78BC..." }), _jsx(Search, { className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400", size: 24 })] }), _jsx("button", { type: "submit", disabled: loading, className: "bg-magpie-primary hover:bg-magpie-hover text-white px-10 py-4 rounded-lg font-bold text-lg shadow-md transition-all hover:-translate-y-1 disabled:opacity-50", children: loading ? '查詢中...' : '立即查詢' })] }), _jsx("p", { className: "text-gray-400 text-sm mt-4 text-center", children: "\u8F38\u5165\u5BA2\u6236\u540D\u7A31\u6216\u8B49\u66F8\u7DE8\u78BC\u9032\u884C\u67E5\u8A62" })] }), hasSearched && !loading && (_jsx("div", { className: "mt-12 animate-fade-in-up", children: result ? (_jsxs("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100", children: [_jsxs("div", { className: `p-4 text-center text-white flex justify-center items-center gap-2 font-bold text-lg ${result.status === 'active' ? 'bg-green-500' : result.status === 'expired' ? 'bg-red-500' : 'bg-yellow-500'}`, children: [_jsx(ShieldCheck, { size: 28 }), "\u8A72\u8B49\u66F8\u76EE\u524D\u8655\u65BC\u3010", result.status === 'active' ? '有效' : result.status === 'expired' ? '終止' : '審核中', "\u3011\u72C0\u614B"] }), _jsx("div", { className: "p-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12", children: [_jsxs("div", { children: [_jsx("span", { className: "block text-gray-500 text-sm mb-1 uppercase tracking-wider", children: "\u8B49\u66F8\u7DE8\u78BC Certificate ID" }), _jsx("span", { className: "font-mono font-bold text-xl text-magpie-dark", children: result.id?.slice(0, 12) })] }), _jsxs("div", { children: [_jsx("span", { className: "block text-gray-500 text-sm mb-1 uppercase tracking-wider", children: "\u5BA2\u6236\u540D\u7A31 Client Name" }), _jsx("span", { className: "font-bold text-xl text-magpie-dark", children: result.name })] }), _jsxs("div", { children: [_jsx("span", { className: "block text-gray-500 text-sm mb-1 uppercase tracking-wider", children: "\u9A57\u8B49\u985E\u5225 Standard" }), _jsx("span", { className: "font-medium text-lg text-gray-800", children: result.type })] }), _jsxs("div", { children: [_jsx("span", { className: "block text-gray-500 text-sm mb-1 uppercase tracking-wider", children: "\u6838\u767C\u65E5\u671F Issue Date" }), _jsx("span", { className: "font-medium text-lg text-gray-800", children: result.issueDate })] })] }) })] })) : (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500 flex flex-col items-center", children: [_jsx(ShieldAlert, { size: 64, className: "text-gray-300 mb-6" }), _jsx("h3", { className: "text-2xl font-bold text-gray-700 mb-2", children: "\u67E5\u7121\u5339\u914D\u7684\u8B49\u66F8\u7D00\u9304" }), _jsxs("p", { className: "text-gray-500 max-w-md mx-auto", children: ["\u7CFB\u7D71\u4E2D\u6C92\u6709\u627E\u5230\u7B26\u5408 \"", searchTerm, "\" \u7684\u516C\u958B\u7D00\u9304\u3002\u8ACB\u78BA\u8A8D\u60A8\u8F38\u5165\u7684\u7DE8\u865F\u6216\u5168\u929C\u662F\u5426\u6B63\u78BA\u7121\u8AA4\u3002"] })] })) }))] })] }));
};
export default CertificateSearch;
