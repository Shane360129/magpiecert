import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
function PageHeader({ title, sub }) {
    return (_jsx("div", { className: "bg-gradient-to-br from-navy-900 to-navy-700 text-white pt-32 pb-16 px-4", children: _jsxs("div", { className: "container mx-auto", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-3", children: title }), sub && _jsx("p", { className: "text-slate-300 text-lg", children: sub })] }) }));
}
// ─── About ──────────────────────────────────────
const policies = [
    { title: '驗證品質政策', icon: '✅' },
    { title: '人才發展品質政策', icon: '👥' },
    { title: '公正性聲明', icon: '⚖️' },
    { title: '財務來源', icon: '💼' },
];
export function About() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u95DC\u65BC\u6211\u5011", sub: "About MBC" }), _jsx("section", { className: "section bg-white", children: _jsxs("div", { className: "container mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20", children: [_jsxs("div", { children: [_jsx("p", { className: "section-label", children: "\u516C\u53F8\u7C21\u4ECB" }), _jsx("h2", { className: "section-title", children: "\u85CD\u9D72 MBC" }), _jsx("p", { className: "text-slate-500 leading-relaxed mb-4", children: "\u85CD\u9D72 MBC \u662F\u53F0\u7063\u5C08\u696D\u7684\u9A57\u8B49\u8207\u6559\u80B2\u8A13\u7DF4\u6A5F\u69CB\uFF0C\u9577\u671F\u81F4\u529B\u65BC\u5354\u52A9\u4F01\u696D\u53D6\u5F97\u570B\u969B\u8A8D\u8B49\uFF0C\u5EFA\u7ACB\u5B8C\u5584\u7684\u54C1\u8CEA\u7BA1\u7406\u9AD4\u7CFB\u3002" }), _jsx("p", { className: "text-slate-500 leading-relaxed mb-4", children: "\u6211\u5011\u64C1\u6709\u8C50\u5BCC\u7684\u696D\u754C\u5BE6\u52D9\u7D93\u9A57\uFF0C\u63D0\u4F9B\u5BA2\u88FD\u5316\u7684\u9A57\u8B49\u8F14\u5C0E\u8207\u5C08\u696D\u8AB2\u7A0B\u670D\u52D9\uFF0C\u966A\u4F34\u4F01\u696D\u5F9E\u7533\u8ACB\u5230\u53D6\u8B49\u7684\u6BCF\u4E00\u500B\u95DC\u9375\u6B65\u9A5F\u3002" }), _jsx("p", { className: "text-slate-500 leading-relaxed", children: "\u79C9\u6301\u516C\u6B63\u3001\u5C08\u696D\u3001\u8AA0\u4FE1\u7684\u6838\u5FC3\u50F9\u503C\uFF0C\u6211\u5011\u6301\u7E8C\u7CBE\u9032\u670D\u52D9\u54C1\u8CEA\uFF0C\u6210\u70BA\u4F01\u696D\u6700\u503C\u5F97\u4FE1\u8CF4\u7684\u9A57\u8B49\u5925\u4F34\u3002" })] }), _jsx("div", { className: "bg-slate-50 rounded-3xl h-72 flex items-center justify-center text-slate-400", children: "\u516C\u53F8\u5716\u7247\uFF08\u5F85\u66F4\u65B0\uFF09" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-navy-900 mb-8", children: "\u653F\u7B56\u8072\u660E" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: policies.map((p) => (_jsxs("div", { className: "card p-6 text-center", children: [_jsx("div", { className: "text-4xl mb-3", children: p.icon }), _jsx("h4", { className: "font-bold text-navy-900 text-sm", children: p.title })] }, p.title))) })] }), _jsxs("div", { className: "mt-20 bg-gradient-to-r from-navy-900 to-navy-700 rounded-3xl p-10 text-white text-center", children: [_jsx("h3", { className: "text-2xl font-bold mb-3", children: "\u83C1\u82F1\u62DB\u52DF" }), _jsx("p", { className: "text-slate-300 mb-6 max-w-lg mx-auto", children: "\u52A0\u5165\u85CD\u9D72\uFF0C\u8207\u696D\u754C\u9802\u5C16\u4EBA\u624D\u5171\u540C\u6210\u9577" }), _jsx(Link, { to: "/contact", className: "bg-white text-navy-800 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors inline-block", children: "Join Us" })] })] }) })] }));
}
// ─── Service ────────────────────────────────────
const allServices = {
    quality: {
        label: '品質管理',
        color: 'blue',
        items: [
            { name: 'ISO 9001 品質管理系統', desc: '建立系統化的品質管理框架，提升組織效能與客戶滿意度。' },
            { name: 'ISO 14001 環境管理系統', desc: '協助企業建立環境管理體系，降低環境衝擊並達成永續目標。' },
            { name: 'ISO 45001 職業安全衛生管理', desc: '保障員工職業健康與安全，建立安全的工作環境。' },
            { name: 'ISO 22000 食品安全管理標準', desc: '食品供應鏈的全面安全管理，確保食品品質與安全。' },
            { name: 'ISO 27001 國際資安認證', desc: '建立資訊安全管理系統，保護企業重要資訊資產。' },
        ]
    },
    agriculture: {
        label: '農產品驗證',
        color: 'green',
        items: [
            { name: '產銷履歷農糧作物', desc: '農產品生產過程追溯管理，確保產品來源透明可靠。' },
            { name: '產銷履歷農糧加工物', desc: '農糧加工品的完整生產履歷記錄與驗證服務。' },
            { name: '產銷履歷農產品分裝/流通', desc: '農產品分裝與流通過程的完整追溯管理。' },
            { name: '產銷履歷蜂產品', desc: '蜂產品生產履歷驗證，確保品質與來源真實性。' },
            { name: '產銷履歷養殖水產品', desc: '水產養殖過程履歷管理，保障消費者食品安全。' },
            { name: '有機驗證農糧作物', desc: '符合有機農業規範的農糧作物驗證服務。' },
            { name: '有機驗證加工/分裝/流通', desc: '有機農產品加工與流通環節的完整驗證服務。' },
        ]
    },
    esg: {
        label: 'ESG 查驗',
        color: 'teal',
        items: [
            { name: 'ISO 14064-1 溫室氣體查驗', desc: '組織溫室氣體盤查與查驗，協助企業掌握碳排放數據。' },
            { name: 'ISO 14067 國際碳足跡標準', desc: '產品碳足跡計算與查驗，支援企業低碳轉型目標。' },
        ]
    }
};
export function Service() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u670D\u52D9\u9805\u76EE", sub: "Certification Services" }), _jsx("section", { className: "section bg-white", children: _jsx("div", { className: "container mx-auto space-y-16", children: Object.entries(allServices).map(([key, s]) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-8", children: [_jsx("span", { className: `badge text-sm px-4 py-1.5 ${key === 'quality' ? 'badge-quality' : key === 'agriculture' ? 'badge-agri' : 'badge-esg'}`, children: s.label }), _jsx("div", { className: "flex-1 h-px bg-slate-100" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: s.items.map((item) => (_jsxs("div", { className: "card p-6", children: [_jsx("h3", { className: "font-bold text-navy-900 mb-2 text-sm", children: item.name }), _jsx("p", { className: "text-slate-500 text-sm leading-relaxed", children: item.desc }), _jsx(Link, { to: "/contact", className: "text-navy-700 text-xs font-medium mt-3 inline-block hover:underline", children: "\u7D22\u53D6\u5831\u50F9 \u2192" })] }, item.name))) })] }, key))) }) })] }));
}
// ─── Certificate ────────────────────────────────
export function Certificate() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u8B49\u66F8\u67E5\u8A62", sub: "Certificate Verification" }), _jsx("section", { className: "section bg-white", children: _jsxs("div", { className: "container mx-auto max-w-3xl", children: [_jsxs("div", { className: "bg-slate-50 rounded-3xl p-8 mb-10", children: [_jsx("h3", { className: "font-bold text-navy-900 mb-6 text-lg", children: "\u8F38\u5165\u67E5\u8A62\u689D\u4EF6" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("input", { className: "input flex-1", placeholder: "\u8ACB\u8F38\u5165\u5BA2\u6236\u540D\u7A31\u6216\u8B49\u66F8\u7DE8\u865F..." }), _jsx("button", { className: "btn-primary px-6", children: "\u67E5\u8A62" })] })] }), _jsxs("div", { className: "text-center text-slate-400 py-16", children: [_jsx("div", { className: "text-5xl mb-4", children: "\uD83D\uDD0D" }), _jsx("p", { children: "\u8ACB\u8F38\u5165\u67E5\u8A62\u689D\u4EF6\u4EE5\u641C\u5C0B\u8B49\u66F8\u8CC7\u6599" })] })] }) })] }));
}
// ─── Training ───────────────────────────────────
const sampleCourses = [
    { tag: 'quality', label: '品質管理', title: 'ISO 9001 品質管理系統內部稽核員', date: '2026-04-15', type: '實體課程', fee: 8000 },
    { tag: 'quality', label: '品質管理', title: 'ISO 14001 環境管理系統主導稽核員', date: '2026-04-28', type: '實體課程', fee: 9500 },
    { tag: 'agri', label: '農產品驗證', title: '產銷履歷驗證申請實務工作坊', date: '2026-04-22', type: '線上講座', fee: 3000 },
    { tag: 'esg', label: 'ESG 查驗', title: 'ISO 14064-1 溫室氣體盤查與查驗', date: '2026-05-06', type: '實體課程', fee: 12000 },
    { tag: 'quality', label: '品質管理', title: 'ISO 27001 資安管理系統導入實務', date: '2026-05-13', type: '實體課程', fee: 8500 },
    { tag: 'agri', label: '農產品驗證', title: '有機驗證申請與輔導說明', date: '2026-05-20', type: '線上講座', fee: 2500 },
];
export function Training() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u6559\u80B2\u8A13\u7DF4", sub: "Training & Education" }), _jsx("section", { className: "section bg-white", children: _jsxs("div", { className: "container mx-auto", children: [_jsx("div", { className: "flex flex-wrap gap-3 mb-10", children: ['全部', '品質管理', '農產品驗證', 'ESG查驗'].map((t) => (_jsx("button", { className: `px-5 py-2 rounded-full text-sm font-medium border transition-colors
                ${t === '全部' ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400'}`, children: t }, t))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: sampleCourses.map((c, i) => (_jsxs("div", { className: "card overflow-hidden", children: [_jsx("div", { className: `h-1.5 ${c.tag === 'quality' ? 'bg-blue-500' : c.tag === 'agri' ? 'bg-green-500' : 'bg-teal-500'}` }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: `badge text-xs ${c.tag === 'quality' ? 'badge-quality' : c.tag === 'agri' ? 'badge-agri' : 'badge-esg'}`, children: c.label }), _jsx("span", { className: "text-xs text-slate-400", children: c.type })] }), _jsx("h3", { className: "font-bold text-navy-900 text-sm leading-snug mb-4", children: c.title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500 mb-4", children: [_jsxs("span", { children: ["\uD83D\uDCC5 ", c.date] }), _jsxs("span", { className: "font-semibold text-navy-800", children: ["NT$ ", c.fee.toLocaleString()] })] }), _jsx(Link, { to: "/contact", className: "btn-primary w-full justify-center py-2 text-xs", children: "\u7ACB\u5373\u5831\u540D" })] })] }, i))) }), _jsx("div", { className: "mt-16 bg-gradient-to-r from-navy-900 to-navy-700 rounded-3xl p-10 text-white", children: _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold mb-2", children: "\u4F01\u696D\u5305\u73ED" }), _jsx("p", { className: "text-slate-300", children: "\u5BA2\u88FD\u5316\u8AB2\u7A0B\u65B9\u6848\uFF0C\u4F9D\u4F01\u696D\u9700\u6C42\u8ABF\u6574\u5167\u5BB9\u8207\u6642\u7A0B" })] }), _jsx(Link, { to: "/contact", className: "bg-white text-navy-800 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap", children: "\u6D3D\u8A62\u5305\u73ED" })] }) })] }) })] }));
}
// ─── Documents ──────────────────────────────────
const docCategories = ['品質管理', '農產品驗證', 'ESG查驗'];
const sampleDocs = [
    { cat: '品質管理', name: 'ISO 9001:2015 申請說明文件', size: '2.3 MB' },
    { cat: '品質管理', name: 'ISO 14001 環境管理手冊範本', size: '1.8 MB' },
    { cat: '農產品驗證', name: '產銷履歷申請表格（農糧作物）', size: '890 KB' },
    { cat: '農產品驗證', name: '有機驗證申請流程說明', size: '1.2 MB' },
    { cat: 'ESG查驗', name: 'ISO 14064-1 溫室氣體盤查指引', size: '3.1 MB' },
    { cat: 'ESG查驗', name: '碳足跡計算工具使用手冊', size: '2.7 MB' },
];
export function Documents() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u6587\u4EF6\u4E0B\u8F09", sub: "Document Downloads" }), _jsx("section", { className: "section bg-white", children: _jsx("div", { className: "container mx-auto", children: docCategories.map((cat) => (_jsxs("div", { className: "mb-12", children: [_jsx("h3", { className: "text-xl font-bold text-navy-900 mb-5 pb-3 border-b border-slate-100", children: cat }), _jsx("div", { className: "space-y-3", children: sampleDocs.filter(d => d.cat === cat).map((doc, i) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center text-sm font-bold", children: "PDF" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-slate-800 text-sm", children: doc.name }), _jsx("div", { className: "text-xs text-slate-400", children: doc.size })] })] }), _jsxs("button", { className: "text-navy-700 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: ["\u4E0B\u8F09", _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) })] })] }, i))) })] }, cat))) }) })] }));
}
// ─── News ───────────────────────────────────────
const sampleNews = [
    { cat: '農產新知', title: '2026 年有機農業推廣補助計畫說明', date: '2026-03-01', summary: '農業部宣布新一輪有機農業補助計畫，鼓勵農民申請有機驗證...' },
    { cat: '新聞媒體', title: '藍鵲 MBC 榮獲年度最佳驗證機構獎', date: '2026-02-20', summary: '在業界評選中，藍鵲 MBC 以卓越的服務品質榮獲年度最佳驗證機構...' },
    { cat: '常見問題', title: 'ISO 27001 驗證申請流程常見 Q&A', date: '2026-02-10', summary: '整理客戶最常詢問的 ISO 27001 申請相關問題與解答...' },
    { cat: '農產新知', title: '碳足跡標示新規定：企業必知的 ESG 合規要點', date: '2026-01-28', summary: '政府最新碳足跡標示規定將於年底上路，提前了解合規重點...' },
];
export function News() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u6700\u65B0\u6D88\u606F", sub: "News & Updates" }), _jsx("section", { className: "section bg-white", children: _jsxs("div", { className: "container mx-auto", children: [_jsx("div", { className: "flex flex-wrap gap-3 mb-10", children: ['全部', '農產新知', '新聞媒體', '常見問題'].map((t) => (_jsx("button", { className: `px-5 py-2 rounded-full text-sm font-medium border transition-colors
                ${t === '全部' ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400'}`, children: t }, t))) }), _jsx("div", { className: "space-y-5", children: sampleNews.map((n, i) => (_jsxs("div", { className: "card p-6 flex gap-5 group cursor-pointer", children: [_jsx("div", { className: "w-24 h-24 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center text-slate-400 text-xs", children: "\u5716\u7247" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("span", { className: "badge badge-agri text-xs", children: n.cat }), _jsx("span", { className: "text-xs text-slate-400", children: n.date })] }), _jsx("h3", { className: "font-bold text-navy-900 mb-1 group-hover:text-navy-700 transition-colors", children: n.title }), _jsx("p", { className: "text-slate-500 text-sm leading-relaxed", children: n.summary })] })] }, i))) })] }) })] }));
}
// ─── Contact ────────────────────────────────────
export function Contact() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { title: "\u806F\u7D61\u6211\u5011", sub: "Contact Us" }), _jsx("section", { className: "section bg-white", children: _jsx("div", { className: "container mx-auto", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("div", { className: "flex border-b border-slate-200 mb-8 gap-1", children: ['獲得報價', '意見反饋'].map((tab, i) => (_jsx("button", { className: `px-6 py-3 text-sm font-medium transition-colors
                    ${i === 0 ? 'border-b-2 border-navy-800 text-navy-800' : 'text-slate-500 hover:text-slate-700'}`, children: tab }, tab))) }), _jsxs("form", { className: "space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "\u59D3\u540D *" }), _jsx("input", { className: "input", placeholder: "\u60A8\u7684\u59D3\u540D" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "\u516C\u53F8\u540D\u7A31" }), _jsx("input", { className: "input", placeholder: "\u60A8\u7684\u516C\u53F8" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Email *" }), _jsx("input", { className: "input", type: "email", placeholder: "your@email.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "\u96FB\u8A71" }), _jsx("input", { className: "input", placeholder: "02-XXXX-XXXX" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "\u8A0A\u606F\u5167\u5BB9 *" }), _jsx("textarea", { className: "input resize-none", rows: 5, placeholder: "\u8ACB\u63CF\u8FF0\u60A8\u7684\u9700\u6C42..." })] }), _jsx("button", { type: "submit", className: "btn-primary w-full py-3 text-base", children: "\u9001\u51FA" })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-slate-50 rounded-2xl p-6", children: [_jsx("h4", { className: "font-bold text-navy-900 mb-4", children: "\u806F\u7D61\u8CC7\u8A0A" }), _jsxs("ul", { className: "space-y-3 text-sm text-slate-600", children: [_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { children: "\uD83D\uDCCD" }), _jsx("span", { children: "\u5730\u5740\uFF1A\uFF08\u5F85\u586B\uFF09" })] }), _jsxs("li", { className: "flex gap-2", children: [_jsx("span", { children: "\uD83D\uDCDE" }), _jsx("span", { children: "\u96FB\u8A71\uFF1A\uFF08\u5F85\u586B\uFF09" })] }), _jsxs("li", { className: "flex gap-2", children: [_jsx("span", { children: "\u2709\uFE0F" }), _jsx("span", { children: "Email\uFF1A\uFF08\u5F85\u586B\uFF09" })] }), _jsxs("li", { className: "flex gap-2", children: [_jsx("span", { children: "\uD83D\uDD50" }), _jsx("span", { children: "\u9031\u4E00\u81F3\u9031\u4E94 09:00\u201318:00" })] })] })] }), _jsxs("div", { className: "bg-navy-50 rounded-2xl p-6", children: [_jsx("h4", { className: "font-bold text-navy-900 mb-2", children: "\u5FEB\u901F\u56DE\u61C9\u627F\u8AFE" }), _jsx("p", { className: "text-slate-500 text-sm", children: "\u6211\u5011\u5C07\u5728 1\u20132 \u500B\u5DE5\u4F5C\u5929\u5167\u8207\u60A8\u806F\u7E6B\uFF0C\u78BA\u4FDD\u60A8\u7684\u9700\u6C42\u7372\u5F97\u59A5\u5584\u8655\u7406\u3002" })] })] })] }) }) })] }));
}
