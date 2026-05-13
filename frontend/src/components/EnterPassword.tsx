import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Moon, Sun, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useAuthStore, getRedirectRoute } from '../store/authStore';
import { storage } from '../utils/storage';

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return 'User not found. Please return to admin.';
    }
    if (error.response?.status === 401) {
      return 'Invalid credentials. Please try again.';
    }
    return error.response?.data?.message || 'Something went wrong. Please try again.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

export default function EnterPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  
  const nationalId = location.state?.nationalId || storage.getTempNationalId() || '';
  const accessToken = location.state?.accessToken || storage.getTempAccessToken() || '';

  if (!nationalId || !accessToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-700/10 to-primary-400/20 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Invalid access. Please login first.</p>
          <Link to="/login" className="text-primary-700 font-semibold hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const user = await login(nationalId, password, accessToken);
      toast.success(`Welcome back, ${user.name}!`);
      const redirect = getRedirectRoute(user);
      navigate(redirect, { replace: true });
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 overflow-hidden relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[120%] bg-white/20 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[120%] bg-primary/5 rounded-full blur-3xl transform -rotate-12"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-[#C5CBE9] dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-brand-blue dark:text-white tracking-tighter mb-8 flex items-center gap-2">
              <GraduationCap className="w-8 h-8" />
              HICIT
            </h1>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Enter your password to access your account.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-2">
                National ID
              </label>
              <div className="relative">
                <input
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-none rounded-xl text-gray-800 dark:text-white font-medium"
                  type="text"
                  value={nationalId}
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                  <Lock size={20} />
                </span>
                <input
                  className="w-full pl-12 pr-12 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-none rounded-xl focus:ring-2 focus:ring-primary text-gray-800 dark:text-white font-medium"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <span className="material-symbols-outlined">visibility_off</span> : <span className="material-symbols-outlined">visibility</span>}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  checked
                  className="h-5 w-5 text-primary border-gray-300 dark:border-slate-600 rounded focus:ring-primary bg-white dark:bg-slate-700"
                  id="keep-signed-in"
                  type="checkbox"
                  disabled={loading}
                />
                <label className="ml-3 text-sm text-gray-600 dark:text-gray-400 font-medium" htmlFor="keep-signed-in">
                  Keep me signed in for 30 days
                </label>
              </div>
              <Link className="text-[11px] font-bold text-primary dark:text-blue-400 tracking-widest uppercase hover:underline" to="/reset-password">
                Forgot Password?
              </Link>
            </div>

            <button
              className="w-full bg-brand-blue hover:bg-blue-900 text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 text-xl" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <Link className="inline-flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900" to="/login">
              <ArrowRight className="mr-2 rotate-180" size={16} />
              Back to Login
            </Link>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-[#3C3D60] relative overflow-hidden flex-col items-center justify-center text-white">
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80">
            <div className="absolute top-20 right-10 text-right">
              <h3 className="text-5xl illustration-text font-light tracking-widest mb-2">Adaamc Wing</h3>
              <p className="text-3xl illustration-text">Safe work</p>
            </div>
            <div className="absolute bottom-0 left-0 w-3/4 h-2/3 flex items-end">
              <div className="w-full h-full relative">
                <div className="absolute bottom-[20%] left-10 w-[70%] h-2 bg-slate-500/30 rounded-full"></div>
                <div className="absolute bottom-[40%] left-10 w-[70%] h-2 bg-slate-500/30 rounded-full"></div>
                <div className="absolute bottom-[60%] left-10 w-[70%] h-2 bg-slate-500/30 rounded-full"></div>
                <div className="absolute bottom-[80%] left-10 w-[70%] h-2 bg-slate-500/30 rounded-full"></div>
                <div className="absolute bottom-0 left-10 w-2 h-[85%] bg-slate-500/40 rounded-full"></div>
                <div className="absolute bottom-0 left-[35%] w-2 h-[85%] bg-slate-500/40 rounded-full"></div>
                <div className="absolute bottom-0 left-[70%] w-2 h-[85%] bg-slate-500/40 rounded-full"></div>
                <div className="absolute bottom-[22%] left-12 w-4 h-16 bg-slate-400/20 rounded-sm"></div>
                <div className="absolute bottom-[22%] left-[4.5rem] w-4 h-20 bg-slate-400/40 rounded-sm"></div>
                <div className="absolute bottom-[22%] left-[6rem] w-4 h-14 bg-slate-400/30 rounded-sm"></div>
                <div className="absolute bottom-[42%] left-40 w-4 h-24 bg-slate-400/40 rounded-sm"></div>
                <div className="absolute bottom-[42%] left-46 w-4 h-20 bg-slate-400/20 rounded-sm"></div>
                <div className="absolute bottom-[42%] left-52 w-4 h-22 bg-slate-400/30 rounded-sm"></div>
                <div className="absolute bottom-[62%] left-12 w-4 h-20 bg-slate-400/30 rounded-sm"></div>
                <div className="absolute bottom-[62%] left-[4.5rem] w-4 h-16 bg-slate-400/20 rounded-sm"></div>
                <div className="absolute bottom-[62%] left-40 w-4 h-18 bg-slate-400/40 rounded-sm"></div>
              </div>
            </div>
            <div className="absolute bottom-10 right-0 w-1/2 h-1/2">
              <div className="relative w-full h-full flex items-end justify-end p-10">
                <div className="absolute bottom-24 right-16 w-32 h-24 bg-blue-400/20 rounded-lg border-2 border-white/10 flex items-center justify-center">
                  <div className="w-1/2 h-1 bg-white/20 rounded-full mb-2"></div>
                </div>
                <div className="absolute bottom-[88px] right-[108px] w-2 h-2 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-12 right-0 w-56 h-3 bg-[#E5A17A] rounded-l-full"></div>
                <div className="absolute bottom-0 right-48 w-3 h-12 bg-[#E5A17A] rounded-t-full"></div>
                <div className="absolute bottom-0 right-10 w-12 h-14 bg-slate-500/30 rounded-t-lg"></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 pointer-events-none"></div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex space-x-4">
        <button
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg text-gray-600 dark:text-gray-300 transition-colors"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          <Moon className="w-5 h-5 block dark:hidden" />
          <Sun className="w-5 h-5 hidden dark:block" />
        </button>
      </div>
    </div>
  );
}