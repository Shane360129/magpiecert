import { Link } from 'react-router-dom'

const services = [
  { icon: '✅', label: '品質管理', href: '/service/quality', color: 'bg-blue-50 text-blue-600', desc: 'ISO 9001 / 14001 / 45001 / 22000 / 27001' },
  { icon: '🌾', label: '農產品驗證', href: '/service/agriculture', color: 'bg-green-50 text-green-600', desc: '產銷履歷・有機驗證・多元農產認證' },
  { icon: '♻️', label: 'ESG 查驗', href: '/service/esg', color: 'bg-teal-50 text-teal-600', desc: 'ISO 14064-1 溫室氣體・ISO 14067 碳足跡' },
]

const advantages = [
  { icon: '🏆', title: '豐富驗證經驗', desc: '多年業界實務，深獲國內外客戶信賴' },
  { icon: '🔬', title: '嚴謹驗證流程', desc: '依據國際標準執行，確保驗證公正性' },
  { icon: '👨‍🏫', title: '頂尖師資陣容', desc: '業界資深講師，課程緊扣實務應用' },
  { icon: '🌐', title: '多元服務範疇', desc: '品質管理、農產品、ESG 全方位覆蓋' },
]

const courses = [
  { tag: 'quality', label: '品質管理', title: 'ISO 9001 品質管理系統內部稽核員課程', date: '2026-04-15', type: '實體課程' },
  { tag: 'agri', label: '農產品驗證', title: '產銷履歷驗證申請實務工作坊', date: '2026-04-22', type: '線上講座' },
  { tag: 'esg', label: 'ESG 查驗', title: 'ISO 14064-1 溫室氣體盤查與查驗', date: '2026-05-06', type: '實體課程' },
]

const stats = [
  { value: '500+', label: '服務客戶' },
  { value: '15+', label: '年驗證經驗' },
  { value: '20+', label: '認證項目' },
  { value: '98%', label: '客戶滿意度' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-navy-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-jade-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />

        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-jade-400 text-sm font-semibold px-4 py-2 rounded-full mb-6 fade-up-1">
              <span className="w-2 h-2 bg-jade-400 rounded-full animate-pulse" />
              Taiwan's Leading Certification Body
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6 fade-up-2">
              專業驗證<br />
              <span className="text-jade-400">成就卓越</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl fade-up-3">
              提供 ISO 系列認證、農產品驗證、ESG 查驗及教育訓練，協助台灣企業邁向國際。
            </p>
            <div className="flex flex-wrap gap-4 fade-up-4">
              <Link to="/service" className="btn-primary text-base px-8 py-4 bg-jade-500 hover:bg-jade-600 border-0">
                探索服務
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">
                獲得報價
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 inset-x-0 bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="px-6 py-5 text-center">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="section-label">Our Services</p>
            <h2 className="section-title">服務項目</h2>
            <p className="section-desc max-w-xl mx-auto">涵蓋品質管理、農產品驗證與 ESG 查驗，提供企業全方位驗證解決方案</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.label} to={s.href} className="card p-8 group block">
                <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">
                  {s.label}
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{s.desc}</p>
                <span className="text-navy-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  了解詳情
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">About MBC</p>
              <h2 className="section-title">關於藍鵲</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                藍鵲 MBC 是台灣專業的驗證與教育訓練機構，致力於協助企業取得國際認證，強化品質管理體系，在全球競爭市場中脫穎而出。
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                我們擁有豐富的業界實務經驗，提供客製化的驗證輔導與課程服務，陪伴企業從申請到取證的每一個關鍵步驟。
              </p>
              <Link to="/about" className="btn-outline">了解更多</Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-navy-50 to-jade-400/10 rounded-3xl p-10 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4">🏢</div>
                  <p className="text-slate-500 text-sm">公司實景圖（待更新）</p>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-jade-500 rounded-xl flex items-center justify-center text-white text-xl">✓</div>
                <div>
                  <div className="font-bold text-navy-900 text-sm">ISO 認可驗證機構</div>
                  <div className="text-xs text-slate-500">國際認可・公正驗證</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section bg-navy-900">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-jade-400 font-semibold text-sm tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">我們的優勢</h2>
            <p className="text-slate-400 text-lg">選擇藍鵲，選擇值得信賴的驗證夥伴</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="bg-navy-800/60 rounded-2xl p-6 border border-navy-700/50 hover:bg-navy-700/60 transition-colors">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="text-white font-bold mb-2">{a.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Courses */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Education</p>
              <h2 className="section-title mb-0">最新課程</h2>
            </div>
            <Link to="/training" className="btn-ghost text-sm hidden md:flex">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div key={c.title} className="card overflow-hidden">
                <div className={`h-2 ${c.tag === 'quality' ? 'bg-blue-500' : c.tag === 'agri' ? 'bg-green-500' : 'bg-teal-500'}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge ${c.tag === 'quality' ? 'badge-quality' : c.tag === 'agri' ? 'badge-agri' : 'badge-esg'}`}>
                      {c.label}
                    </span>
                    <span className="text-xs text-slate-400">{c.type}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm leading-snug mb-3">{c.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">📅 {c.date}</span>
                    <Link to="/training" className="text-navy-700 text-xs font-medium hover:underline">報名 →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/training" className="btn-outline">查看所有課程</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-jade-500 to-jade-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">準備好提升競爭力了嗎？</h2>
          <p className="text-jade-100 text-lg mb-10 max-w-xl mx-auto">
            立即聯絡我們，取得專屬驗證解決方案與課程報價
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-white text-jade-700 font-bold px-10 py-4 rounded-lg hover:bg-jade-50 transition-colors">
              獲得報價
            </Link>
            <Link to="/certificate" className="border-2 border-white/50 text-white font-medium px-10 py-4 rounded-lg hover:bg-white/10 transition-colors">
              查詢證書
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
