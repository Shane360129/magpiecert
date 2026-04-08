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

const FrontLayout = () => (
  <div className="min-h-screen flex flex-col font-sans bg-white">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1 mt-16 md:mt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="certificates" element={<CertificateSearch />} />
            <Route path="education" element={<Education />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Backend Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="homepage" element={<HomepageManage />} />
            <Route path="about" element={<AboutManage />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="courses/:type" element={<CourseManage />} />
            <Route path="downloads" element={<DownloadManage />} />
            <Route path="news/:type" element={<NewsManage />} />
            <Route path="recruitment" element={<RecruitmentManage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
