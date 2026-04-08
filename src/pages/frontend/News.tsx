import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Search, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsApi } from '../../services/api';

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部消息');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getAll();
        setNewsItems(data.filter((n: any) => n.status === '已發布'));
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categoryMap: Record<string, string> = {
    '農業知識': '農產新知',
    '媒體報導': '新聞媒體',
  };

  const categories = ['全部消息', '農業知識', '媒體報導'];

  const filteredNews = newsItems.filter(item => {
    const matchCategory = activeCategory === '全部消息' ||
      item.category === activeCategory ||
      item.category === categoryMap[activeCategory];
    const matchSearch = !searchQuery ||
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.body || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16 md:pt-20">

      {/* Search Header Area */}
      <div className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40 shadow-sm">
         <div className="container mx-auto px-4 py-4 md:py-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`whitespace-nowrap px-6 py-2.5 rounded-md font-bold text-sm transition-all ${
                     activeCategory === cat
                       ? 'bg-white text-magpie-primary shadow-sm'
                       : 'text-gray-500 hover:text-gray-900'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
            <div className="relative w-full md:w-80">
               <input
                 type="text"
                 placeholder="搜尋新聞、公告或關鍵字..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-lg focus:ring-1 focus:ring-magpie-primary outline-none transition-shadow text-sm"
               />
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-6xl flex-1">

        <div className="text-sm text-gray-400 font-medium mb-12 flex items-center gap-2">
           <Link to="/" className="hover:text-magpie-primary transition">首頁</Link>
           <ChevronRight size={14} />
           <span className="text-gray-600">最新消息</span>
           {activeCategory !== '全部消息' && (
             <>
               <ChevronRight size={14} />
               <span className="text-gray-900 font-bold">{activeCategory}</span>
             </>
           )}
        </div>

        <div className="flex items-center gap-3 mb-10">
          <div className="w-2 h-10 bg-[#00A1E0] rounded-full"></div>
          <h1 className="text-4xl font-black text-gray-900 tracking-wide uppercase">
            News <span className="text-2xl font-bold ml-2 text-gray-400">/ {activeCategory}</span>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">載入中...</div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-sans group cursor-pointer border border-gray-100/50 flex flex-col">
                 <div className="h-56 relative overflow-hidden bg-magpie-lighter">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-magpie-primary text-6xl font-black opacity-20">
                        {item.category?.charAt(0) || 'N'}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-magpie-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                       {item.category}
                    </div>
                 </div>
                 <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-magpie-primary text-sm font-bold mb-3">
                       <Calendar size={14} />
                       {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-magpie-primary transition-colors line-clamp-2">
                       {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                       {item.body || ''}
                    </p>
                    <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                       <span className="text-gray-600 group-hover:text-magpie-primary transition-colors">繼續閱讀</span>
                       <ArrowRight size={16} className="text-magpie-primary transform group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100 mt-8">
             <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                <Search size={32} className="text-gray-300" />
             </div>
             <h3 className="text-2xl font-bold text-gray-700 mb-2">找不到相關消息</h3>
             <p className="text-gray-500">很抱歉，沒有符合條件的結果，請嘗試其他關鍵字。</p>
             <button
               onClick={() => {setSearchQuery(''); setActiveCategory('全部消息');}}
               className="mt-8 px-6 py-2 bg-magpie-primary text-white font-bold rounded-lg hover:bg-magpie-dark transition-colors"
             >
               顯示全部消息
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
