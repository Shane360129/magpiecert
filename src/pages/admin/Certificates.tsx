import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, X, Save } from 'lucide-react';
import { certificatesApi } from '../../services/api';

interface Certificate {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  status: string;
}

const emptyCert = (): Omit<Certificate, 'id'> => ({
  name: '',
  type: '有機驗證農糧',
  issueDate: new Date().toISOString().slice(0, 10),
  status: 'pending',
});

const Certificates: React.FC = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const data = await certificatesApi.getAll();
      setCerts(data);
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
      setCerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleSave = async () => {
    if (!editingCert || !editingCert.name) return;
    try {
      if (isNew) {
        await certificatesApi.create(editingCert);
      } else {
        await certificatesApi.update(editingCert.id!, editingCert);
      }
      setEditingCert(null);
      setIsNew(false);
      fetchCerts();
    } catch (err) {
      console.error('Failed to save certificate:', err);
      alert('儲存失敗，請稍後再試');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除此證書嗎？')) return;
    try {
      await certificatesApi.delete(id);
      fetchCerts();
    } catch (err) {
      console.error('Failed to delete certificate:', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">有效 Active</span>;
      case 'expired': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">終止 Expired</span>;
      case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">審核中 Pending</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  const filtered = certs.filter(c =>
    c.name.includes(searchTerm) || c.id.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <h2 className="text-2xl font-extrabold text-magpie-dark tracking-wide">證書狀態與資料查詢</h2>
           <p className="text-gray-500 mt-1">管理與維護系統內所有的生產者驗證狀態</p>
        </div>
        <button
          onClick={() => { setEditingCert(emptyCert()); setIsNew(true); }}
          className="flex items-center gap-2 bg-magpie-primary hover:bg-magpie-hover text-white px-4 py-2 rounded shadow transition font-medium"
        >
           <Plus size={18} /> 新增驗證紀錄
        </button>
      </div>

      {/* Edit Modal */}
      {editingCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-magpie-dark">{isNew ? '新增' : '編輯'}驗證紀錄</h3>
              <button onClick={() => { setEditingCert(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">客戶名稱</label>
                <input type="text" value={editingCert.name || ''} onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">驗證類別</label>
                  <select value={editingCert.type || ''} onChange={(e) => setEditingCert({ ...editingCert, type: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="有機驗證農糧">有機驗證農糧</option>
                    <option value="產銷履歷水產">產銷履歷水產</option>
                    <option value="產銷履歷農產">產銷履歷農產</option>
                    <option value="產銷履歷蜂產">產銷履歷蜂產</option>
                    <option value="產銷履歷畜產">產銷履歷畜產</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">核發日期</label>
                  <input type="date" value={editingCert.issueDate || ''} onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">狀態</label>
                <select value={editingCert.status || 'pending'} onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="active">有效</option>
                  <option value="pending">審核中</option>
                  <option value="expired">終止</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditingCert(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">取消</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover text-sm font-bold"><Save size={16} /> 儲存</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="搜尋客戶名稱或證書編碼..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-magpie-primary text-sm"
              />
           </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-8 text-center text-gray-500">載入中...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-gray-100">證書編碼</th>
                  <th className="p-4 font-bold border-b border-gray-100">客戶名稱</th>
                  <th className="p-4 font-bold border-b border-gray-100">類別</th>
                  <th className="p-4 font-bold border-b border-gray-100">核發日期</th>
                  <th className="p-4 font-bold border-b border-gray-100">狀態</th>
                  <th className="p-4 font-bold border-b border-gray-100 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-400">尚無資料</td></tr>
                ) : filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-magpie-lighter/40 transition-colors border-b border-gray-50 last:border-0">
                    <td className="p-4 font-mono font-bold text-magpie-primary">{cert.id.slice(0, 10)}</td>
                    <td className="p-4 font-bold text-gray-800">{cert.name}</td>
                    <td className="p-4 text-gray-600">{cert.type}</td>
                    <td className="p-4 text-gray-600">{cert.issueDate}</td>
                    <td className="p-4">{getStatusBadge(cert.status)}</td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => { setEditingCert(cert); setIsNew(false); }} className="p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded" title="編輯"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(cert.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded" title="刪除"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-gray-100 text-sm text-gray-500">
           共 {filtered.length} 筆資料
        </div>
      </div>
    </div>
  );
};

export default Certificates;
