import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-green-600">EcoBin</Link>
            {user && (
              <nav className="hidden md:flex space-x-4">
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Dashboard</Link>
                    <Link to="/admin/bins" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Bins</Link>
                    <Link to="/admin/users" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Users</Link>
                    <Link to="/admin/redeems" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Redeem History</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Dashboard</Link>
                    <Link to="/add-waste" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Request Pickup</Link>
                    <Link to="/wallet" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Rewards</Link>
                    <Link to="/redeems" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Redeem History</Link>
                  </>
                )}
              </nav>
            )}
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
