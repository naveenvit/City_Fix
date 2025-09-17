import React, { useState } from 'react';
import { ArrowLeft, Bell, MapPin, Shield, Moon, Globe, Trash2 } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    locationTracking: true,
    darkMode: false,
    language: 'en-GB',
    autoLocation: true,
    emergencyAlerts: true,
    reportUpdates: true,
    communityUpdates: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLanguageChange = (language: string) => {
    setSettings(prev => ({
      ...prev,
      language
    }));
  };

  const clearData = () => {
    if (confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
      localStorage.clear();
      alert('Local data cleared successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-center relative p-4 border-b border-gray-100 bg-white">
        <button
          onClick={onBack}
          className="absolute left-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-2">
        {/* Notifications Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell size={20} className="text-blue-600" />
              Notifications
            </h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notifications on your device</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive email updates about your reports</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Emergency Alerts</h3>
                <p className="text-sm text-gray-500">Get notified about emergency situations</p>
              </div>
              <button
                onClick={() => handleToggle('emergencyAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emergencyAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Report Updates</h3>
                <p className="text-sm text-gray-500">Get updates when your reports change status</p>
              </div>
              <button
                onClick={() => handleToggle('reportUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.reportUpdates ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.reportUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin size={20} className="text-green-600" />
              Location
            </h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Location Tracking</h3>
                <p className="text-sm text-gray-500">Allow app to access your location</p>
              </div>
              <button
                onClick={() => handleToggle('locationTracking')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.locationTracking ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.locationTracking ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Auto Location</h3>
                <p className="text-sm text-gray-500">Automatically detect location when reporting</p>
              </div>
              <button
                onClick={() => handleToggle('autoLocation')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoLocation ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoLocation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield size={20} className="text-purple-600" />
              Privacy & Security
            </h2>
          </div>
          
          <div className="p-4">
            <button
              onClick={clearData}
              className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
              <div className="text-left">
                <div className="font-medium">Clear Local Data</div>
                <div className="text-sm text-gray-500">Remove all cached data from device</div>
              </div>
            </button>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe size={20} className="text-orange-600" />
              App Preferences
            </h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">Use dark theme for the app</p>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">Language</h3>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en-GB">English (UK)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
