import React from 'react';

interface StatusBadgeProps {
  status: 'Reported' | 'In Progress' | 'Resolved';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: { [key in StatusBadgeProps['status']]: string } = {
    Reported: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
