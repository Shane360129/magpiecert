import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, FileText, X, Save } from 'lucide-react';
import { downloadsApi } from '../../services/api';

const categories = ['全部', '品質管理', '農產品驗證', 'ESG查驗'];

interface DownloadFile {
  id: string;
  name: string;
  category: string;
  format: string;
  size: string;
  downloads: number;
  updatedAt: string;
}

const emptyFile = (): Omit<DownloadFile, 'id'> => ({
  name: '',
  category: '品質管理',
  format: 'PDF',
  size: '0 MB',
  downloads: 0,
  updatedAt: new Date().toISOString().slice(0, 10),
});

const DownloadManage: React.FC = () => {
  const [files, setFiles] = useState<DownloadFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFile, setEditingFile] = useState<Partial<DownloadFile> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await downloadsApi.getAll();
      setFiles(data);
    } catch (err) {
      console.error('Failed to fetch downloads:', err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleSave = async () => {
    if (!editingFile || !editingFile.name) return;
    try {
      if (isNew) {
        await downloadsApi.create(editingFile);
      } else {
        await downloadsApi.update(editingFile.id!, editingFile);
      }
      setEditingFile(null);
      setIsNew(false);
      fetchFiles();
    } catch (err) {
      console.error('Failed to save file:', err);
      alert('儲存失敗，請稍後再試');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除此文件嗎？')) return;
    try {
      await downloadsApi.delete(id);
      fetchFiles();
    } catch (err) {
      console.error('Failed to delete file:', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  const filtered = files.filter(f =>
    (selectedCategory === '全部' || f.category === selectedCategory) &&
    f.name.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magpie-dark">文件下載管理</h2>
        <button
          onClick={() => { setEditingFile(emptyFile()); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm"
        >
          <Plus size={16} /> 新增文件
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜尋文件名稱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-magpie-dark">{isNew ? '新增' : '編輯'}文件</h3>
              <button onClick={() => { setEditingFile(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">文件名稱</label>
                <input type="text" value={editingFile.name || ''} onChange={(e) => setEditingFile({ ...editingFile, name: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">分類</label>
                  <select value={editingFile.category || '品質管理'} onChange={(e) => setEditingFile({ ...editingFile, category: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="品質管理">品質管理</option>
                    <option value="農產品驗證">農產品驗證</option>
                    <option value="ESG查驗">ESG查驗</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">格式</label>
                  <select value={editingFile.format || 'PDF'} onChange={(e) => setEditingFile({ ...editingFile, format: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="PDF">PDF</option>
                    <option value="DOC">DOC</option>
                    <option value="XLS">XLS</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditingFile(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">取消</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold"><Save size={16} /> 儲存</button>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">載入中...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="py-3 px-4 font-bold text-gray-600">文件名稱</th>
                  <th className="py-3 px-4 font-bold text-gray-600">分類</th>
                  <th className="py-3 px-4 font-bold text-gray-600">格式</th>
                  <th className="py-3 px-4 font-bold text-gray-600">大小</th>
                  <th className="py-3 px-4 font-bold text-gray-600">下載次數</th>
                  <th className="py-3 px-4 font-bold text-gray-600">更新日期</th>
                  <th className="py-3 px-4 font-bold text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-8 text-center text-gray-400">尚無資料</td></tr>
                ) : filtered.map((file) => (
                  <tr key={file.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-red-500 shrink-0" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-magpie-lighter text-magpie-primary text-xs font-bold rounded">{file.category}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{file.format}</td>
                    <td className="py-3 px-4 text-gray-500">{file.size}</td>
                    <td className="py-3 px-4 font-bold text-gray-700">{file.downloads || 0}</td>
                    <td className="py-3 px-4 text-gray-500">{file.updatedAt}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingFile(file); setIsNew(false); }} className="p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded" title="編輯"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(file.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded" title="刪除"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
              共 {filtered.length} 筆文件
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadManage;
