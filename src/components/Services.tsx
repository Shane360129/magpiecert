import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <section id="services" className="relative">
      {/* Blue Banner */}
      <div className="bg-magpie-primary text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide italic">Our Services</h2>
          <div className="mt-8 md:mt-0">
            <Link
              to="/contact"
              className="flex items-center gap-2 border border-white/60 text-white px-8 py-3 rounded-full hover:bg-white hover:text-magpie-primary transition-colors font-medium text-lg"
            >
              Request a personalized service
            </Link>
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="bg-grid-pattern py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-1 bg-magpie-primary"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-magpie-primary tracking-wide">
              服務項目
            </h2>
          </div>
          <div className="w-3 h-3 bg-magpie-accent rounded-full ml-16 mt-1 mb-4"></div>
          <h3 className="text-xl text-magpie-primary mb-12 pl-16">提供的驗證服務</h3>

          {/* Asymmetric Grid: Agriculture large left, System + ESG stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agriculture - Large Left */}
            <Link to="/services" className="relative group overflow-hidden aspect-[4/5] md:row-span-2">
              <img
                src="/assets/service_agri_1775047500817.png"
                alt="農產品驗證"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h4 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">農產品驗證</h4>
              </div>
            </Link>

            {/* Management System - Top Right */}
            <Link to="/services" className="relative group overflow-hidden aspect-video">
              <img
                src="/assets/service_system_1775047557038.png"
                alt="管理系統驗證"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">管理系統驗證</h4>
              </div>
            </Link>

            {/* ESG - Bottom Right */}
            <Link to="/services" className="relative group overflow-hidden aspect-video">
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=800"
                alt="ESG查驗"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">ESG查驗</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
