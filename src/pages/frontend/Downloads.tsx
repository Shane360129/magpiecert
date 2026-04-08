import React, { useState, useEffect } from 'react';
import { FileDown, FileText, Download } from 'lucide-react';
import { downloadsApi } from '../../services/api';

const Downloads: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await downloadsApi.getAll();
        setFiles(data);
      } catch (err) {
        console.error('Failed to fetch downloads:', err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  // Group files by category
  const grouped = files.reduce((acc: Record<string, any[]>, file) => {
    const cat = file.category || '其他';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(file);
    return acc;
  }, {});

  const categoryOrder = ['品質管理', '農產品驗證', 'ESG查驗', '其他'];
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <div className="min-h-screen bg-grid-pattern pb-24">
      {/* Page Header */}
      <div className="bg-magpie-dark py-20 text-center text-white relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" style={{ backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" }}></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-wide">文件下載</h1>
          <div className="w-16 h-1 bg-magpie-accent mx-auto mb-4"></div>
          <p className="text-lg text-magpie-lighter">提供最新版本的規範指南與申請表單供民眾下載</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-12">
        {loading ? (
          <div className="text-center py-16 text-gray-400">載入中...</div>
        ) : sortedCategories.length === 0 ? (
          <div className="text-center py-16 text-gray-400">目前尚無下載文件</div>
        ) : (
          <div className="space-y-12">
            {sortedCategories.map((catName) => (
               <div key={catName} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="bg-gray-50 px-8 py-5 border-b border-gray-100 flex items-center gap-3">
                     <FileDown className="text-magpie-primary" size={24} />
                     <h2 className="text-xl font-bold text-magpie-dark tracking-wide">{catName}</h2>
                  </div>

                  <div className="divide-y divide-gray-50">
                     {grouped[catName].map((file: any) => (
                        <div key={file.id} className="px-8 py-5 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-magpie-lighter/30 transition-colors group">
                           <div className="flex items-center gap-4 mb-4 sm:mb-0">
                              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${(file.format || 'PDF') === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                 <FileText size={24} />
                              </div>
                              <div>
                                 <h3 className="font-bold text-lg text-gray-800 group-hover:text-magpie-primary transition-colors">{file.name}</h3>
                                 <p className="text-sm text-gray-400 font-medium">{file.format || 'PDF'} 格式 {file.size ? `‧ 大小 ${file.size}` : ''}</p>
                              </div>
                           </div>
                           <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:border-magpie-primary text-gray-700 hover:text-magpie-primary hover:bg-magpie-lighter rounded font-bold transition-all shadow-sm">
                              <Download size={18} /> 點擊下載
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
            <h4 className="font-bold text-xl text-gray-800 mb-4">找不到您需要的文件嗎？</h4>
            <p className="text-gray-500 mb-6">如需申請特定的舊版文件或索取紙本文件，請聯繫我們的客服窗口。</p>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
