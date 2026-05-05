import React, { useEffect, useState } from 'react';
import { AlertCircle, Bell } from 'lucide-react';
import { getAnnouncements } from '../services/firestore';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      // If Firestore is empty, provide some mock announcements
      if (data.length === 0) {
        setAnnouncements([
          {
            id: 'mock-1',
            title: 'Road Closure at JC Aquino Ave',
            message: 'Expect heavy traffic due to ongoing road repairs. Multicabs R4 and R5 are taking alternative routes.',
            createdAt: new Date()
          },
          {
            id: 'mock-2',
            title: 'New Tricycle Fare Matrix',
            message: 'Minimum fare is now P15.00 for the first 2 kilometers.',
            createdAt: new Date()
          }
        ]);
      } else {
        setAnnouncements(data);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  if (loading) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-2">
        <Bell className="w-4 h-4 text-primary animate-pulse" />
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Live Updates</h3>
      </div>
      
      <div className="space-y-3">
        {announcements.map((item) => (
          <div key={item.id} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3">
            <div className="mt-0.5">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="text-red-400 font-semibold text-sm">{item.title}</h4>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
