import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    id: 1,
    title: '新增服務項目：產銷履歷農產品分裝/流通',
    category: '新消息',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
    date: '2024-08-15'
  },
  {
    id: 2,
    title: '最新公告：驗證申請書改版 (新版次：2.2版)',
    category: '公告',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=400',
    date: '2024-05-09'
  },
  {
    id: 3,
    title: '知識之翼實體課程：ISO14067碳足跡內部查證訓練班',
    category: '活動',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400',
    date: '2024-05-06'
  }
];

const News: React.FC = () => {
  return (
    <section id="news" className="py-24 bg-white relative border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-1 bg-magpie-primary"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-magpie-primary tracking-wide">最新消息</h2>
          <div className="w-3 h-3 bg-magpie-accent rounded-full mt-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-0 left-0 bg-magpie-primary text-white px-4 py-1 text-sm font-bold z-10">
                  {item.category}
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 blur-[1px] group-hover:blur-0"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-magpie-primary font-bold text-sm mb-2 opacity-80">{item.date}</span>
                <h4 className="text-xl font-bold text-magpie-dark mb-4 group-hover:text-magpie-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="mt-auto">
                    <span className="text-sm font-bold text-magpie-primary flex justify-end gap-1 items-center">
                        READ MORE <ArrowRight size={14} />
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/news" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-magpie-primary text-magpie-primary hover:bg-magpie-primary hover:text-white font-bold transition-colors">
            全部消息
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
