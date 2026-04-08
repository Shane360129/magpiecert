import React from 'react';
import { Link } from 'react-router-dom';

const CtaBanner: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 md:py-32 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          信任的橋樑，專業的保障
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
          藍鵲驗證，隨時為您服務！
        </h3>
        <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
          我們致力於提供專業、可靠的驗證服務，並以最快速、最完善的方式解決，以滿足各行各業的多元需求。
          無論您有任何問題、需求或合作提案，歡迎隨時與我們聯繫！讓藍鵲驗證成為您邁向成功的重要夥伴。
        </p>
        <Link
          to="/contact"
          className="inline-block px-16 py-5 bg-magpie-light hover:bg-magpie-primary text-white text-xl font-bold tracking-wider transition-colors shadow-xl"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
