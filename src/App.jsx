import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RouteProvider } from './contexts/RouteContext';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavbarTabs from './components/NavbarTabs';
import SplashScreen from './components/SplashScreen';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  return (
    <>
      {children}
      <NavbarTabs />
    </>
  );
}

function PublicOnlyRoute({ children }) {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/" />;
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        
        {/* Public Routes */}
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <RouteProvider>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
          <div className="bg-background min-h-screen text-white sm:max-w-md sm:mx-auto sm:border-x sm:border-gray-800 sm:shadow-2xl relative overflow-hidden">
            <AnimatedRoutes />
          </div>
        </RouteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
