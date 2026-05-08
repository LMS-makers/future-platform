import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, History, Eye, EyeOff, ArrowLeft, GraduationCap, Info } from 'lucide-react';

export default function SetPassword() {
  const [newPassword, setNewPassword] = useState('........');
  const [confirmPassword, setConfirmPassword] = useState('........');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const nationalId = location.state?.nationalId || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700/10 to-primary-400/20 flex flex-col items-center justify-center relative overflow-hidden overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[80%] h-[120%] bg-primary-50 opacity-40 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-0 right-[-10%] w-[60%] h-[100%] bg-neutral-300 opacity-50 transform -rotate-12 translate-y-1/4 translate-x-1/4 rounded-tl-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-4 sm:px-6 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#3b5998] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#1a56db] tracking-wide">HICIT</h1>
        </div>

        <div className="bg-[#c4d0ec] rounded-3xl w-full p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Set Password</h2>
            <p className="text-gray-600 text-sm leading-relaxed px-4">
              {nationalId ? `Welcome, ${nationalId}. Please set your password to secure your account.` : 'Please set your password to secure your account.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="new-password">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3 bg-white/90 border border-transparent rounded-xl text-gray-900 focus:ring-2 focus:ring-[#3b5998] focus:border-transparent sm:text-lg tracking-[0.3em] font-black placeholder-gray-400"
                  id="new-password"
                  name="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="........"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <History size={16} />
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3 bg-white/90 border border-transparent rounded-xl text-gray-900 focus:ring-2 focus:ring-[#3b5998] focus:border-transparent sm:text-lg tracking-[0.3em] font-black placeholder-gray-400"
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="........"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div className="bg-white/95 rounded-xl p-5 mt-6 border border-white/50 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Info className="text-gray-500" size={16} />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Password requirements:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-medium list-none">
                    <li>Must be at least 8 characters long.</li>
                    <li>Must include at least one uppercase letter and one symbol.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-2 mt-6">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-semibold text-white bg-[#4262a8] hover:bg-[#344d85] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4262a8] transition-colors duration-200"
              >
                Set Password
                <ArrowLeft className="ml-2 text-sm rotate-180" size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors" to="/login">
            <ArrowLeft className="mr-2" size={16} />
            Back to Login
          </Link>
        </div>
      </main>
    </div>
  );
}