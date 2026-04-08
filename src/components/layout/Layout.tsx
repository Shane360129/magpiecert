import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: '關於我們', href: '/about' },
  {
    label: '服務項目', href: '/service',
    children: [
      { label: '品質管理', href: '/service/quality' },
      { label: '農產品驗證', href: '/service/agriculture' },
      { label: 'ESG 查驗', href: '/service/esg' },
    ],
  },
  { label: '證書查詢', href: '/certificate' },
  {
    label: '教育訓練', href: '/training',
    children: [
      { label: '實體課程', href: '/training/courses' },
      { label: '線上講座', href: '/training/online' },
      { label: '知識影片', href: '/training/videos' },
      { label: '企業包班', href: '/training/enterprise' },
    ],
  },
  { label: '文件下載', href: '/documents' },
  { label: '最新消息', href: '/news' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const navBg = isHome
    ? scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    : 'bg-white shadow-sm'
  const textColor = isHome && !scrolled ? 'text-white' : 'text-slate-700'
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-navy-900'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-3 font-bold text-xl ${logoColor}`}>
            <div className="w-9 h-9 bg-navy-800 rounded-lg flex items-center justify-center text-white text-xs font-black">MBC</div>
            <span className="hidden sm:block">藍鵲 MBC</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <div key={item.href} className="relative group"
                onMouseEnter={() => setDropdown(item.href)}
                onMouseLeave={() => setDropdown(null)}>
                <Link to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg
                    hover:bg-white/10 hover:text-navy-800 transition-colors ${textColor}`}>
                  {item.label}
                  {item.children && (
                    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && dropdown === item.href && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                    {item.children.map((child) => (
                      <Link key={child.href} to={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-navy-50 hover:text-navy-800 transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden lg:block btn-primary py-2 px-5">
              獲得報價
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${textColor}`}>
              {mobileOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((item) => (
              <div key={item.href}>
                <Link to={item.href} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-navy-800 rounded-lg hover:bg-navy-50">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link key={child.href} to={child.href}
                    className="block pl-8 py-2 text-sm text-slate-500 hover:text-navy-700">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-2 pb-1">
              <Link to="/contact" className="btn-primary w-full justify-center">獲得報價</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-navy-600 rounded-lg flex items-center justify-center text-white text-xs font-black">MBC</div>
              <span className="text-white font-bold text-lg">藍鵲 MBC</span>
            </div>
            <p className="text-sm leading-relaxed">
              台灣專業驗證與教育訓練機構，協助企業取得國際認證，提升品質競爭力。
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">服務項目</h4>
            <ul className="space-y-2 text-sm">
              {['品質管理', '農產品驗證', 'ESG 查驗', '證書查詢'].map((t, i) => (
                <li key={i}><Link to="/service" className="hover:text-white transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">教育訓練</h4>
            <ul className="space-y-2 text-sm">
              {['實體課程', '線上講座', '知識影片', '企業包班'].map((t, i) => (
                <li key={i}><Link to="/training" className="hover:text-white transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">聯絡資訊</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 地址：（待填）</li>
              <li>📞 電話：（待填）</li>
              <li>✉️ Email：（待填）</li>
            </ul>
            <Link to="/contact" className="mt-4 btn-primary py-2 px-5 text-xs inline-flex">
              獲得報價
            </Link>
          </div>
        </div>
        <div className="border-t border-navy-800 mt-12 pt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} 藍鵲 MBC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
