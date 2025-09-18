import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: 'Reported' | 'In Progress' | 'Resolved';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  const getProgressWidth = () => {
    if (status === 'Resolved') return 100;
    if (status === 'In Progress') return progress || 50;
    return 0;
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-gray-900 h-2 rounded-full transition-all duration-300"
        style={{ width: `${getProgressWidth()}%` }}
      />
    </div>
  );
};

export default ProgressBar;
