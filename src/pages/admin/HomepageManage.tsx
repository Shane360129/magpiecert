import React, { useState, useEffect } from 'react';
import { Save, Upload, Eye } from 'lucide-react';
import { contentApi } from '../../services/api';

interface HomepageSection {
  id: string;
  section: string;
  name: string;
  desc: string;
  active: boolean;
  bannerType?: string;
}

const defaultSections = [
  { name: '關於藍鵲', desc: '圖配文+引導式按鈕 (連結至關於我們)', active: true },
  { name: '我們的優勢', desc: '四個圓形圖卡展示區塊', active: true },
  { name: '服務項目', desc: '三區塊圖配文 (連結至服務項目)', active: true },
  { name: '課程講座', desc: '圖配文+最新活動列表 (連結至教育訓練)', active: true },
  { name: '聯絡我們', desc: '圖配文+引導式按鈕 (連結至聯絡我們)', active: true },
];

const HomepageManage: React.FC = () => {
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
          if (config.bannerType) setBannerType(config.bannerType);
          if (config.sections) setSections(config.sections);
        }
      } catch (err) {
        console.error('Failed to load homepage config:', err);
      } finally {
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
    } catch (err) {
      console.error('Failed to save:', err);
      alert('儲存失敗，請稍後再試');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (index: number) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], active: !updated[index].active };
    setSections(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magpie-dark">首頁管理</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm disabled:opacity-50"
        >
          <Save size={16} /> {saving ? '儲存中...' : '儲存變更'}
        </button>
      </div>

      {/* Banner Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-magpie-dark mb-4">Banner 設定</h3>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="bannerType" value="video" checked={bannerType === 'video'} onChange={(e) => setBannerType(e.target.value)} className="text-magpie-primary" />
            <span className="text-sm font-medium">影片模式</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="bannerType" value="image" checked={bannerType === 'image'} onChange={(e) => setBannerType(e.target.value)} className="text-magpie-primary" />
            <span className="text-sm font-medium">圖片模式</span>
          </label>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-magpie-primary transition-colors cursor-pointer">
          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">點擊或拖放上傳 {bannerType === 'video' ? '影片檔案' : '圖片檔案'}</p>
          <p className="text-gray-400 text-xs mt-1">{bannerType === 'video' ? '支援 MP4, WebM (最大 50MB)' : '支援 JPG, PNG, WebP (建議 1920x800)'}</p>
        </div>
      </div>

      {/* Homepage Sections */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-magpie-dark mb-4">首頁區塊管理</h3>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={section.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-bold text-magpie-dark">{section.name}</p>
                <p className="text-sm text-gray-500">{section.desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section.active}
                    onChange={() => toggleSection(index)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-magpie-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageManage;
