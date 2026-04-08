import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import { certificatesApi } from '../../services/api';

const CertificateSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const allCerts = await certificatesApi.getAll();
      const found = allCerts.find((c: any) =>
        c.id?.includes(searchTerm) ||
        c.name?.includes(searchTerm)
      );
      setResult(found || null);
    } catch (err) {
      console.error('Failed to search certificates:', err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Page Header */}
      <div className="bg-magpie-dark py-20 text-center text-white relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" style={{ backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" }}></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-wide">證書查詢</h1>
          <div className="w-16 h-1 bg-magpie-accent mx-auto mb-4"></div>
          <p className="text-lg text-magpie-lighter">確保品質，公開透明的認證狀態引擎</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-[-3rem] relative z-20">

        {/* Search Engine Box */}
        <div className="bg-white rounded-xl shadow-xl p-8 border-t-8 border-magpie-primary">
          <h2 className="text-2xl font-bold text-magpie-dark mb-6 text-center">搜尋狀態與資料列</h2>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setHasSearched(false); }}
                className="w-full pl-6 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-magpie-primary focus:bg-white transition font-medium"
                placeholder="請輸入客戶名稱或證書編碼..."
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-magpie-primary hover:bg-magpie-hover text-white px-10 py-4 rounded-lg font-bold text-lg shadow-md transition-all hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? '查詢中...' : '立即查詢'}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            輸入客戶名稱或證書編碼進行查詢
          </p>
        </div>

        {/* Results Area */}
        {hasSearched && !loading && (
          <div className="mt-12 animate-fade-in-up">
            {result ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className={`p-4 text-center text-white flex justify-center items-center gap-2 font-bold text-lg ${result.status === 'active' ? 'bg-green-500' : result.status === 'expired' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  <ShieldCheck size={28} />
                  該證書目前處於【{result.status === 'active' ? '有效' : result.status === 'expired' ? '終止' : '審核中'}】狀態
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                     <div>
                       <span className="block text-gray-500 text-sm mb-1 uppercase tracking-wider">證書編碼 Certificate ID</span>
                       <span className="font-mono font-bold text-xl text-magpie-dark">{result.id?.slice(0, 12)}</span>
                     </div>
                     <div>
                       <span className="block text-gray-500 text-sm mb-1 uppercase tracking-wider">客戶名稱 Client Name</span>
                       <span className="font-bold text-xl text-magpie-dark">{result.name}</span>
                     </div>
                     <div>
                       <span className="block text-gray-500 text-sm mb-1 uppercase tracking-wider">驗證類別 Standard</span>
                       <span className="font-medium text-lg text-gray-800">{result.type}</span>
                     </div>
                     <div>
                       <span className="block text-gray-500 text-sm mb-1 uppercase tracking-wider">核發日期 Issue Date</span>
                       <span className="font-medium text-lg text-gray-800">{result.issueDate}</span>
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500 flex flex-col items-center">
                 <ShieldAlert size={64} className="text-gray-300 mb-6" />
                 <h3 className="text-2xl font-bold text-gray-700 mb-2">查無匹配的證書紀錄</h3>
                 <p className="text-gray-500 max-w-md mx-auto">
                   系統中沒有找到符合 "{searchTerm}" 的公開紀錄。請確認您輸入的編號或全銜是否正確無誤。
                 </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateSearch;
