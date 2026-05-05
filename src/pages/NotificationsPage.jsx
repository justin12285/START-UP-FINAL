import React from 'react';
import Announcements from '../components/Announcements';
import AnimatedPage from '../components/AnimatedPage';

export default function NotificationsPage() {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4 pt-12">
        <h1 className="text-3xl font-bold text-white mb-6">Notifications</h1>
        <Announcements />
      </div>
      </div>
    </AnimatedPage>
  );
}
