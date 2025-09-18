import React, { useState } from 'react';
import { X, Camera, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { notificationService } from '../services/notificationService';

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    address: '',
    image: null as File | null,
    location: null as { lat: number; lng: number } | null
  });
  const [locationError, setLocationError] = useState<string | null>(null);

  const categories = [
    'Roads',
    'Public Safety',
    'Community Improvement',
    'Drainage',
    'Streetlights',
    'Parks & Recreation',
    'Waste Management',
    'Other'
  ];

  const departmentAssignments = {
    'Roads': 'Public Works Department',
    'Drainage': 'Public Works Department',
    'Streetlights': 'Utilities Department',
    'Public Safety': 'Police Department',
    'Parks & Recreation': 'Parks Department',
    'Waste Management': 'Sanitation Department',
    'Community Improvement': 'Community Development',
    'Other': 'General Services'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const report = {
      id: Date.now().toString(),
      ...formData,
      votes: 1, // Start with 1 vote from the reporter
      status: 'Reported' as const,
      image: formData.image ? URL.createObjectURL(formData.image) : 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300.png?text=No+Image',
      reportedDate: new Date().toISOString().split('T')[0],
      expectedResolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      departmentAssigned: departmentAssignments[formData.category as keyof typeof departmentAssignments] || 'General Services'
    };

    onSubmit(report);

    // Create initial confirmation notification
    notificationService.addNotification({
      type: 'status_update',
      title: 'Report Submitted Successfully',
      message: `Your report "${formData.title}" has been submitted and will be reviewed shortly.`,
      reportId: report.id
    });

    // Simulate the notification flow for demo
    notificationService.simulateReportUpdates(report.id, formData.title);

    onClose();
    setFormData({
      title: '',
      category: '',
      description: '',
      address: '',
      image: null,
      location: null
    });
    setLocationError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const useCurrentLocation = () => {
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ 
            ...formData, 
            location: { lat: latitude, lng: longitude },
            address: `Current Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError('Geolocation is disabled. Please enter the address manually.');
          } else {
            setLocationError('Unable to get your current location. Please enter the address manually.');
          }
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Report Issue</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Large pothole on Main Street"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the issue in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address or location"
                />
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  title="Use current location"
                >
                  <MapPin size={20} />
                </button>
              </div>
              
              {locationError && (
                <p className="text-sm text-red-600">{locationError}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center text-gray-500 hover:text-gray-700"
              >
                <Camera size={24} className="mb-2" />
                <span className="text-sm">
                  {formData.image ? formData.image.name : 'Tap to add photo'}
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportForm;
