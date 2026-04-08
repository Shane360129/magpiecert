import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, X, Save } from 'lucide-react';
import { recruitmentApi } from '../../services/api';

interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  status: string;
  applicants: number;
  updatedAt: string;
}

const emptyJob = (): Omit<Job, 'id'> => ({
  title: '',
  department: '驗證部',
  type: '全職',
  status: '招募中',
  applicants: 0,
  updatedAt: new Date().toISOString().slice(0, 10),
});

const RecruitmentManage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('全部');
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await recruitmentApi.getAll();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSave = async () => {
    if (!editingJob || !editingJob.title) return;
    try {
      if (isNew) {
        await recruitmentApi.create(editingJob);
      } else {
        await recruitmentApi.update(editingJob.id!, editingJob);
      }
      setEditingJob(null);
      setIsNew(false);
      fetchJobs();
    } catch (err) {
      console.error('Failed to save job:', err);
      alert('儲存失敗，請稍後再試');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除此職缺嗎？')) return;
    try {
      await recruitmentApi.delete(id);
      fetchJobs();
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  const filtered = jobs.filter(j => filter === '全部' || j.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magpie-dark">菁英招募管理</h2>
        <button
          onClick={() => { setEditingJob(emptyJob()); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm"
        >
          <Plus size={16} /> 新增職缺
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: '招募中', count: jobs.filter(j => j.status === '招募中').length, color: 'text-green-600 bg-green-50' },
          { label: '已截止', count: jobs.filter(j => j.status === '已截止').length, color: 'text-gray-500 bg-gray-50' },
          { label: '總應徵數', count: jobs.reduce((sum, j) => sum + (j.applicants || 0), 0), color: 'text-magpie-primary bg-magpie-lighter' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-lg p-4 text-center`}>
            <p className="text-3xl font-bold">{s.count}</p>
            <p className="text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {['全部', '招募中', '已截止'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${filter === f ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-magpie-dark">{isNew ? '新增' : '編輯'}職缺</h3>
              <button onClick={() => { setEditingJob(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">職缺名稱</label>
                <input type="text" value={editingJob.title || ''} onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">部門</label>
                  <select value={editingJob.department || '驗證部'} onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="驗證部">驗證部</option>
                    <option value="農產品部">農產品部</option>
                    <option value="永續部">永續部</option>
                    <option value="管理部">管理部</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">類型</label>
                  <select value={editingJob.type || '全職'} onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="全職">全職</option>
                    <option value="兼職">兼職</option>
                    <option value="實習">實習</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">狀態</label>
                <select value={editingJob.status || '招募中'} onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="招募中">招募中</option>
                  <option value="已截止">已截止</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditingJob(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">取消</button>
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
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="py-3 px-4 font-bold text-gray-600">職缺名稱</th>
                <th className="py-3 px-4 font-bold text-gray-600">部門</th>
                <th className="py-3 px-4 font-bold text-gray-600">類型</th>
                <th className="py-3 px-4 font-bold text-gray-600">應徵人數</th>
                <th className="py-3 px-4 font-bold text-gray-600">狀態</th>
                <th className="py-3 px-4 font-bold text-gray-600">更新日期</th>
                <th className="py-3 px-4 font-bold text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400">尚無資料</td></tr>
              ) : filtered.map((job) => (
                <tr key={job.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{job.title}</td>
                  <td className="py-3 px-4 text-gray-500">{job.department}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded">{job.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 font-bold text-gray-700">
                      <Users size={14} /> {job.applicants || 0}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${job.status === '招募中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{job.updatedAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingJob(job); setIsNew(false); }} className="p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(job.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecruitmentManage;
