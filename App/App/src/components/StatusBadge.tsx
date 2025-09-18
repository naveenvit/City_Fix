import React from 'react';

interface StatusBadgeProps {
  status: 'Reported' | 'In Progress' | 'Resolved';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Reported':
        return 'text-gray-700';
      case 'In Progress':
        return 'text-gray-700';
      case 'Resolved':
        return 'text-gray-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <span className={`text-sm font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
