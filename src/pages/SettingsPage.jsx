import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { userProfile, logout } = useAuth();
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
    <AnimatedPage>
      <div className="min-h-screen bg-background pb-24">
        <div className="w-full px-4 pt-12">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        
        <div className="space-y-6">
          <div className="bg-surface border border-gray-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Username</p>
                  <p className="text-white font-semibold">{userProfile?.username || 'User'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-white font-semibold">{userProfile?.email || 'email@example.com'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-gray-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-4">Preferences</h2>
            <div className="flex items-center gap-4 opacity-50">
              <div className="bg-gray-800 p-3 rounded-full">
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Default Passenger Type</p>
                <p className="text-xs text-gray-500">Feature coming soon</p>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-8"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </motion.button>
        </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
