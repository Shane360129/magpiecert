import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Eye, X, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { newsApi } from '../../services/api';

const newsTypeMap: Record<string, string> = {
  agriculture: '農產新知',
  media: '新聞媒體',
  faq: '常見問題',
};

interface NewsItem {
  id: string;
  title: string;
  category: string;
  status: string;
  author: string;
  date: string;
  views: number;
  body: string;
}

const emptyNews = (category: string): Omit<NewsItem, 'id'> => ({
  title: '',
  category,
  status: '草稿',
  author: 'Admin',
  date: new Date().toISOString().slice(0, 10),
  views: 0,
  body: '',
});

const NewsManage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const newsType = newsTypeMap[type || 'agriculture'] || '農產新知';

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsApi.getAll();
      const filtered = data.filter((n: NewsItem) => n.category === newsType);
      setNewsList(filtered);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [type]);

  const handleSave = async () => {
    if (!editingNews || !editingNews.title) return;
    try {
      if (isNew) {
        await newsApi.create({ ...editingNews, category: newsType });
      } else {
        await newsApi.update(editingNews.id!, editingNews);
      }
      setEditingNews(null);
      setIsNew(false);
      fetchNews();
    } catch (err) {
      console.error('Failed to save news:', err);
      alert('儲存失敗，請稍後再試');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除此文章嗎？')) return;
    try {
      await newsApi.delete(id);
      fetchNews();
    } catch (err) {
      console.error('Failed to delete news:', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  const filtered = newsList.filter(n => n.title.includes(searchTerm));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magpie-dark">{newsType}管理</h2>
        <button
          onClick={() => { setEditingNews(emptyNews(newsType)); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm"
        >
          <Plus size={16} /> 新增{newsType}
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`搜尋${newsType}標題...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Edit Modal */}
      {editingNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-magpie-dark">{isNew ? '新增' : '編輯'}{newsType}</h3>
              <button onClick={() => { setEditingNews(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">標題</label>
                <input type="text" value={editingNews.title || ''} onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">狀態</label>
                  <select value={editingNews.status || '草稿'} onChange={(e) => setEditingNews({ ...editingNews, status: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="草稿">草稿</option>
                    <option value="已發布">已發布</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">日期</label>
                  <input type="date" value={editingNews.date || ''} onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">內文</label>
                <textarea rows={6} value={editingNews.body || ''} onChange={(e) => setEditingNews({ ...editingNews, body: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditingNews(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">取消</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold"><Save size={16} /> 儲存</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">載入中...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="py-3 px-4 font-bold text-gray-600">標題</th>
                  <th className="py-3 px-4 font-bold text-gray-600">作者</th>
                  <th className="py-3 px-4 font-bold text-gray-600">發布日期</th>
                  <th className="py-3 px-4 font-bold text-gray-600">瀏覽數</th>
                  <th className="py-3 px-4 font-bold text-gray-600">狀態</th>
                  <th className="py-3 px-4 font-bold text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-400">尚無資料</td></tr>
                ) : filtered.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium max-w-sm">
                      <p className="truncate">{item.title}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{item.author}</td>
                    <td className="py-3 px-4 text-gray-500">{item.date}</td>
                    <td className="py-3 px-4 font-bold text-gray-700">{(item.views || 0).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === '已發布' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingNews(item); setIsNew(false); }} className="p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded" title="編輯"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded" title="刪除"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
              共 {filtered.length} 筆資料
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsManage;
