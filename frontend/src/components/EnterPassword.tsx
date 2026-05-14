import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Moon, Sun, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore, getRedirectRoute } from '../store/authStore';
import { storage } from '../utils/storage';
import { getErrorMessage } from '../utils/errorHandling';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Invalid access. Please start from login.</p>
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
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
      navigate(redirect);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-center relative overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/30 dark:hidden"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-4 sm:px-6 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-600 dark:to-indigo-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/25">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide">HICIT</h1>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl w-full p-8 shadow-xl border border-white/50 dark:border-slate-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Enter Password</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed px-4">
              Welcome back, {nationalId}. Please enter your password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3.5 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-200 sm:text-base font-medium"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <div className="pt-2 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 text-sm" size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 font-medium inline-flex items-center gap-1"
            >
              <ArrowRight className="rotate-180" size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </main>

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