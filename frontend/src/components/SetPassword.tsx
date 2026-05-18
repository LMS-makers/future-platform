import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Loader2, Lock, Eye, EyeOff, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { storage } from '../utils/storage';
import { getErrorMessage, validatePassword, validatePasswordMatch } from '../utils/errorHandling';
import { useTranslation } from 'react-i18next';

export default function SetPassword() {
  const { t } = useTranslation('auth');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ general?: string; password?: string; confirm?: string }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { setPassword } = useAuthStore();

  const nationalId = location.state?.nationalId || storage.getTempNationalId() || '';
  const accessToken = location.state?.accessToken || storage.getTempAccessToken() || '';

  if (!nationalId || !accessToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-text-tertiary mb-4">{t('invalidAccess', { ns: 'common' })}</p>
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            {t('goToLogin', { ns: 'common' })}
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setErrors({ password: passwordValidation.message });
      return;
    }

    const matchValidation = validatePasswordMatch(newPassword, confirmPassword);
    if (!matchValidation.isValid) {
      setErrors({ confirm: matchValidation.message });
      return;
    }

    setLoading(true);

    try {
      const response = await setPassword(newPassword, confirmPassword, accessToken);
      toast.success(t('passwordSetSuccess'));
      navigate('/login', {
        state: { nationalId, accessToken: response.accessToken },
      });
    } catch (err) {
      const message = getErrorMessage(err);
      setErrors({ general: message });
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-600 dark:to-indigo-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide">HICIT</h1>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl w-full p-8 shadow-xl border border-white/50 dark:border-slate-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-3">{t('setPassword')}</h2>
            <p className="text-text-tertiary text-sm leading-relaxed px-4">
              {t('welcomeSetPassword')}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="new-password">
                {t('newPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
                  <Lock size={18} />
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3.5 bg-input-bg border-border-input rounded-xl text-text-primary placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-200 sm:text-base font-medium"
                  id="new-password"
                  name="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder={t('enterNewPassword')}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary dark:hover:text-text-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="confirm-password">
                {t('confirmNewPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
                  <Lock size={18} />
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3.5 bg-input-bg border-border-input rounded-xl text-text-primary placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-200 sm:text-base font-medium"
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary dark:hover:text-text-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errors.general && (
              <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                {errors.general}
              </div>
            )}

            <div className="bg-slate-50/80 dark:bg-slate-700/30 rounded-xl p-5 mt-6 border-border">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Info className="text-blue-500 dark:text-blue-400" size={18} />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-text-primary mb-2">{t('passwordRequirements')}</h3>
                  <ul className="text-sm text-text-tertiary space-y-1 font-medium list-none">
                    <li>{t('minLength')}</li>
                    <li>{t('requireUppercaseAndSymbol')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-2 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg hover:shadow-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {t('setPassword')}
                    <ArrowLeft className="ml-2 text-sm rotate-180" size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-text-tertiary hover:text-text-primary dark:hover:text-text-primary font-medium inline-flex items-center gap-1"
            >
              <ArrowLeft className="rotate-180" size={16} />
              {t('backToLogin')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}