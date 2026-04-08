import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { contentApi } from '../../services/api';
const defaultSections = [
    { name: '關於藍鵲', desc: '圖配文+引導式按鈕 (連結至關於我們)', active: true },
    { name: '我們的優勢', desc: '四個圓形圖卡展示區塊', active: true },
    { name: '服務項目', desc: '三區塊圖配文 (連結至服務項目)', active: true },
    { name: '課程講座', desc: '圖配文+最新活動列表 (連結至教育訓練)', active: true },
    { name: '聯絡我們', desc: '圖配文+引導式按鈕 (連結至聯絡我們)', active: true },
];
const HomepageManage = () => {
    const [bannerType, setBannerType] = useState('video');
    const [sections, setSections] = useState(defaultSections);
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await contentApi.getBySection('homepage');
                if (data && data.length > 0) {
                    const config = data[0];
                    if (config.bannerType)
                        setBannerType(config.bannerType);
                    if (config.sections)
                        setSections(config.sections);
                }
            }
            catch (err) {
                console.error('Failed to load homepage config:', err);
            }
            finally {
                setLoaded(true);
            }
        };
        loadContent();
    }, []);
    const handleSave = async () => {
        setSaving(true);
        try {
            await contentApi.update('homepage', 'homepage-config', {
                bannerType,
                sections,
                type: 'config',
            });
            alert('儲存成功！');
        }
        catch (err) {
            console.error('Failed to save:', err);
            alert('儲存失敗，請稍後再試');
        }
        finally {
            setSaving(false);
        }
    };
    const toggleSection = (index) => {
        const updated = [...sections];
        updated[index] = { ...updated[index], active: !updated[index].active };
        setSections(updated);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-magpie-dark", children: "\u9996\u9801\u7BA1\u7406" }), _jsxs("button", { onClick: handleSave, disabled: saving, className: "flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm disabled:opacity-50", children: [_jsx(Save, { size: 16 }), " ", saving ? '儲存中...' : '儲存變更'] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-bold text-magpie-dark mb-4", children: "Banner \u8A2D\u5B9A" }), _jsxs("div", { className: "flex gap-4 mb-4", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", name: "bannerType", value: "video", checked: bannerType === 'video', onChange: (e) => setBannerType(e.target.value), className: "text-magpie-primary" }), _jsx("span", { className: "text-sm font-medium", children: "\u5F71\u7247\u6A21\u5F0F" })] }), _jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", name: "bannerType", value: "image", checked: bannerType === 'image', onChange: (e) => setBannerType(e.target.value), className: "text-magpie-primary" }), _jsx("span", { className: "text-sm font-medium", children: "\u5716\u7247\u6A21\u5F0F" })] })] }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-magpie-primary transition-colors cursor-pointer", children: [_jsx(Upload, { size: 32, className: "mx-auto text-gray-400 mb-2" }), _jsxs("p", { className: "text-gray-500 text-sm", children: ["\u9EDE\u64CA\u6216\u62D6\u653E\u4E0A\u50B3 ", bannerType === 'video' ? '影片檔案' : '圖片檔案'] }), _jsx("p", { className: "text-gray-400 text-xs mt-1", children: bannerType === 'video' ? '支援 MP4, WebM (最大 50MB)' : '支援 JPG, PNG, WebP (建議 1920x800)' })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-bold text-magpie-dark mb-4", children: "\u9996\u9801\u5340\u584A\u7BA1\u7406" }), _jsx("div", { className: "space-y-4", children: sections.map((section, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 border border-gray-200 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-magpie-dark", children: section.name }), _jsx("p", { className: "text-sm text-gray-500", children: section.desc })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: section.active, onChange: () => toggleSection(index), className: "sr-only peer" }), _jsx("div", { className: "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-magpie-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" })] }) })] }, section.name))) })] })] }));
};
export default HomepageManage;
