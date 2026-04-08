import React, { useState } from 'react';
import { ChevronRight, FileText, CheckCircle, Shield, TrendingUp, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('驗證品質');

  const tabs = [
    { id: '驗證品質', icon: <CheckCircle size={18} /> },
    { id: '人才培育品質', icon: <TrendingUp size={18} /> },
    { id: '公正性聲明', icon: <Shield size={18} /> },
    { id: '財務資源', icon: <FileText size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Area */}
      <div className="relative h-[300px] md:h-[400px] bg-[#1B365D] overflow-hidden flex flex-col justify-center items-center text-white">
         <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920')" }}></div>
         <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-wider mb-2 drop-shadow-lg">POLICY</h1>
            <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-[#00A1E0]">政策聲明</h2>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 font-medium mb-12 flex items-center gap-2">
           <Link to="/" className="hover:text-magpie-primary transition">首頁</Link>
           <ChevronRight size={14} />
           <span className="text-gray-600">關於我們</span>
        </div>

        {/* About MBC — 公司簡介 */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-10 bg-[#00A1E0] rounded-full"></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-wide">About MBC</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-magpie-primary mb-6 flex items-center gap-2">
                <Building2 size={24} /> 公司簡介
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                藍鵲驗證服務股份有限公司（Blue Magpie Certifications, Inc.）是台灣專業的驗證與教育訓練機構，致力於協助企業取得國際認證，建立完善的品質管理體系。
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                我們擁有豐富的業界實務經驗，提供客製化的驗證輔導與專業課程服務，涵蓋 ISO 管理系統驗證、農產品產銷履歷與有機驗證、ESG 溫室氣體查驗等多元領域。
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                秉持公正、專業、誠信的核心價值，我們持續精進服務品質，成為企業最值得信賴的驗證夥伴。
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center overflow-hidden">
              <img src="/assets/about_greenhouse_1775051032770.png" alt="藍鵲驗證" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* 政策聲明 Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-10 bg-[#00A1E0] rounded-full"></div>
          <h2 className="text-4xl font-black text-gray-900 tracking-wide">政策聲明</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-bold text-lg transition-colors border-b-4 ${
                activeTab === tab.id 
                  ? 'border-magpie-primary text-magpie-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.id}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[400px]">
          
          {activeTab === '驗證品質' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-magpie-primary inline-block rounded-full"></span>
                驗證品質政策
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                我們致力於提供具國際水準、專業且具公信力的驗證服務。本機構以持續改善為核心精神，確保驗證程序的嚴謹性與一致性，以符合國際標準規範，為客戶創造最大價值。
              </p>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">專業客觀</h4>
                    <p className="text-gray-600">以專業知識及豐富經驗，進行客觀、獨立的驗證工作。</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">持續改善</h4>
                    <p className="text-gray-600">建立有效機制，持續審視並優化內部管理與外部服務品質。</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === '人才培育品質' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-magpie-primary inline-block rounded-full"></span>
                人才培育品質政策
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                人才是我們最珍貴的資產。我們重視員工與稽核員的專業職能發展，提供完善的教育訓練體系，確保每位同仁具備最新法規知識與稽核技能。
              </p>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3 mt-6 ml-4">
                <li>定期辦理國內外相關法規研討會與專業技能訓練。</li>
                <li>落實稽核員能力評鑑考核機制。</li>
                <li>鼓勵員工持續進修，提升個人職涯發展與企業競爭力。</li>
              </ul>
            </div>
          )}

          {activeTab === '公正性聲明' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-magpie-primary inline-block rounded-full"></span>
                公正性聲明
              </h3>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 italic text-gray-700 leading-relaxed text-lg">
                「藍鵲驗證股份有限公司深知在執行管理系統與農產品驗證活動時，公正性之重要性。我們承諾管理利益衝突，並確保驗證活動的客觀性。
                所有驗證決策皆基於客觀證據，不受任何商業、財務或其他壓力的影響。本機構不會提供任何可能損害公正性的諮詢服務給驗證客戶。」
              </div>
              <div className="flex justify-end mt-4">
                <span className="font-bold text-gray-900 text-lg">最高管理階層 簽署</span>
              </div>
            </div>
          )}

          {activeTab === '財務資源' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-magpie-primary inline-block rounded-full"></span>
                財務資源
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                我們具備穩健的財務基礎，確保備妥充分的財務資源，以支撐驗證業務的運作，並承擔執行驗證服務可能產生之風險責任。
              </p>
              <div className="mt-8 flex items-center gap-6 bg-white p-6 rounded-xl border-l-4 border-[#00A1E0]">
                <Shield className="text-[#00A1E0] shrink-0" size={40} />
                <p className="text-gray-700 font-medium">我們已投保足額之「專業責任險」，以保障客戶權益並符合認證機構之規範要求。</p>
              </div>
            </div>
          )}

        </div>

        {/* Certificate Display Area (TAF etc) */}
        <div className="mt-20">
           <h3 className="text-2xl font-black text-center text-gray-900 tracking-wide mb-12">核可驗證資格與證書</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Placeholders for actual certificates */}
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                   <div className="aspect-[3/4] bg-gray-100 relative group flex items-center justify-center p-4">
                      {/* Fake Document Content */}
                      <div className="w-full h-full bg-white shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-between">
                         <div className="text-center">
                            <Shield className="text-magpie-light mb-2 mx-auto" size={32} />
                            <div className="h-1 w-12 bg-magpie-primary mx-auto mb-4"></div>
                            <div className="text-xs font-bold text-gray-400 mb-1">CERTIFICATE OF ACCREDITATION</div>
                            <div className="flex flex-col gap-2 mt-4 w-full">
                               <div className="h-2 bg-gray-200 rounded w-full"></div>
                               <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                               <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                            </div>
                         </div>
                         <div className="text-[10px] text-gray-400 mt-auto">TAF {num}</div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-magpie-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button className="bg-white text-magpie-dark px-4 py-2 font-bold rounded-full text-sm">點擊放大檢視</button>
                      </div>
                   </div>
                   <div className="p-4 text-center">
                      <h4 className="font-bold text-gray-900">TAF ISO 認證證書 {num}</h4>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 菁英招募 */}
        <div className="mt-20 bg-gradient-to-r from-[#1B365D] to-[#0a1f3d] rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A1E0]/10 rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Users size={28} className="text-[#00A1E0]" />
              <h3 className="text-3xl font-black tracking-wide">菁英招募</h3>
            </div>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl">
              歡迎加入藍鵲驗證！我們重視每一位夥伴的專業發展，提供完善的職涯規劃與培訓資源。
            </p>
            <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
              如果您對驗證產業充滿熱情，期待在專業領域持續成長，藍鵲將是您發揮所長的最佳舞台。我們持續尋找具備品質管理、農業驗證、ESG 查驗等專業背景的優秀人才。
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#00A1E0] hover:bg-[#0090cc] text-white font-bold px-8 py-4 rounded-lg transition-colors shadow-lg">
              Join Us — 立即應徵
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
