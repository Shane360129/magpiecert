import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, KeyRound, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || '登入失敗');
      }
    } catch {
      setError('伺服器連線失敗，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 overflow-hidden font-sans">

      {/* Abstract Background Element */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-magpie-dark clip-path-slant z-0"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

           <div className="p-8 text-center bg-magpie-dark text-white border-b-4 border-magpie-accent">
               <Shield size={48} className="mx-auto mb-4 text-magpie-lighter" />
               <h1 className="text-2xl font-black tracking-widest">藍鵲驗證 後台系統</h1>
               <p className="text-magpie-light text-sm mt-2">Executive Internal Portal</p>
           </div>

           <div className="p-8">
             <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">管理員帳號 ID</label>
                   <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magpie-primary focus:bg-white transition"
                        placeholder="請輸入帳號"
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">密碼 PASSWORD</label>
                   <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magpie-primary focus:bg-white transition"
                        placeholder="請輸入密碼"
                      />
                   </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-magpie-primary hover:bg-magpie-hover text-white font-bold py-3 rounded-lg shadow-md transition-colors mt-4 disabled:opacity-50"
                >
                  {submitting ? '登入中...' : '安 全 登 入'}
                </button>
             </form>

             <div className="mt-8 text-center text-xs text-gray-400 font-medium">
                Protected by MagpieCert Security
             </div>
           </div>
        </div>

        <div className="text-center mt-6">
           <button onClick={() => navigate('/')} className="text-magpie-primary hover:text-magpie-dark font-bold text-sm transition-colors">
              ← 返回前台官網
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
