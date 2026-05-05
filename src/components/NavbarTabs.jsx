import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Bell, Settings } from 'lucide-react';

export default function NavbarTabs() {
  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Alerts', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-gray-800 z-50 pb-safe">
      <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-400'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium tracking-wide">{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
