import React, { useState } from 'react';
import { User, Award, Calendar, MapPin, Settings as SettingsIcon, LogOut } from 'lucide-react';
import Settings from './Settings';
import LocationPreferences from './LocationPreferences';

type ProfileScreen = 'main' | 'settings' | 'location';

const Profile: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<ProfileScreen>('main');

  const userStats = {
    reportsSubmitted: 12,
    issuesResolved: 8,
    communityVotes: 47,
    memberSince: '2024-01-15'
  };

  const badges = [
    { name: 'Community Helper', icon: '🤝', description: 'Voted on 25+ issues' },
    { name: 'Reporter', icon: '📋', description: 'Submitted 10+ reports' },
    { name: 'Local Hero', icon: '🏆', description: 'Helped resolve 5+ issues' }
  ];

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      // In a real app, this would clear authentication tokens
      localStorage.removeItem('user_session');
      alert('You have been signed out successfully');
    }
  };

  if (activeScreen === 'settings') {
    return <Settings onBack={() => setActiveScreen('main')} />;
  }

  if (activeScreen === 'location') {
    return <LocationPreferences onBack={() => setActiveScreen('main')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">Profile</h1>
        </div>

        {/* User Info */}
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">John Smith</h2>
              <p className="text-gray-500">john.smith@email.com</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  Member since January 2024
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {userStats.reportsSubmitted}
              </div>
              <div className="text-sm text-gray-500">Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userStats.issuesResolved}
              </div>
              <div className="text-sm text-gray-500">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {userStats.communityVotes}
              </div>
              <div className="text-sm text-gray-500">Votes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Badges</h3>
        <div className="space-y-3">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{badge.icon}</div>
              <div>
                <h4 className="font-medium text-gray-900">{badge.name}</h4>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white mt-2">
        <button 
          onClick={() => setActiveScreen('settings')}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors"
        >
          <SettingsIcon size={20} className="text-gray-600" />
          <span className="text-gray-900">Settings</span>
        </button>
        <button 
          onClick={() => setActiveScreen('location')}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors"
        >
          <MapPin size={20} className="text-gray-600" />
          <span className="text-gray-900">Location Preferences</span>
        </button>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
