import { Link } from 'react-router-dom'

function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="bg-gradient-to-br from-navy-900 to-navy-700 text-white pt-32 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
        {sub && <p className="text-slate-300 text-lg">{sub}</p>}
      </div>
    </div>
  )
}

// ─── About ──────────────────────────────────────
const policies = [
  { title: '驗證品質政策', icon: '✅' },
  { title: '人才發展品質政策', icon: '👥' },
  { title: '公正性聲明', icon: '⚖️' },
  { title: '財務來源', icon: '💼' },
]

export function About() {
  return (
    <>
      <PageHeader title="關於我們" sub="About MBC" />
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="section-label">公司簡介</p>
              <h2 className="section-title">藍鵲 MBC</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                藍鵲 MBC 是台灣專業的驗證與教育訓練機構，長期致力於協助企業取得國際認證，建立完善的品質管理體系。
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                我們擁有豐富的業界實務經驗，提供客製化的驗證輔導與專業課程服務，陪伴企業從申請到取證的每一個關鍵步驟。
              </p>
              <p className="text-slate-500 leading-relaxed">
                秉持公正、專業、誠信的核心價值，我們持續精進服務品質，成為企業最值得信賴的驗證夥伴。
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl h-72 flex items-center justify-center text-slate-400">公司圖片（待更新）</div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-2xl font-bold text-navy-900 mb-8">政策聲明</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {policies.map((p) => (
                <div key={p.title} className="card p-6 text-center">
                  <div className="text-4xl mb-3">{p.icon}</div>
                  <h4 className="font-bold text-navy-900 text-sm">{p.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Recruit */}
          <div className="mt-20 bg-gradient-to-r from-navy-900 to-navy-700 rounded-3xl p-10 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">菁英招募</h3>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">加入藍鵲，與業界頂尖人才共同成長</p>
            <Link to="/contact" className="bg-white text-navy-800 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors inline-block">
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Service ────────────────────────────────────
const allServices = {
  quality: {
    label: '品質管理',
    color: 'blue',
    items: [
      { name: 'ISO 9001 品質管理系統', desc: '建立系統化的品質管理框架，提升組織效能與客戶滿意度。' },
      { name: 'ISO 14001 環境管理系統', desc: '協助企業建立環境管理體系，降低環境衝擊並達成永續目標。' },
      { name: 'ISO 45001 職業安全衛生管理', desc: '保障員工職業健康與安全，建立安全的工作環境。' },
      { name: 'ISO 22000 食品安全管理標準', desc: '食品供應鏈的全面安全管理，確保食品品質與安全。' },
      { name: 'ISO 27001 國際資安認證', desc: '建立資訊安全管理系統，保護企業重要資訊資產。' },
    ]
  },
  agriculture: {
    label: '農產品驗證',
    color: 'green',
    items: [
      { name: '產銷履歷農糧作物', desc: '農產品生產過程追溯管理，確保產品來源透明可靠。' },
      { name: '產銷履歷農糧加工物', desc: '農糧加工品的完整生產履歷記錄與驗證服務。' },
      { name: '產銷履歷農產品分裝/流通', desc: '農產品分裝與流通過程的完整追溯管理。' },
      { name: '產銷履歷蜂產品', desc: '蜂產品生產履歷驗證，確保品質與來源真實性。' },
      { name: '產銷履歷養殖水產品', desc: '水產養殖過程履歷管理，保障消費者食品安全。' },
      { name: '有機驗證農糧作物', desc: '符合有機農業規範的農糧作物驗證服務。' },
      { name: '有機驗證加工/分裝/流通', desc: '有機農產品加工與流通環節的完整驗證服務。' },
    ]
  },
  esg: {
    label: 'ESG 查驗',
    color: 'teal',
    items: [
      { name: 'ISO 14064-1 溫室氣體查驗', desc: '組織溫室氣體盤查與查驗，協助企業掌握碳排放數據。' },
      { name: 'ISO 14067 國際碳足跡標準', desc: '產品碳足跡計算與查驗，支援企業低碳轉型目標。' },
    ]
  }
}

export function Service() {
  return (
    <>
      <PageHeader title="服務項目" sub="Certification Services" />
      <section className="section bg-white">
        <div className="container mx-auto space-y-16">
          {Object.entries(allServices).map(([key, s]) => (
            <div key={key}>
              <div className="flex items-center gap-3 mb-8">
                <span className={`badge text-sm px-4 py-1.5 ${key === 'quality' ? 'badge-quality' : key === 'agriculture' ? 'badge-agri' : 'badge-esg'}`}>
                  {s.label}
                </span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {s.items.map((item) => (
                  <div key={item.name} className="card p-6">
                    <h3 className="font-bold text-navy-900 mb-2 text-sm">{item.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    <Link to="/contact" className="text-navy-700 text-xs font-medium mt-3 inline-block hover:underline">
                      索取報價 →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// ─── Certificate ────────────────────────────────
export function Certificate() {
  return (
    <>
      <PageHeader title="證書查詢" sub="Certificate Verification" />
      <section className="section bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-slate-50 rounded-3xl p-8 mb-10">
            <h3 className="font-bold text-navy-900 mb-6 text-lg">輸入查詢條件</h3>
            <div className="flex gap-3">
              <input className="input flex-1" placeholder="請輸入客戶名稱或證書編號..." />
              <button className="btn-primary px-6">查詢</button>
            </div>
          </div>
          <div className="text-center text-slate-400 py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p>請輸入查詢條件以搜尋證書資料</p>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Training ───────────────────────────────────
const sampleCourses = [
  { tag: 'quality', label: '品質管理', title: 'ISO 9001 品質管理系統內部稽核員', date: '2026-04-15', type: '實體課程', fee: 8000 },
  { tag: 'quality', label: '品質管理', title: 'ISO 14001 環境管理系統主導稽核員', date: '2026-04-28', type: '實體課程', fee: 9500 },
  { tag: 'agri', label: '農產品驗證', title: '產銷履歷驗證申請實務工作坊', date: '2026-04-22', type: '線上講座', fee: 3000 },
  { tag: 'esg', label: 'ESG 查驗', title: 'ISO 14064-1 溫室氣體盤查與查驗', date: '2026-05-06', type: '實體課程', fee: 12000 },
  { tag: 'quality', label: '品質管理', title: 'ISO 27001 資安管理系統導入實務', date: '2026-05-13', type: '實體課程', fee: 8500 },
  { tag: 'agri', label: '農產品驗證', title: '有機驗證申請與輔導說明', date: '2026-05-20', type: '線上講座', fee: 2500 },
]

export function Training() {
  return (
    <>
      <PageHeader title="教育訓練" sub="Training & Education" />
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 mb-10">
            {['全部', '品質管理', '農產品驗證', 'ESG查驗'].map((t) => (
              <button key={t} className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors
                ${t === '全部' ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((c, i) => (
              <div key={i} className="card overflow-hidden">
                <div className={`h-1.5 ${c.tag === 'quality' ? 'bg-blue-500' : c.tag === 'agri' ? 'bg-green-500' : 'bg-teal-500'}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge text-xs ${c.tag === 'quality' ? 'badge-quality' : c.tag === 'agri' ? 'badge-agri' : 'badge-esg'}`}>
                      {c.label}
                    </span>
                    <span className="text-xs text-slate-400">{c.type}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm leading-snug mb-4">{c.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>📅 {c.date}</span>
                    <span className="font-semibold text-navy-800">NT$ {c.fee.toLocaleString()}</span>
                  </div>
                  <Link to="/contact" className="btn-primary w-full justify-center py-2 text-xs">
                    立即報名
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-16 bg-gradient-to-r from-navy-900 to-navy-700 rounded-3xl p-10 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">企業包班</h3>
                <p className="text-slate-300">客製化課程方案，依企業需求調整內容與時程</p>
              </div>
              <Link to="/contact" className="bg-white text-navy-800 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap">
                洽詢包班
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Documents ──────────────────────────────────
const docCategories = ['品質管理', '農產品驗證', 'ESG查驗']
const sampleDocs = [
  { cat: '品質管理', name: 'ISO 9001:2015 申請說明文件', size: '2.3 MB' },
  { cat: '品質管理', name: 'ISO 14001 環境管理手冊範本', size: '1.8 MB' },
  { cat: '農產品驗證', name: '產銷履歷申請表格（農糧作物）', size: '890 KB' },
  { cat: '農產品驗證', name: '有機驗證申請流程說明', size: '1.2 MB' },
  { cat: 'ESG查驗', name: 'ISO 14064-1 溫室氣體盤查指引', size: '3.1 MB' },
  { cat: 'ESG查驗', name: '碳足跡計算工具使用手冊', size: '2.7 MB' },
]

export function Documents() {
  return (
    <>
      <PageHeader title="文件下載" sub="Document Downloads" />
      <section className="section bg-white">
        <div className="container mx-auto">
          {docCategories.map((cat) => (
            <div key={cat} className="mb-12">
              <h3 className="text-xl font-bold text-navy-900 mb-5 pb-3 border-b border-slate-100">{cat}</h3>
              <div className="space-y-3">
                {sampleDocs.filter(d => d.cat === cat).map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center text-sm font-bold">PDF</div>
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{doc.name}</div>
                        <div className="text-xs text-slate-400">{doc.size}</div>
                      </div>
                    </div>
                    <button className="text-navy-700 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      下載
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// ─── News ───────────────────────────────────────
const sampleNews = [
  { cat: '農產新知', title: '2026 年有機農業推廣補助計畫說明', date: '2026-03-01', summary: '農業部宣布新一輪有機農業補助計畫，鼓勵農民申請有機驗證...' },
  { cat: '新聞媒體', title: '藍鵲 MBC 榮獲年度最佳驗證機構獎', date: '2026-02-20', summary: '在業界評選中，藍鵲 MBC 以卓越的服務品質榮獲年度最佳驗證機構...' },
  { cat: '常見問題', title: 'ISO 27001 驗證申請流程常見 Q&A', date: '2026-02-10', summary: '整理客戶最常詢問的 ISO 27001 申請相關問題與解答...' },
  { cat: '農產新知', title: '碳足跡標示新規定：企業必知的 ESG 合規要點', date: '2026-01-28', summary: '政府最新碳足跡標示規定將於年底上路，提前了解合規重點...' },
]

export function News() {
  return (
    <>
      <PageHeader title="最新消息" sub="News & Updates" />
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 mb-10">
            {['全部', '農產新知', '新聞媒體', '常見問題'].map((t) => (
              <button key={t} className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors
                ${t === '全部' ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-5">
            {sampleNews.map((n, i) => (
              <div key={i} className="card p-6 flex gap-5 group cursor-pointer">
                <div className="w-24 h-24 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center text-slate-400 text-xs">圖片</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-agri text-xs">{n.cat}</span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1 group-hover:text-navy-700 transition-colors">{n.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{n.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Contact ────────────────────────────────────
export function Contact() {
  return (
    <>
      <PageHeader title="聯絡我們" sub="Contact Us" />
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex border-b border-slate-200 mb-8 gap-1">
                {['獲得報價', '意見反饋'].map((tab, i) => (
                  <button key={tab} className={`px-6 py-3 text-sm font-medium transition-colors
                    ${i === 0 ? 'border-b-2 border-navy-800 text-navy-800' : 'text-slate-500 hover:text-slate-700'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">姓名 *</label>
                    <input className="input" placeholder="您的姓名" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">公司名稱</label>
                    <input className="input" placeholder="您的公司" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                    <input className="input" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">電話</label>
                    <input className="input" placeholder="02-XXXX-XXXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">訊息內容 *</label>
                  <textarea className="input resize-none" rows={5} placeholder="請描述您的需求..." />
                </div>
                <button type="submit" className="btn-primary w-full py-3 text-base">
                  送出
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <h4 className="font-bold text-navy-900 mb-4">聯絡資訊</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span>📍</span><span>地址：（待填）</span></li>
                  <li className="flex gap-2"><span>📞</span><span>電話：（待填）</span></li>
                  <li className="flex gap-2"><span>✉️</span><span>Email：（待填）</span></li>
                  <li className="flex gap-2"><span>🕐</span><span>週一至週五 09:00–18:00</span></li>
                </ul>
              </div>
              <div className="bg-navy-50 rounded-2xl p-6">
                <h4 className="font-bold text-navy-900 mb-2">快速回應承諾</h4>
                <p className="text-slate-500 text-sm">我們將在 1–2 個工作天內與您聯繫，確保您的需求獲得妥善處理。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
