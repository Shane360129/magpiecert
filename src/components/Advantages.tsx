import React from 'react';
import { Link } from 'react-router-dom';

const advantages = [
  {
    title: '客製化服務',
    description: '深入了解客戶的管理系統，根據不同需求與行業特性，提供個性化的驗證服務，提升稽核的附加價值。',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: '專業顧問',
    description: '擁有各領域專業且經驗豐富的顧問，同時能處理多項驗證服務，協助不同產業客戶獲得適合且有用的驗證，節省營運成本、提升企業競爭力。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: '量身規劃時程',
    description: '輔導時程配合客戶的人力資源配置與作業需求，制定最適合的驗證進度計劃，為公司儘速獲得驗證，進行市場佈局。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: '優質服務',
    description: '提供即時的諮詢與服務，縮短驗證時間，驗證完成後，提供持續的改進建議及支援，協助企業穩定運行。',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
  },
];

const Advantages: React.FC = () => {
  return (
    <section className="py-24 bg-grid-pattern relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-1 bg-magpie-primary"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-magpie-primary tracking-wide">
            我們的優勢
          </h2>
        </div>
        <div className="w-3 h-3 bg-magpie-accent rounded-full ml-16 mt-1 mb-4"></div>
        <h3 className="text-2xl md:text-3xl font-bold text-magpie-primary mb-16 pl-16">
          藍鵲　讓卓越成為您的標準
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {advantages.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center group">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xl font-bold text-magpie-dark mb-3">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-magpie-primary hover:bg-magpie-hover text-white font-bold px-10 py-4 rounded-lg transition-colors shadow-lg text-lg"
          >
            獲得報價
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
