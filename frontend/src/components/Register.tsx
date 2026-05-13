import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Loader2, User, Mail, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import authApi from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (!nationalId.trim()) {
      setError('Please enter a National ID');
      return;
    }

    setLoading(true);

    try {
      await authApi.register({
        name: name.trim(),
        nationalId: nationalId.trim(),
        role,
      });
      toast.success('User created successfully!');
      setName('');
      setNationalId('');
      setRole('user');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create user. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Create User</h2>
            <p className="text-gray-600 text-sm leading-relaxed px-4">
              Create a new user account for the platform.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  className="block w-full pl-10 py-3 bg-white/90 border border-transparent rounded-xl text-gray-900 focus:ring-2 focus:ring-[#3b5998] focus:border-transparent sm:text-lg font-medium"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="nationalId">
                National ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input
                  className="block w-full pl-10 py-3 bg-white/90 border border-transparent rounded-xl text-gray-900 focus:ring-2 focus:ring-[#3b5998] focus:border-transparent sm:text-lg font-medium"
                  id="nationalId"
                  name="nationalId"
                  type="text"
                  placeholder="Enter national ID"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="role">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Shield size={16} />
                </div>
                <select
                  className="block w-full pl-10 py-3 bg-white/90 border border-transparent rounded-xl text-gray-900 focus:ring-2 focus:ring-[#3b5998] focus:border-transparent sm:text-lg font-medium"
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                  disabled={loading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="pt-2 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-semibold text-white bg-[#4262a8] hover:bg-[#344d85] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4262a8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create User
                    <ArrowLeft className="ml-2 text-sm rotate-180" size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 flex gap-4">
          <Link className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors" to="/dashboard">
            <ArrowLeft className="mr-2" size={16} />
            Back to Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}