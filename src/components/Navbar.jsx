import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Map, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary p-2 rounded-xl">
              <Map className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">transee</span>
          </div>

          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
                <div className="bg-gray-700 rounded-full p-1">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-200">
                  {userProfile?.username || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
