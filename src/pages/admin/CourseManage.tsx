import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Users, X, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { coursesApi } from '../../services/api';

const courseTypeMap: Record<string, { label: string; categories: string[] }> = {
  physical: { label: '實體課程', categories: ['品質管理', '農產品驗證', 'ESG查驗'] },
  online: { label: '線上講座', categories: ['品質管理', '農產品驗證', 'ESG查驗'] },
  videos: { label: '知識影片', categories: ['全部影片'] },
  corporate: { label: '企業包班', categories: ['企業包班方案'] },
};

interface Course {
  id: string;
  title: string;
  category: string;
  type: string;
  date: string;
  status: string;
  students: number;
  maxStudents: number;
}

const emptyCourse = (type: string): Omit<Course, 'id'> => ({
  title: '',
  category: '品質管理',
  type,
  date: new Date().toISOString().slice(0, 10),
  status: '草稿',
  students: 0,
  maxStudents: 30,
});

const CourseManage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const config = courseTypeMap[type || 'physical'] || courseTypeMap.physical;

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await coursesApi.getAll();
      const filtered = data.filter((c: Course) => c.type === (type || 'physical'));
      setCourses(filtered);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [type]);

  const handleSave = async () => {
    if (!editingCourse || !editingCourse.title) return;
    try {
      if (isNew) {
        await coursesApi.create({ ...editingCourse, type: type || 'physical' });
      } else {
        await coursesApi.update(editingCourse.id!, editingCourse);
      }
      setEditingCourse(null);
      setIsNew(false);
      fetchCourses();
    } catch (err) {
      console.error('Failed to save course:', err);
      alert('儲存失敗，請稍後再試');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除此課程嗎？')) return;
    try {
      await coursesApi.delete(id);
      fetchCourses();
    } catch (err) {
      console.error('Failed to delete course:', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  const filtered = courses.filter(c =>
    (selectedCategory === '全部' || c.category === selectedCategory) &&
    c.title.includes(searchTerm)
  );

  const statusColors: Record<string, string> = {
    '報名中': 'bg-green-100 text-green-700',
    '即將開課': 'bg-blue-100 text-blue-700',
    '草稿': 'bg-gray-100 text-gray-500',
    '已結束': 'bg-red-100 text-red-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-magpie-dark">{config.label}管理</h2>
        <button
          onClick={() => { setEditingCourse(emptyCourse(type || 'physical')); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-magpie-primary text-white rounded hover:bg-magpie-hover transition-colors font-bold text-sm"
        >
          <Plus size={16} /> 新增{config.label}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜尋課程名稱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm"
            />
          </div>
          {config.categories.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('全部')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${selectedCategory === '全部' ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                全部
              </button>
              {config.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-magpie-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-magpie-dark">{isNew ? '新增' : '編輯'}課程</h3>
              <button onClick={() => { setEditingCourse(null); setIsNew(false); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">課程名稱</label>
                <input type="text" value={editingCourse.title || ''} onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">分類</label>
                  <select value={editingCourse.category || ''} onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    {config.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">日期</label>
                  <input type="date" value={editingCourse.date || ''} onChange={(e) => setEditingCourse({ ...editingCourse, date: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">狀態</label>
                  <select value={editingCourse.status || '草稿'} onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="草稿">草稿</option>
                    <option value="報名中">報名中</option>
                    <option value="即將開課">即將開課</option>
                    <option value="已結束">已結束</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">最大人數</label>
                  <input type="number" value={editingCourse.maxStudents || 30} onChange={(e) => setEditingCourse({ ...editingCourse, maxStudents: parseInt(e.target.value) })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setEditingCourse(null); setIsNew(false); }} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">取消</button>
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
                  <th className="py-3 px-4 font-bold text-gray-600">課程名稱</th>
                  <th className="py-3 px-4 font-bold text-gray-600">分類</th>
                  <th className="py-3 px-4 font-bold text-gray-600">日期</th>
                  <th className="py-3 px-4 font-bold text-gray-600">報名人數</th>
                  <th className="py-3 px-4 font-bold text-gray-600">狀態</th>
                  <th className="py-3 px-4 font-bold text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-400">尚無資料</td></tr>
                ) : filtered.map((course) => (
                  <tr key={course.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{course.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-magpie-lighter text-magpie-primary text-xs font-bold rounded">{course.category}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{course.date}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${(course.students || 0) >= (course.maxStudents || 30) ? 'text-red-500' : 'text-gray-700'}`}>
                        {course.students || 0}/{course.maxStudents || 30}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[course.status] || 'bg-gray-100 text-gray-500'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingCourse(course); setIsNew(false); }} className="p-1.5 text-gray-500 hover:text-magpie-primary hover:bg-magpie-lighter rounded" title="編輯"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(course.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded" title="刪除"><Trash2 size={14} /></button>
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

export default CourseManage;
