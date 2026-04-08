import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShieldCheck, GraduationCap, Download, Newspaper,
  Users, Info, LogOut, Menu, X, ChevronDown, ChevronRight,
  Home, FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  end?: boolean;
  children?: { label: string; path: string }[];
}

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['教育訓練管理']);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const navItems: NavItem[] = [
    { label: '控制台總覽', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: '首頁管理', path: '/admin/homepage', icon: <Home size={20} /> },
    { label: '關於我們管理', path: '/admin/about', icon: <Info size={20} /> },
    { label: '證書查詢管理', path: '/admin/certificates', icon: <ShieldCheck size={20} /> },
    {
      label: '教育訓練管理', icon: <GraduationCap size={20} />,
      children: [
        { label: '實體課程', path: '/admin/courses/physical' },
        { label: '線上講座', path: '/admin/courses/online' },
        { label: '知識影片', path: '/admin/courses/videos' },
        { label: '企業包班', path: '/admin/courses/corporate' },
      ]
    },
    { label: '文件下載管理', path: '/admin/downloads', icon: <Download size={20} /> },
    {
      label: '最新消息管理', icon: <Newspaper size={20} />,
      children: [
        { label: '農產新知', path: '/admin/news/agriculture' },
        { label: '新聞媒體', path: '/admin/news/media' },
        { label: '常見問題', path: '/admin/news/faq' },
      ]
    },
    { label: '菁英招募管理', path: '/admin/recruitment', icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-magpie-dark text-white w-64 transform transition-transform duration-300 z-50 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-white/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-cyan-400" />
            <span className="font-black tracking-widest text-base">內部管理系統</span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            if (item.children) {
              const isExpanded = expandedMenus.includes(item.label);
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {isExpanded && (
                    <div className="ml-9 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded text-sm transition-colors ${isActive ? 'bg-magpie-primary text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path!}
                end={item.path === '/admin/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${isActive ? 'bg-magpie-primary text-white font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 shrink-0">
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm">
            <FileText size={20} />
            前往官網
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>

        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-magpie-dark transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-bold text-magpie-dark text-lg hidden sm:block">藍鵲驗證 - 執行人員後台</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <span className="w-8 h-8 rounded-full bg-magpie-primary text-white flex items-center justify-center font-bold">{user?.name?.charAt(0) || 'A'}</span>
              {user?.name || '管理員'}
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 transition px-3 py-1.5 rounded hover:bg-red-50 font-bold text-sm">
              <LogOut size={16} /> 登出
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-6 md:p-8 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
