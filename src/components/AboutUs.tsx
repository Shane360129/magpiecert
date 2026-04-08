import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="relative bg-grid-pattern">
      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Text Content - Left */}
        <div className="flex-1 py-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-1 bg-magpie-primary"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-magpie-primary tracking-wide">
              關於藍鵲
            </h2>
          </div>
          <div className="w-3 h-3 bg-magpie-accent rounded-full ml-16 mt-1 mb-4"></div>

          <h3 className="text-2xl md:text-3xl font-bold text-magpie-primary mb-8 pl-16">
            國際標準驗證的領航者
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 mb-4 pl-16">
            以「藍鵲」為名，象徵我們對臺灣生態的承諾與驕傲。
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-10 pl-16">
            我們致力於推動生態農法與環境永續，打造具國際信賴度的驗證品牌，期許成為臺灣永續發展的象徵與代表。
          </p>

          <div className="pl-16">
            <Link
              to="/about"
              className="inline-flex items-center gap-4 px-10 py-4 bg-magpie-primary hover:bg-magpie-hover text-white font-bold text-lg tracking-wider shadow-lg transition-transform hover:-translate-y-1"
            >
              DISCOVER MORE
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>

        {/* Image Content - Right with blue diagonal accent */}
        <div className="flex-1 relative min-h-[400px] md:min-h-0">
          <img
            src="/assets/about_greenhouse_1775051032770.png"
            alt="專業溫室視察"
            className="w-full h-full object-cover"
          />
          {/* Blue diagonal accent on bottom-right */}
          <div
            className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-magpie-primary"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
