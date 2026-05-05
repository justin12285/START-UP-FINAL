import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RouteProvider } from './contexts/RouteContext';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavbarTabs from './components/NavbarTabs';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      {children}
      <NavbarTabs />
    </>
  );
}

function PublicOnlyRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/" />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <RouteProvider>
          <Routes>
            {/* Private Routes with Tabs */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            
            {/* Public Auth Routes */}
            <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
            <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
          </Routes>
        </RouteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
