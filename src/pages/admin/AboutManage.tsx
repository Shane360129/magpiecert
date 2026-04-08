import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, Image, X } from 'lucide-react';
import { contentApi, recruitmentApi } from '../../services/api';

const tabs = ['公司簡介', '政策聲明', '菁英招募'];

interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}

interface PolicyItem {
  id: string;
  title: string;
  type: string;
  updatedAt: string;
}

interface RecruitItem {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
}

const AboutManage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('公司簡介');
  const [saving, setSaving] = useState(false);
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    id: 'about-intro',
    title: '關於藍鵲',
    subtitle: '國際標準驗證的領航者',
    body: '以「藍鵲」為名，象徵我們對臺灣生態的承諾與驕傲。我們致力於推動生態農法與環境永續，打造具國際信賴度的驗證品牌，期許成為臺灣永續發展的象徵與代表。',
  });
  const [policyItems, setPolicyItems] = useState<PolicyItem[]>([]);
  const [recruitmentItems, setRecruitmentItems] = useState<RecruitItem[]>([]);
  const [editingPolicy, setEditingPolicy] = useState<Partial<PolicyItem> | null>(null);
  const [isNewPolicy, setIsNewPolicy] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [aboutData, recruitData] = await Promise.all([
          contentApi.getBySection('about'),
          recruitmentApi.getAll(),
        ]);

        if (aboutData && aboutData.length > 0) {
          const intro = aboutData.find((d: any) => d.type === 'intro');
          if (intro) {
            setAboutContent({
              id: intro.id,
              title: intro.title || '關於藍鵲',
              subtitle: intro.subtitle || '',
              body: intro.body || '',
            });
          }
          const policies = aboutData.filter((d: any) => d.type === 'policy');
          if (policies.length > 0) {
            setPolicyItems(policies.map((p: any) => ({
              id: p.id,
              title: p.title,
              type: p.policyType || '圖配文',
              updatedAt: p.updatedAt?.slice(0, 10) || '',
            })));
          }
        }

        if (recruitData) {
          setRecruitmentItems(recruitData.map((r: any) => ({
            id: r.id,
            title: r.title,
            status: r.status,
            updatedAt: r.updatedAt?.slice(0, 10) || '',
          })));
        }
      } catch (err) {
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
    } catch (err) {
      console.error('Failed to save about:', err);
      alert('儲存失敗，請稍後再試');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePolicy = async () => {
    if (!editingPolicy || !editingPolicy.title) return;
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
      const policies = aboutData.filter((d: any) => d.type === 'policy');
      setPolicyItems(policies.map((p: any) => ({
        id: p.id,
        title: p.title,
        type: p.policyType || '圖配文',
        updatedAt: p.updatedAt?.slice(0, 10) || '',
      })));
    } catch (err) {
      console.error('Failed to save policy:', err);
      alert('儲存失敗');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magpie-dark">關於我們管理</h2>
        {activeTab === '公司簡介' && (
          <button
            onClick={handleSaveAbout}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm disabled:opacity-50"
          >
            <Save size={16} /> {saving ? '儲存中...' : '儲存變更'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-bold text-sm transition-colors border-b-2 -mb-px ${activeTab === tab ? 'text-magpie-primary border-magpie-primary' : 'text-gray-500 border-transparent hover:text-magpie-dark'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === '公司簡介' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-magpie-dark mb-4">About MBC</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">大標題</label>
                <input
                  type="text"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">副標題</label>
                <input
                  type="text"
                  value={aboutContent.subtitle}
                  onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">內文</label>
                <textarea
                  rows={4}
                  value={aboutContent.body}
                  onChange={(e) => setAboutContent({ ...aboutContent, body: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">配圖</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-magpie-primary transition-colors">
                  <Image size={24} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">點擊上傳圖片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === '政策聲明' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-magpie-dark">政策聲明內容</h3>
            <button
              onClick={() => { setEditingPolicy({ title: '', type: '圖配文' }); setIsNewPolicy(true); }}
              className="flex items-center gap-2 px-3 py-2 bg-magpie-primary text-white rounded text-sm hover:bg-magpie-hover"
            >
              <Plus size={14} /> 新增政策
            </button>
          </div>

          {editingPolicy && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{isNewPolicy ? '新增' : '編輯'}政策</h3>
                  <button onClick={() => { setEditingPolicy(null); setIsNewPolicy(false); }}><X size={20} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">標題</label>
                    <input type="text" value={editingPolicy.title || ''} onChange={(e) => setEditingPolicy({ ...editingPolicy, title: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">格式</label>
                    <select value={editingPolicy.type || '圖配文'} onChange={(e) => setEditingPolicy({ ...editingPolicy, type: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option value="圖配文">圖配文</option>
                      <option value="純文字">純文字</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => { setEditingPolicy(null); setIsNewPolicy(false); }} className="px-4 py-2 text-sm text-gray-600 border rounded">取消</button>
                  <button onClick={handleSavePolicy} className="px-4 py-2 bg-magpie-primary text-white rounded text-sm font-bold"><Save size={16} className="inline mr-1" />儲存</button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {policyItems.length === 0 ? (
              <p className="text-center text-gray-400 py-8">尚無政策聲明資料</p>
            ) : policyItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-bold text-magpie-dark">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-1">格式：{item.type} | 更新：{item.updatedAt}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingPolicy(item); setIsNewPolicy(false); }} className="p-2 text-magpie-primary hover:bg-magpie-lighter rounded transition-colors"><Edit2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === '菁英招募' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-magpie-dark">招募職缺</h3>
            <p className="text-sm text-gray-500">（請至菁英招募管理頁面新增/編輯職缺）</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-3 px-2 font-bold text-gray-600">職缺名稱</th>
                <th className="py-3 px-2 font-bold text-gray-600">狀態</th>
                <th className="py-3 px-2 font-bold text-gray-600">更新日期</th>
              </tr>
            </thead>
            <tbody>
              {recruitmentItems.length === 0 ? (
                <tr><td colSpan={3} className="py-8 text-center text-gray-400">尚無職缺資料</td></tr>
              ) : recruitmentItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{item.title}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === '招募中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-500">{item.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AboutManage;
