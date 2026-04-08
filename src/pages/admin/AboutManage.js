import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Image, X } from 'lucide-react';
import { contentApi, recruitmentApi } from '../../services/api';
const tabs = ['公司簡介', '政策聲明', '菁英招募'];
const AboutManage = () => {
    const [activeTab, setActiveTab] = useState('公司簡介');
    const [saving, setSaving] = useState(false);
    const [aboutContent, setAboutContent] = useState({
        id: 'about-intro',
        title: '關於藍鵲',
        subtitle: '國際標準驗證的領航者',
        body: '以「藍鵲」為名，象徵我們對臺灣生態的承諾與驕傲。我們致力於推動生態農法與環境永續，打造具國際信賴度的驗證品牌，期許成為臺灣永續發展的象徵與代表。',
    });
    const [policyItems, setPolicyItems] = useState([]);
    const [recruitmentItems, setRecruitmentItems] = useState([]);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [isNewPolicy, setIsNewPolicy] = useState(false);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [aboutData, recruitData] = await Promise.all([
                    contentApi.getBySection('about'),
                    recruitmentApi.getAll(),
                ]);
                if (aboutData && aboutData.length > 0) {
                    const intro = aboutData.find((d) => d.type === 'intro');
                    if (intro) {
                        setAboutContent({
                            id: intro.id,
                            title: intro.title || '關於藍鵲',
                            subtitle: intro.subtitle || '',
                            body: intro.body || '',
                        });
                    }
                    const policies = aboutData.filter((d) => d.type === 'policy');
                    if (policies.length > 0) {
                        setPolicyItems(policies.map((p) => ({
                            id: p.id,
                            title: p.title,
                            type: p.policyType || '圖配文',
                            updatedAt: p.updatedAt?.slice(0, 10) || '',
                        })));
                    }
                }
                if (recruitData) {
                    setRecruitmentItems(recruitData.map((r) => ({
                        id: r.id,
                        title: r.title,
                        status: r.status,
                        updatedAt: r.updatedAt?.slice(0, 10) || '',
                    })));
                }
            }
            catch (err) {
                console.error('Failed to load about data:', err);
            }
        };
        loadData();
    }, []);
    const handleSaveAbout = async () => {
        setSaving(true);
        try {
            await contentApi.update('about', aboutContent.id, {
                title: aboutContent.title,
                subtitle: aboutContent.subtitle,
                body: aboutContent.body,
                type: 'intro',
            });
            alert('儲存成功！');
        }
        catch (err) {
            console.error('Failed to save about:', err);
            alert('儲存失敗，請稍後再試');
        }
        finally {
            setSaving(false);
        }
    };
    const handleSavePolicy = async () => {
        if (!editingPolicy || !editingPolicy.title)
            return;
        try {
            await contentApi.update('about', editingPolicy.id || `policy-${Date.now()}`, {
                title: editingPolicy.title,
                policyType: editingPolicy.type || '圖配文',
                type: 'policy',
            });
            setEditingPolicy(null);
            setIsNewPolicy(false);
            // Reload
            const aboutData = await contentApi.getBySection('about');
            const policies = aboutData.filter((d) => d.type === 'policy');
            setPolicyItems(policies.map((p) => ({
                id: p.id,
                title: p.title,
                type: p.policyType || '圖配文',
                updatedAt: p.updatedAt?.slice(0, 10) || '',
            })));
        }
        catch (err) {
            console.error('Failed to save policy:', err);
            alert('儲存失敗');
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-magpie-dark", children: "\u95DC\u65BC\u6211\u5011\u7BA1\u7406" }), activeTab === '公司簡介' && (_jsxs("button", { onClick: handleSaveAbout, disabled: saving, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm disabled:opacity-50", children: [_jsx(Save, { size: 16 }), " ", saving ? '儲存中...' : '儲存變更'] }))] }), _jsx("div", { className: "flex gap-1 mb-6 border-b border-gray-200", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-6 py-3 font-bold text-sm transition-colors border-b-2 -mb-px ${activeTab === tab ? 'text-magpie-primary border-magpie-primary' : 'text-gray-500 border-transparent hover:text-magpie-dark'}`, children: tab }, tab))) }), activeTab === '公司簡介' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "font-bold text-magpie-dark mb-4", children: "About MBC" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u5927\u6A19\u984C" }), _jsx("input", { type: "text", value: aboutContent.title, onChange: (e) => setAboutContent({ ...aboutContent, title: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u526F\u6A19\u984C" }), _jsx("input", { type: "text", value: aboutContent.subtitle, onChange: (e) => setAboutContent({ ...aboutContent, subtitle: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u5167\u6587" }), _jsx("textarea", { rows: 4, value: aboutContent.body, onChange: (e) => setAboutContent({ ...aboutContent, body: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u914D\u5716" }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-magpie-primary transition-colors", children: [_jsx(Image, { size: 24, className: "mx-auto text-gray-400 mb-1" }), _jsx("p", { className: "text-sm text-gray-500", children: "\u9EDE\u64CA\u4E0A\u50B3\u5716\u7247" })] })] })] })] }) })), activeTab === '政策聲明' && (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "font-bold text-magpie-dark", children: "\u653F\u7B56\u8072\u660E\u5167\u5BB9" }), _jsxs("button", { onClick: () => { setEditingPolicy({ title: '', type: '圖配文' }); setIsNewPolicy(true); }, className: "flex items-center gap-2 px-3 py-2 bg-magpie-primary text-white rounded text-sm hover:bg-magpie-hover", children: [_jsx(Plus, { size: 14 }), " \u65B0\u589E\u653F\u7B56"] })] }), editingPolicy && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-lg font-bold", children: [isNewPolicy ? '新增' : '編輯', "\u653F\u7B56"] }), _jsx("button", { onClick: () => { setEditingPolicy(null); setIsNewPolicy(false); }, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u6A19\u984C" }), _jsx("input", { type: "text", value: editingPolicy.title || '', onChange: (e) => setEditingPolicy({ ...editingPolicy, title: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "\u683C\u5F0F" }), _jsxs("select", { value: editingPolicy.type || '圖配文', onChange: (e) => setEditingPolicy({ ...editingPolicy, type: e.target.value }), className: "w-full border border-gray-300 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: "\u5716\u914D\u6587", children: "\u5716\u914D\u6587" }), _jsx("option", { value: "\u7D14\u6587\u5B57", children: "\u7D14\u6587\u5B57" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: () => { setEditingPolicy(null); setIsNewPolicy(false); }, className: "px-4 py-2 text-sm text-gray-600 border rounded", children: "\u53D6\u6D88" }), _jsxs("button", { onClick: handleSavePolicy, className: "px-4 py-2 bg-magpie-primary text-white rounded text-sm font-bold", children: [_jsx(Save, { size: 16, className: "inline mr-1" }), "\u5132\u5B58"] })] })] }) })), _jsx("div", { className: "space-y-3", children: policyItems.length === 0 ? (_jsx("p", { className: "text-center text-gray-400 py-8", children: "\u5C1A\u7121\u653F\u7B56\u8072\u660E\u8CC7\u6599" })) : policyItems.map((item) => (_jsxs("div", { className: "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-magpie-dark", children: item.title }), _jsxs("p", { className: "text-xs text-gray-400 mt-1", children: ["\u683C\u5F0F\uFF1A", item.type, " | \u66F4\u65B0\uFF1A", item.updatedAt] })] }), _jsx("div", { className: "flex gap-2", children: _jsx("button", { onClick: () => { setEditingPolicy(item); setIsNewPolicy(false); }, className: "p-2 text-magpie-primary hover:bg-magpie-lighter rounded transition-colors", children: _jsx(Edit2, { size: 16 }) }) })] }, item.id))) })] })), activeTab === '菁英招募' && (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "font-bold text-magpie-dark", children: "\u62DB\u52DF\u8077\u7F3A" }), _jsx("p", { className: "text-sm text-gray-500", children: "\uFF08\u8ACB\u81F3\u83C1\u82F1\u62DB\u52DF\u7BA1\u7406\u9801\u9762\u65B0\u589E/\u7DE8\u8F2F\u8077\u7F3A\uFF09" })] }), _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-left border-b border-gray-200", children: [_jsx("th", { className: "py-3 px-2 font-bold text-gray-600", children: "\u8077\u7F3A\u540D\u7A31" }), _jsx("th", { className: "py-3 px-2 font-bold text-gray-600", children: "\u72C0\u614B" }), _jsx("th", { className: "py-3 px-2 font-bold text-gray-600", children: "\u66F4\u65B0\u65E5\u671F" })] }) }), _jsx("tbody", { children: recruitmentItems.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 3, className: "py-8 text-center text-gray-400", children: "\u5C1A\u7121\u8077\u7F3A\u8CC7\u6599" }) })) : recruitmentItems.map((item) => (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-2 font-medium", children: item.title }), _jsx("td", { className: "py-3 px-2", children: _jsx("span", { className: `px-2 py-1 rounded text-xs font-bold ${item.status === '招募中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`, children: item.status }) }), _jsx("td", { className: "py-3 px-2 text-gray-500", children: item.updatedAt })] }, item.id))) })] })] }))] }));
};
export default AboutManage;
