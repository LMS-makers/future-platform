import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Lock, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuthStore, getRedirectRoute } from '../store/authStore';
import { storage } from '../utils/storage';

type LoginStep = 'nationalId' | 'password';

export default function LoginPage() {
  const { t } = useTranslation('auth');
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<LoginStep>('nationalId');
  const [accessToken, setAccessToken] = useState('');
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  
  const navigate = useNavigate();
  const { initLogin, login, isAuthenticated, user } = useAuthStore();

  function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return t('userNotFound');
      }
      if (error.response?.status === 401) {
        return t('invalidCredentials');
      }
      return error.response?.data?.message || t('genericError');
    }
    if (error instanceof Error) {
      return error.message;
    }
    return t('genericError');
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirect = getRedirectRoute(user);
      navigate(redirect, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleNationalIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationalId.trim()) {
      setError(t('pleaseEnterNationalId'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await initLogin(nationalId);

      if (data.requiresPasswordSetup) {
        navigate('/set-password', { 
          state: { 
            nationalId, 
            accessToken: data.accessToken 
          } 
        });
      } else {
        setAccessToken(data.accessToken);
        setStep('password');
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(t('pleaseEnterPassword'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await login(nationalId, password, accessToken);
      toast.success(t('loginSuccess', { name: user.name || user.email }));
      const redirect = getRedirectRoute(user);
      navigate(redirect, { replace: true });
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('nationalId');
    setPassword('');
    setError('');
    storage.removeTempAccessToken();
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/30 dark:hidden"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="dark:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-2 mb-6">
                <GraduationCap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400">{t('hicit')}</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t('welcomeBack')}</h2>
              <p className="text-text-tertiary text-base">{t('enterCredentials')}</p>
          </div>

          {step === 'nationalId' ? (
            <form className="space-y-5" onSubmit={handleNationalIdSubmit}>
              <div>
                <label className="block text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">{t('nationalId')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-input-bg border-border-input rounded-xl text-text-primary placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-200"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    disabled={loading}
                    placeholder={t('enterNationalId')}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      defaultChecked
                      className="sr-only peer"
                      id="keep-signed-in"
                      type="checkbox"
                      disabled={loading}
                    />
                    <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-500 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 peer-focus:ring-2 peer-focus:ring-blue-500/50"></div>
                    <svg className="absolute w-3 h-3 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-sm text-text-tertiary group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {t('rememberMe')}
                  </span>
                </label>
                <button 
                  type="button"
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  onClick={() => setShowForgotPopup(true)}
                >
                  {t('forgotPassword')}
                </button>
              </div>

              <button
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{t('continue')}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="block text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">{t('password')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-text-tertiary" />
                </div>
                <input
                  className="w-full pl-12 pr-12 py-3.5 bg-input-bg border-border-input rounded-xl text-text-primary placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-200"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder={t('enterPassword')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-text-tertiary hover:text-text-secondary dark:hover:text-text-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}

              <button
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{t('signIn')}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full text-text-tertiary hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium py-2 transition-colors"
              >
                {t('backToNationalId')}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-text-tertiary">
              {t('newToPlatform')}{' '}
              <a className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors" href="#">
                {t('requestAccess')}
              </a>
            </p>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 dark:opacity-90">
            <div className="absolute top-16 right-8 text-right">
              <h3 className="text-5xl font-light text-white dark:text-white/80 tracking-widest mb-2">{t('hicit')}</h3>
              <p className="text-2xl text-white/70 dark:text-white/60">{t('futurePlatform')}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-3/4 h-2/3 flex items-end">
              <div className="w-full h-full relative">
                <div className="absolute bottom-[20%] left-8 w-[70%] h-1.5 bg-white/20 dark:bg-white/10 rounded-full"></div>
                <div className="absolute bottom-[40%] left-8 w-[70%] h-1.5 bg-white/20 dark:bg-white/10 rounded-full"></div>
                <div className="absolute bottom-[60%] left-8 w-[70%] h-1.5 bg-white/20 dark:bg-white/10 rounded-full"></div>
                <div className="absolute bottom-[80%] left-8 w-[70%] h-1.5 bg-white/20 dark:bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-slate-900/50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 dark:hidden pointer-events-none"></div>
        </div>
      </div>

      {showForgotPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={() => setShowForgotPopup(false)}
          ></div>
          <div className="relative bg-surface-card rounded-2xl shadow-2xl p-8 max-w-sm w-full border-border">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{t('returnToAdmin')}</h3>
              <p className="text-text-tertiary mb-6">
                {t('contactAdmin')}
              </p>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                onClick={() => setShowForgotPopup(false)}
              >
                {t('ok')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}