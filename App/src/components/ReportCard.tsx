import React from 'react';
import { Report } from '../types';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white p-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <StatusBadge status={report.status} />
          <h3 className="text-lg font-bold text-gray-900 mt-2">{report.title}</h3>
          <p className="text-sm text-gray-500">{report.category}</p>
        </div>
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={report.image}
            alt={report.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {(report.status === 'In Progress' || report.status === 'Resolved') && (
        <div className="mt-4">
          <ProgressBar 
            progress={report.progress || (report.status === 'Resolved' ? 100 : 0)} 
            status={report.status} 
          />
          {report.status === 'In Progress' && report.expectedResolution && (
            <p className="text-xs text-gray-500 mt-2">
              Expected Resolution: {report.expectedResolution}
            </p>
          )}
          {report.status === 'Resolved' && report.resolvedDate && (
            <p className="text-xs text-gray-500 mt-2">
              Resolved: {report.resolvedDate}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportCard;
