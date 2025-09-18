import React, { useState, useEffect } from 'react';
import { Home, Users, PlusCircle, Bell, User } from 'lucide-react';
import { notificationService } from '../services/notificationService';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notifications) => {
      setUnreadCount(notifications.filter(n => !n.read).length);
    });

    return unsubscribe;
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'report', label: 'Report', icon: PlusCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ id, label, icon: Icon }) => {
          if (id === 'report') {
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className="relative -top-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-300"
                aria-label="Report an issue"
              >
                <Icon size={30} />
              </button>
            );
          }
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 gap-1 relative ${
                activeTab === id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{label}</span>
              
              {id === 'notifications' && unreadCount > 0 && (
                <div className="absolute top-1 right-1/2 translate-x-4 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
