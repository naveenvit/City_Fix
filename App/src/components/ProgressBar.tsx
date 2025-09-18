import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: 'Reported' | 'In Progress' | 'Resolved';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  const getProgressWidth = () => {
    if (status === 'Resolved') return 100;
    if (status === 'In Progress') return progress || 50; // Default to 50 if progress not specified
    return 0;
  };
  
  const color = status === 'Resolved' ? 'bg-green-500' : 'bg-blue-600';

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`${color} h-1.5 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${getProgressWidth()}%` }}
      />
    </div>
  );
};

export default ProgressBar;
