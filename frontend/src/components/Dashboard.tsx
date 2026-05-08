import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">this is a dashboard :)</h1>
      <Link to="/login" className="absolute top-4 right-4 text-primary-700 hover:underline">
        Logout
      </Link>
    </div>
  );
}