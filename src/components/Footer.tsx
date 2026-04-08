import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-magpie-dark text-white pt-20 pb-8 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Left: Brand Info */}
          <div>
            <div className="mb-6">
              <img
                src="/assets/magpiecert_full_page_1775046941679.png"
                alt="藍鵲標誌"
                className="h-20 w-auto object-contain opacity-90"
              />
            </div>
            <h3 className="text-2xl font-bold tracking-wide mb-1">藍鵲驗證服務股份有限公司</h3>
            <p className="text-lg text-gray-300 mb-8">Blue Magpie Certifications, Inc.</p>

            <div className="space-y-2 text-gray-400">
              <p>公司地址：台北市內湖區新湖二路128號5樓之1</p>
              <p>客服專線：(02) 8791-8011</p>
              <p>客服信箱：services@magpiecert.com</p>
            </div>
          </div>

          {/* Right: 3-column links */}
          <div className="grid grid-cols-3 gap-8">
            {/* Column 1: 關於藍鵲 */}
            <div>
              <h5 className="font-bold text-lg mb-6 text-white tracking-wide">關於藍鵲</h5>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">公司簡介</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">政策聲明</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">合作夥伴</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">菁英招募</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">常見問題</Link></li>
              </ul>
            </div>

            {/* Column 2: 服務項目 */}
            <div>
              <h5 className="font-bold text-lg mb-6 text-white tracking-wide">服務項目</h5>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">ISO驗證</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">ESG查驗</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">農產品驗證</Link></li>
                <li><Link to="/certificates" className="text-gray-400 hover:text-white transition-colors">證書查詢</Link></li>
                <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">最新消息</Link></li>
              </ul>
            </div>

            {/* Column 3: 專業訓練 */}
            <div>
              <h5 className="font-bold text-lg mb-6 text-white tracking-wide">專業訓練</h5>
              <ul className="space-y-3">
                <li><Link to="/education" className="text-gray-400 hover:text-white transition-colors">實體課程</Link></li>
                <li><Link to="/education" className="text-gray-400 hover:text-white transition-colors">線上講座</Link></li>
                <li><Link to="/education" className="text-gray-400 hover:text-white transition-colors">企業包班</Link></li>
                <li><Link to="/education" className="text-gray-400 hover:text-white transition-colors">知識影片</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium tracking-wide">
          <p>Copyright&copy;2025 藍鵲驗證服務股份有限公司 Blue Magpie Certifications, Inc. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/about" className="hover:text-white transition-colors">網站使用條款</Link>
            <span className="text-gray-600">|</span>
            <Link to="/about" className="hover:text-white transition-colors">隱私權政策</Link>
            <span className="text-gray-600">|</span>
            <Link to="/about" className="hover:text-white transition-colors">Cookie政策</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
