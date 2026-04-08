import React, { useState } from 'react';
import { ChevronRight, Download, FileText, CheckCircle, MonitorPlay, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['管理系統驗證']);
  const [activeCategory, setActiveCategory] = useState('品質管理系統 ISO 9001');

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const sidebarMenus = [
    { title: '管理系統驗證', sub: ['品質管理系統 ISO 9001', '環境管理系統 ISO 14001', '職業安全衛生 ISO 45001'] },
    { title: '產銷履歷驗證', sub: ['農糧作物', '農產品分裝/流通', '養殖水產品'] },
    { title: '有機農產驗證', sub: [] },
    { title: 'ESG 相關驗證', sub: ['碳足跡盤查 ISO 14067', '溫室氣體盤查 ISO 14064-1'] }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Area */}
      <div className="relative h-[250px] md:h-[350px] bg-[#1B365D] overflow-hidden flex flex-col justify-center items-center text-white">
         <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920')" }}></div>
         <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-black tracking-wider mb-2 drop-shadow-lg uppercase text-center px-4">Services</h1>
            <h2 className="text-xl md:text-2xl font-bold tracking-widest text-[#00A1E0]">服務項目</h2>
         </div>
      </div>

      {/* Main Layout - Split screen look */}
      <div className="flex flex-col md:flex-row min-h-screen">
         
         {/* Left Sidebar (Light Blue BG) */}
         <div className="w-full md:w-[300px] lg:w-[320px] bg-[#E5ECF2] shrink-0 border-r border-gray-200">
            <div className="p-6 md:p-8 sticky top-20">
               <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide border-b-2 border-magpie-primary pb-4">
                  服務類別
               </h3>
               
               <ul className="space-y-1">
                 {sidebarMenus.map((menu) => {
                   const isExpanded = expandedMenus.includes(menu.title);
                   const hasSub = menu.sub.length > 0;
                   const isActiveTab = expandedMenus.includes(menu.title) || activeCategory === menu.title;

                   return (
                     <li key={menu.title}>
                       <div 
                         className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-colors border-l-4 ${isActiveTab ? 'bg-white border-magpie-primary text-magpie-primary font-bold shadow-sm' : 'border-transparent text-gray-700 hover:bg-white/50 hover:text-[#1B365D] font-bold'}`}
                         onClick={() => {
                           if (hasSub) toggleMenu(menu.title);
                           if (!hasSub) setActiveCategory(menu.title);
                         }}
                       >
                         {menu.title}
                         {hasSub && (isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
                       </div>
                       
                       {/* Sub Menu */}
                       {hasSub && isExpanded && (
                         <ul className="bg-transparent mt-1 mb-3 space-y-1">
                           {menu.sub.map(subItem => (
                             <li 
                               key={subItem} 
                               className={`px-8 py-2.5 text-sm cursor-pointer transition-all border-l-2 ml-4 hover:border-magpie-primary hover:text-magpie-primary hover:font-bold ${activeCategory === subItem ? 'border-magpie-primary text-magpie-primary font-bold bg-white/40' : 'border-gray-200 text-gray-600'}`}
                               onClick={() => setActiveCategory(subItem)}
                             >
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

         {/* Right Main Content */}
         <div className="flex-1 bg-white p-6 md:p-12 lg:p-16">
            
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-400 font-medium mb-12 flex items-center gap-2 flex-wrap">
               <Link to="/" className="hover:text-magpie-primary transition">首頁</Link>
               <ChevronRight size={14} />
               <span className="text-gray-600">服務項目</span>
               <ChevronRight size={14} />
               <span className="text-gray-900 font-bold">{activeCategory}</span>
            </div>

            {/* Dynamic Content Based on Active Category */}
            <div className="animate-fade-in max-w-4xl border-l-[6px] border-[#00A1E0] pl-6 md:pl-10">
               <div className="flex items-center gap-4 mb-4">
                  <MonitorPlay className="text-[#00A1E0]" size={32} />
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-wide">{activeCategory}</h2>
               </div>
               {activeCategory.includes('ISO 9001') && <p className="text-xl text-gray-500 font-medium tracking-wide mb-10">Quality Management Systems</p>}

               {/* Section 1: Definition */}
               <div className="mb-12">
                  <h3 className="text-2xl font-bold text-magpie-primary mb-6 flex items-center gap-2">
                     <FileText size={24} /> 簡介與說明
                  </h3>
                  <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 text-gray-700 leading-relaxed text-lg">
                    {activeCategory.includes('ISO 9001') ? (
                       <p>ISO 9001 是由國際標準化組織（ISO）所發布的品質管理系統標準，也是全球最普及的管理系統。它提供了一個框架，協助企業確保其產品與服務持續滿足客戶需求與相關法規要求，並致力於提升客戶滿意度。<br/><br/>透過計畫、執行、查核與行動（PDCA）的循環管理模式，企業能有效控管風險、優化內部流程並持續改善績效。</p>
                    ) : (
                       <p>本項服務提供符合國際標準或國家規範之驗證服務，協助您的企業建立標準化作業流程，提升品牌價值與市場競爭力。詳細資訊請參閱本機構發布之驗證指導準則。</p>
                    )}
                  </div>
               </div>

               {/* Section 2: Benefits */}
               <div className="mb-12">
                  <h3 className="text-2xl font-bold text-magpie-primary mb-6 flex items-center gap-2">
                     <CheckCircle size={24} /> 核心效益
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {[
                        '提升客戶滿意度與忠誠度',
                        '降低營運成本與資源浪費',
                        '強化內部管理與流程透明度',
                        '符合國際供應鏈稽核要求',
                        '擴展全球市場業務機會',
                        '增強品牌信譽與市場競爭力'
                     ].map((benefit, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-white box-shadow border border-gray-100 shadow-sm rounded-lg hover:border-magpie-primary transition-colors">
                           <div className="mt-0.5 text-green-500 shrink-0"><CheckCircle size={20} /></div>
                           <p className="text-gray-800 font-medium">{benefit}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Call to Action & Downloads */}
               <div className="mt-16 bg-blue-50/50 p-8 rounded-2xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                     <h4 className="text-xl font-bold text-[#1B365D] mb-2">準備好開始驗證了嗎？</h4>
                     <p className="text-gray-600">下載相關文件，或直接與我們聯繫以獲得專屬報價。</p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                     <a href="/downloads" className="flex justify-center items-center gap-2 bg-white text-magpie-primary border-2 border-magpie-primary px-6 py-3 font-bold rounded hover:bg-blue-50 transition w-full md:w-auto">
                        <Download size={18} />
                        相關文件下載
                     </a>
                     <a href="/contact" className="flex justify-center items-center gap-2 bg-[#1B365D] text-white px-6 py-3 font-bold rounded hover:bg-magpie-primary transition w-full md:w-auto shadow-lg">
                        申請驗證報價
                     </a>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default Services;
