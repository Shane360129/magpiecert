import React from 'react';
import { Mail, Phone, Printer, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Page Header */}
      <div className="bg-magpie-dark py-20 text-center text-white relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" style={{ backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" }}></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-wide">聯絡我們</h1>
          <div className="w-16 h-1 bg-magpie-accent mx-auto mb-4"></div>
          <p className="text-lg text-magpie-lighter">填寫以下表單或直接致電，我們將有專人盡快為您服務</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
           
           {/* Contact Info Sidebar */}
           <div className="bg-magpie-primary text-white p-10 md:w-2/5 flex flex-col justify-between">
              <div>
                 <h2 className="text-3xl font-bold mb-2">獲得報價與反饋</h2>
                 <p className="text-magpie-lighter mb-12 text-sm leading-relaxed">
                   若是申請初次驗證或轉讓，歡迎透過表單先行提供基本資訊以縮短評估時間。或是您的寶貴意見，也都歡迎隨時讓我們知道。
                 </p>
                 
                 <ul className="space-y-8">
                    <li className="flex gap-4">
                       <MapPin className="text-magpie-accent shrink-0 mt-1" size={24} />
                       <div>
                          <p className="font-bold text-lg mb-1">Company Address</p>
                          <p className="text-magpie-lighter font-medium">台北市內湖區新湖二路 128 號 5 樓之 1</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Phone className="text-magpie-accent shrink-0 mt-1" size={24} />
                       <div>
                          <p className="font-bold text-lg mb-1">Telephone</p>
                          <p className="text-magpie-lighter font-medium">(02) 8791 - 8011</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Printer className="text-magpie-accent shrink-0 mt-1" size={24} />
                       <div>
                          <p className="font-bold text-lg mb-1">Facsimile</p>
                          <p className="text-magpie-lighter font-medium">(02) 8791 - 8077</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Mail className="text-magpie-accent shrink-0 mt-1" size={24} />
                       <div>
                          <p className="font-bold text-lg mb-1">Email Address</p>
                          <p className="text-magpie-lighter font-medium">services@magpiecert.com</p>
                       </div>
                    </li>
                 </ul>
              </div>
              
              <div className="mt-16 text-magpie-lighter/50 font-medium text-sm">
                 營業時間：週一至週五 09:00 - 18:00
              </div>
           </div>
           
           {/* Form Area */}
           <div className="p-10 md:p-14 md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">傳送您的需求表單</h2>
              
              <form className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">公司/單位名稱 *</label>
                       <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-magpie-primary focus:bg-white transition" placeholder="請輸入單位名稱" required />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">聯絡人姓名 *</label>
                       <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-magpie-primary focus:bg-white transition" placeholder="真實姓名與稱謂" required />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">聯絡電話/手機 *</label>
                       <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-magpie-primary focus:bg-white transition" placeholder="例如: 0912-345-678" required />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">電子信箱 Email *</label>
                       <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-magpie-primary focus:bg-white transition" placeholder="name@domain.com" required />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">詢問類別主題</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-magpie-primary focus:bg-white transition font-bold text-gray-700">
                       <option>我要獲得報價與初次驗證評估</option>
                       <option>我想了解教育訓練與企業包班</option>
                       <option>驗證機構轉移相關諮詢</option>
                       <option>意見反饋與顧客申訴</option>
                       <option>其他合作提案</option>
                    </select>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">需求詳細說明 *</label>
                    <textarea 
                      rows={5} 
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-magpie-primary focus:bg-white transition resize-none" 
                      placeholder="請具體描述您的需求或產品項目，以利人員加速為您處理..." required
                    ></textarea>
                 </div>
                 
                 <button type="submit" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-magpie-dark hover:bg-magpie-primary text-white px-10 py-4 font-bold rounded shadow-lg transition-colors">
                    <Send size={18} /> 送出表單
                 </button>
              </form>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
