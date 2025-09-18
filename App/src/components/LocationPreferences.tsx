import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Clock, Trash2 } from 'lucide-react';

interface LocationPreferencesProps {
  onBack: () => void;
}

interface SavedLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  lastUsed: Date;
}

const LocationPreferences: React.FC<LocationPreferencesProps> = ({ onBack }) => {
  const [currentLocation, setCurrentLocation] = useState<string>('Detecting location...');
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([
    {
      id: '1',
      name: 'Home',
      address: '123 Elm Street, Springfield',
      lat: 40.7128,
      lng: -74.0060,
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Oak Avenue, Springfield',
      lat: 40.7589,
      lng: -73.9851,
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode this to get address
          setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setIsDetecting(false);
        },
        (error) => {
          setCurrentLocation('Location access denied');
          setIsDetecting(false);
        }
      );
    } else {
      setCurrentLocation('Geolocation not supported');
      setIsDetecting(false);
    }
  };

  const deleteSavedLocation = (id: string) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const formatLastUsed = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
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
        <h1 className="text-lg font-bold text-gray-900">Location Preferences</h1>
      </div>

      <div className="space-y-4 p-4">
        {/* Current Location */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Navigation size={20} className="text-blue-600" />
            Current Location
          </h2>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-600">{currentLocation}</p>
              {isDetecting && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-600">Detecting location...</span>
                </div>
              )}
            </div>
            <button
              onClick={getCurrentLocation}
              disabled={isDetecting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Saved Locations */}
        <div className="bg-white rounded-lg border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin size={20} className="text-green-600" />
              Saved Locations
            </h2>
            <p className="text-sm text-gray-500 mt-1">Quickly access frequently used locations</p>
          </div>

          {savedLocations.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {savedLocations.map((location) => (
                <div key={location.id} className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.address}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">
                        Last used {formatLastUsed(location.lastUsed)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSavedLocation(location.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No saved locations yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Locations will be saved automatically when you report issues
              </p>
            </div>
          )}
        </div>

        {/* Location Settings */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Location Settings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">High Accuracy Mode</h3>
                <p className="text-sm text-gray-500">Use GPS for precise location detection</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Save Locations</h3>
                <p className="text-sm text-gray-500">Automatically save frequently used locations</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Location History</h3>
                <p className="text-sm text-gray-500">Keep history of reported locations</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Clear All Locations */}
        <button className="w-full bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
          <div className="flex items-center justify-center gap-2">
            <Trash2 size={20} />
            <span className="font-medium">Clear All Saved Locations</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LocationPreferences;
