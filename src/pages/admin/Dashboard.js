import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ShieldCheck, GraduationCap, Newspaper, Download, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { statsApi } from '../../services/api';
const recentActivities = [
    { time: '2025-03-28 14:30', action: '新增證書', detail: 'T-2025-088 有機農糧作物驗證 - 綠田農場' },
    { time: '2025-03-28 11:15', action: '更新課程', detail: 'ISO 14064-1 溫室氣體查驗實務班 - 更新講師資訊' },
    { time: '2025-03-27 16:45', action: '發布消息', detail: '農產新知 - 2025年有機驗證新規範說明' },
    { time: '2025-03-27 10:00', action: '上傳文件', detail: 'ESG查驗申請表 v3.1' },
    { time: '2025-03-26 09:30', action: '證書到期', detail: 'T-2024-012 品質管理系統 - 佳美食品 (30天內到期)' },
];
const Dashboard = () => {
    const [stats, setStats] = useState(null);
    useEffect(() => {
        statsApi.get().then(setStats).catch(() => { });
    }, []);
    const statItems = [
        { label: '有效證書', value: stats?.certificates ?? '-', icon: _jsx(ShieldCheck, { size: 28 }), color: 'bg-blue-500', link: '/admin/certificates' },
        { label: '課程總數', value: stats?.courses ?? '-', icon: _jsx(GraduationCap, { size: 28 }), color: 'bg-green-500', link: '/admin/courses/physical' },
        { label: '最新消息', value: stats?.news ?? '-', icon: _jsx(Newspaper, { size: 28 }), color: 'bg-orange-500', link: '/admin/news/agriculture' },
        { label: '下載文件', value: stats?.downloads ?? '-', icon: _jsx(Download, { size: 28 }), color: 'bg-purple-500', link: '/admin/downloads' },
        { label: '招募職缺', value: stats?.recruitment ?? '-', icon: _jsx(Users, { size: 28 }), color: 'bg-pink-500', link: '/admin/recruitment' },
    ];
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-magpie-dark mb-6", children: "\u63A7\u5236\u53F0\u7E3D\u89BD" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8", children: statItems.map((stat) => (_jsxs(Link, { to: stat.link, className: "bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow group", children: [_jsx("div", { className: `${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`, children: stat.icon }), _jsx("p", { className: "text-3xl font-bold text-magpie-dark group-hover:text-magpie-primary transition-colors", children: stat.value }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: stat.label })] }, stat.label))) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-bold text-magpie-dark mb-4", children: "\u6700\u8FD1\u6D3B\u52D5" }), _jsx("div", { className: "divide-y divide-gray-100", children: recentActivities.map((activity, idx) => (_jsxs("div", { className: "py-4 flex items-start gap-4", children: [_jsx("span", { className: "text-xs text-gray-400 whitespace-nowrap mt-1 w-36 shrink-0", children: activity.time }), _jsx("span", { className: "inline-block px-2 py-1 bg-magpie-lighter text-magpie-primary text-xs font-bold rounded whitespace-nowrap", children: activity.action }), _jsx("span", { className: "text-sm text-gray-700", children: activity.detail })] }, idx))) })] })] }));
};
export default Dashboard;
