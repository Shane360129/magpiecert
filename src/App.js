import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
// Auth
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';
// Frontend Pages
import Home from './pages/frontend/Home';
import About from './pages/frontend/About';
import Services from './pages/frontend/Services';
import CertificateSearch from './pages/frontend/CertificateSearch';
import Education from './pages/frontend/Education';
import Downloads from './pages/frontend/Downloads';
import News from './pages/frontend/News';
import Contact from './pages/frontend/Contact';
// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Certificates from './pages/admin/Certificates';
import HomepageManage from './pages/admin/HomepageManage';
import AboutManage from './pages/admin/AboutManage';
import CourseManage from './pages/admin/CourseManage';
import DownloadManage from './pages/admin/DownloadManage';
import NewsManage from './pages/admin/NewsManage';
import RecruitmentManage from './pages/admin/RecruitmentManage';
// Scroll to top helper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};
const FrontLayout = () => (_jsxs("div", { className: "min-h-screen flex flex-col font-sans bg-white", children: [_jsx(ScrollToTop, {}), _jsx(Navbar, {}), _jsx("main", { className: "flex-1 mt-16 md:mt-20", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(FrontLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "about", element: _jsx(About, {}) }), _jsx(Route, { path: "services", element: _jsx(Services, {}) }), _jsx(Route, { path: "certificates", element: _jsx(CertificateSearch, {}) }), _jsx(Route, { path: "education", element: _jsx(Education, {}) }), _jsx(Route, { path: "downloads", element: _jsx(Downloads, {}) }), _jsx(Route, { path: "news", element: _jsx(News, {}) }), _jsx(Route, { path: "contact", element: _jsx(Contact, {}) })] }), _jsx(Route, { path: "/admin/login", element: _jsx(Login, {}) }), _jsxs(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(AdminLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "dashboard", replace: true }) }), _jsx(Route, { path: "dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "homepage", element: _jsx(HomepageManage, {}) }), _jsx(Route, { path: "about", element: _jsx(AboutManage, {}) }), _jsx(Route, { path: "certificates", element: _jsx(Certificates, {}) }), _jsx(Route, { path: "courses/:type", element: _jsx(CourseManage, {}) }), _jsx(Route, { path: "downloads", element: _jsx(DownloadManage, {}) }), _jsx(Route, { path: "news/:type", element: _jsx(NewsManage, {}) }), _jsx(Route, { path: "recruitment", element: _jsx(RecruitmentManage, {}) })] })] }) }) }));
}
export default App;
