import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      // Define the auth failure callback *before* loading the script
      (window as any).gm_authFailure = () => {
        setError('Map loading failed. This is likely because billing is not enabled for the associated Google Cloud project. Please enable billing to use the map.');
        setIsLoading(false);
      };

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!apiKey || apiKey.includes('YOUR_API_KEY')) {
        setError('Google Maps API key is missing. Please add a valid key to your .env file.');
        setIsLoading(false);
        return;
      }

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places', 'geocoding']
        });

        await loader.load();

        if (!mapRef.current) return;

        const defaultLocation = initialLocation || { lat: 40.7128, lng: -74.0060 }; // Default to NYC

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultLocation,
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const markerInstance = new google.maps.Marker({
          position: defaultLocation,
          map: mapInstance,
          draggable: true,
          title: 'Drag to select location'
        });

        const geocoderInstance = new google.maps.Geocoder();

        const handleGeocodeResult = (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus,
          location: { lat: number, lng: number }
        ) => {
          if (status === 'OK' && results && results[0]) {
            onLocationSelect({
              lat: location.lat,
              lng: location.lng,
              address: results[0].formatted_address
            });
          } else if (status === 'REQUEST_DENIED') {
            setError('Geocoding API is not enabled for this project. Please enable the "Geocoding API" in your Google Cloud Console.');
            setIsLoading(false);
          } else {
            console.warn('Geocoding failed due to: ' + status);
          }
        };

        // Get initial address
        geocoderInstance.geocode(
          { location: defaultLocation },
          (results, status) => handleGeocodeResult(results, status, defaultLocation)
        );

        // Handle marker drag
        markerInstance.addListener('dragend', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            geocoderInstance.geocode(
              { location },
              (results, status) => handleGeocodeResult(results, status, location)
            );
          }
        });

        // Handle map click
        mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            markerInstance.setPosition(location);
            geocoderInstance.geocode(
              { location },
              (results, status) => handleGeocodeResult(results, status, location)
            );
          }
        });

        setMap(mapInstance);
        setMarker(markerInstance);
        setGeocoder(geocoderInstance);
        setIsLoading(false);

      } catch (err) {
        console.error('Error loading Google Maps:', err);
        // This will catch network errors or if the loader itself fails.
        if (!error) { // Don't overwrite a more specific error from gm_authFailure
            setError('Failed to load the Google Maps script. Please check your network connection.');
        }
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup the global function on component unmount
    return () => {
      delete (window as any).gm_authFailure;
    };
  }, [initialLocation, onLocationSelect]);


  if (error) {
    return (
      <div className="h-64 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-700 font-semibold mb-2">Map Configuration Error</p>
          <p className="text-sm text-red-600">
            {error}
          </p>
          <p className="text-xs text-gray-500 mt-4">
            To fix this, please check your Google Cloud Console settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Loading map...</span>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="h-64 w-full rounded-lg" />
      
      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded text-xs text-gray-600 text-center">
        📍 Drag the marker or click on the map to select a location
      </div>
    </div>
  );
};

export default GoogleMapPicker;
