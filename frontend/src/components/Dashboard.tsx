import { useAuthStore } from '../store/authStore';
import { LogOut, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#3C3D60] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8" />
          <span className="text-xl font-bold">HICIT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name || 'Admin'}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">This is the admin dashboard</p>
        </div>
      </div>
    </div>
  );
}