import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { coursesApi } from '../../services/api';

// Registration Modal Component
const RegistrationModal: React.FC<{ isOpen: boolean; onClose: () => void; courseTitle?: string }> = ({ isOpen, onClose, courseTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col">
        {/* Slanted Tech Header */}
        <div className="relative h-28 bg-[#1B365D] overflow-hidden">
           <div className="absolute top-0 left-0 w-3/5 h-full bg-[#00A1E0] transform -skew-x-[30deg] -ml-20"></div>
           <div className="absolute top-0 right-1/4 w-1/4 h-full bg-[#E5ECF2]/20 transform -skew-x-[30deg]"></div>

           <div className="relative z-10 w-full h-full flex justify-between items-center px-8">
              <h2 className="text-3xl font-black text-white tracking-widest drop-shadow-md">報名</h2>
              <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
                 <X size={28} />
              </button>
           </div>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-10 bg-gray-50/50 flex-1 overflow-y-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">課 程 名 稱</label>
                  <select className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary focus:border-magpie-primary outline-none text-magpie-primary font-bold">
                     <option>{courseTitle || '請選擇課程'}</option>
                  </select>
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">姓 名</label>
                  <input type="text" className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none" />
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">生 日</label>
                  <input type="date" className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none text-gray-500" />
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">性 別</label>
                  <select className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none text-gray-500">
                     <option>預設值</option><option>男</option><option>女</option>
                  </select>
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">身分證字號</label>
                  <input type="text" className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none" />
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0 font-mono">E - m a i l</label>
                  <input type="email" className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none" />
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">連 絡 電 話</label>
                  <div className="flex gap-2 flex-1 items-center">
                     <input type="text" className="w-16 border border-gray-300 rounded-lg p-3 text-center" placeholder="區碼" />
                     <span>-</span>
                     <input type="text" className="flex-1 border border-gray-300 rounded-lg p-3" />
                     <span className="font-bold text-gray-500">#</span>
                     <input type="text" className="w-16 border border-gray-300 rounded-lg p-3 text-center" placeholder="分機" />
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">手 機</label>
                  <input type="text" className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none" />
               </div>
               <div className="md:col-span-2 flex items-center gap-4">
                  <label className="w-24 text-right font-bold text-gray-700 tracking-widest shrink-0">通 訊 地 址</label>
                  <div className="flex gap-3 flex-1 items-center">
                     <select className="w-32 border border-gray-300 rounded-lg p-3 bg-white text-gray-500"><option>預設值</option></select>
                     <select className="w-32 border border-gray-300 rounded-lg p-3 bg-white text-gray-500"><option>預設值</option></select>
                     <input type="text" className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-magpie-primary outline-none" />
                  </div>
               </div>
            </div>
            <div className="mt-8 flex justify-center">
                <button type="submit" className="bg-[#1B365D] hover:bg-magpie-primary text-white font-bold text-lg px-20 py-4 rounded shadow-lg transition-colors">
                  提 交 報 名
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Education: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['實體課程']);
  const [activeCategory, setActiveCategory] = useState('最新課程');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesApi.getAll();
        setCourses(data.filter((c: any) => c.status === '報名中' || c.status === '即將開課'));
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const handleRegisterClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const sidebarMenus = [
    { title: '最新課程', sub: [] },
    { title: '實體課程', sub: ['管理系統驗證', '產銷履歷農產品驗證', '有機農產品驗證'] },
    { title: '線上講座', sub: ['品質管理', '農產品驗證', 'ESG查驗'] },
    { title: '知識影片', sub: [] },
    { title: '企業包班', sub: [] }
  ];

  const typeMap: Record<string, string> = {
    '實體課程': 'physical',
    '線上講座': 'online',
    '知識影片': 'videos',
    '企業包班': 'corporate',
  };

  const filteredCourses = activeCategory === '最新課程'
    ? courses
    : courses.filter(c => c.type === typeMap[activeCategory] || c.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Area */}
      <div className="relative h-[300px] md:h-[400px] bg-[#1B365D] overflow-hidden flex flex-col justify-center items-center text-white">
         <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen" style={{ backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" }}></div>
         <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-wider mb-2 drop-shadow-lg">TRAINING</h1>
            <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-[#00A1E0]">教育訓練</h2>
         </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
         <div className="w-full md:w-[300px] lg:w-[350px] bg-[#E5ECF2] shrink-0">
            <div className="p-8 sticky top-20">
               <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide">教育訓練課程<br/><span className="text-sm font-normal text-gray-500 tracking-wider">Training</span></h3>
               <ul className="space-y-1 border-t border-gray-300 pt-6">
                 {sidebarMenus.map((menu) => {
                   const isExpanded = expandedMenus.includes(menu.title);
                   const hasSub = menu.sub.length > 0;
                   const isActive = activeCategory === menu.title;
                   return (
                     <li key={menu.title}>
                       <div
                         className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-colors ${isActive ? 'bg-[#1B365D] text-white font-bold' : 'text-gray-700 hover:bg-gray-200/50 hover:text-[#1B365D] font-bold'}`}
                         onClick={() => { if (hasSub) toggleMenu(menu.title); setActiveCategory(menu.title); }}
                       >
                         {menu.title}
                         {hasSub && (isExpanded ? <span className="font-mono text-xl leading-none">-</span> : <span className="font-mono text-xl leading-none">+</span>)}
                       </div>
                       {hasSub && isExpanded && (
                         <ul className="bg-transparent mt-1 mb-2 space-y-1">
                           {menu.sub.map(subItem => (
                             <li key={subItem} className={`px-8 py-2 text-sm cursor-pointer transition-colors hover:text-magpie-primary hover:font-bold ${activeCategory === subItem ? 'text-magpie-primary font-bold' : 'text-gray-600'}`} onClick={() => setActiveCategory(subItem)}>
                               {subItem}
                             </li>
                           ))}
                         </ul>
                       )}
                     </li>
                   );
                 })}
               </ul>
            </div>
         </div>

         <div className="flex-1 bg-white p-8 lg:p-16">
            <div className="text-sm text-gray-400 font-medium mb-12 flex items-center gap-2">
               <Link to="/" className="hover:text-magpie-primary transition">首頁</Link>
               <ChevronRight size={14} />
               <span className="hover:text-magpie-primary cursor-pointer transition">教育訓練</span>
               <ChevronRight size={14} />
               <span className="text-gray-600">{activeCategory}</span>
            </div>

            <div className="flex justify-between items-end border-b-2 border-gray-100 pb-4 mb-10">
               <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-wide mb-2">{activeCategory}</h2>
                  <p className="text-gray-500 font-medium">共 {filteredCourses.length} 堂課程</p>
               </div>
            </div>

            {loading ? (
              <div className="text-center py-16 text-gray-400">載入中...</div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-gray-400">目前尚無課程資料</div>
            ) : (
              <div className="space-y-6">
                 {filteredCourses.map(course => (
                   <div key={course.id} className="group bg-gray-50 rounded-xl border border-gray-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-xl hover:border-magpie-primary transition-all duration-300">
                      <div>
                         <div className="flex gap-2 mb-4">
                            <span className="bg-[#1B365D] text-white text-xs px-3 py-1 font-bold rounded">{course.type === 'physical' ? '實體課程' : course.type === 'online' ? '線上講座' : course.type === 'videos' ? '知識影片' : '企業包班'}</span>
                            <span className="bg-blue-100 text-[#00A1E0] text-xs px-3 py-1 font-bold rounded">{course.category}</span>
                         </div>
                         <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-magpie-primary transition">{course.title}</h3>
                         <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-[#00A1E0]" />
                              <span>開課日期：{course.date}</span>
                            </div>
                            {course.location && (
                              <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#00A1E0]" />
                                <span>地點：{course.location}</span>
                              </div>
                            )}
                         </div>
                      </div>
                      <button
                        onClick={() => handleRegisterClick(course.title)}
                        className="shrink-0 flex items-center justify-center gap-2 text-[#1B365D] border-2 border-[#1B365D] px-6 py-3 font-bold rounded hover:bg-[#1B365D] hover:text-white transition w-full md:w-auto mt-4 md:mt-0"
                      >
                        查看詳情與報名 <ArrowRight size={18} />
                      </button>
                   </div>
                 ))}
              </div>
            )}
         </div>
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseTitle={selectedCourse} />
    </div>
  );
};

export default Education;
