import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Users, LayoutList } from 'lucide-react';

const mockCourses = [
  { id: 'C-001', title: 'ISO 14067 碳足跡內部查證員訓練班', type: '實體課程', date: '2024-05-15', status: '報名中', students: 24 },
  { id: 'C-002', title: '產銷履歷農產品輔導員進階培訓', type: '實體課程', date: '2024-06-10', status: '報名中', students: 12 },
  { id: 'C-003', title: '企業 ESG 查證重點與案例剖析 (上)', type: '線上講座', date: '2024-04-22', status: '已結訓', students: 85 },
  { id: 'C-004', title: 'ISO 27001 資安防護基礎班', type: '知識影片', date: '隨時', status: '長期開放', students: 120 },
];

const ContentManage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <h2 className="text-2xl font-extrabold text-magpie-dark tracking-wide">網站內容與課程管理</h2>
           <p className="text-gray-500 mt-1">維護前台教育訓練名單與審核報名者資料</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#1B365D] hover:bg-magpie-hover text-white px-4 py-2 rounded shadow transition font-medium">
           <Plus size={18} /> 新增內容與課程
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
         <button 
           onClick={() => setActiveTab('courses')}
           className={`pb-3 font-bold px-2 transition-colors ${activeTab === 'courses' ? 'text-magpie-primary border-b-2 border-magpie-primary' : 'text-gray-400 hover:text-gray-700'}`}
         >
           <LayoutList size={18} className="inline mr-2" /> 課程與報名維護
         </button>
         <button 
           onClick={() => setActiveTab('articles')}
           className={`pb-3 font-bold px-2 transition-colors ${activeTab === 'articles' ? 'text-magpie-primary border-b-2 border-magpie-primary' : 'text-gray-400 hover:text-gray-700'}`}
         >
           文章發佈 (建置中)
         </button>
      </div>

      {activeTab === 'courses' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="搜尋課程名稱或編號..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-magpie-primary text-sm"
                />
             </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E5ECF2] text-gray-600 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-gray-100">課程編號</th>
                  <th className="p-4 font-bold border-b border-gray-100">課程名稱</th>
                  <th className="p-4 font-bold border-b border-gray-100">形式</th>
                  <th className="p-4 font-bold border-b border-gray-100">開課日期</th>
                  <th className="p-4 font-bold border-b border-gray-100">報名狀態</th>
                  <th className="p-4 font-bold border-b border-gray-100 text-right">操作與名單</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {mockCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-magpie-lighter/40 transition-colors border-b border-gray-50 last:border-0 group">
                    <td className="p-4 font-mono font-bold text-gray-500">{course.id}</td>
                    <td className="p-4 font-bold text-[#1B365D] w-1/3">{course.title}</td>
                    <td className="p-4 text-gray-600">
                       <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{course.type}</span>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{course.date}</td>
                    <td className="p-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${course.status === '報名中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                         {course.status}
                       </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 font-bold transition">
                        <Users size={16} /> 名單 ({course.students})
                      </button>
                      <button className="text-gray-400 hover:text-[#1B365D] transition p-1 border border-transparent hover:border-gray-200 rounded bg-white shadow-sm">
                        <Edit3 size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition p-1 border border-transparent hover:border-gray-200 rounded bg-white shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 text-sm text-gray-500 text-center">
             此清單為教育訓練系統的即時連線資料，供執行人員進行查驗。
          </div>
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 border-dashed p-12 text-center text-gray-400 my-8">
           這區塊保留給未來擴充部落格、最新消息、法規動態等文章編輯器使用。
        </div>
      )}
    </div>
  );
};

export default ContentManage;
