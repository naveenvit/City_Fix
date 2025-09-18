import React from 'react';
import { Report } from '../types';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <StatusBadge status={report.status} />
          <h3 className="text-lg font-bold text-gray-900 mt-1">{report.title}</h3>
          <p className="text-sm text-gray-500">{report.category}</p>
        </div>
        <div className="w-16 h-16 rounded-lg overflow-hidden ml-4">
          <img
            src={report.image}
            alt={report.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <button className="text-sm text-gray-700 mb-4 hover:text-gray-900">
        View
      </button>

      {report.status === 'In Progress' && (
        <div className="mb-4">
          <ProgressBar progress={report.progress || 0} status={report.status} />
          {report.expectedResolution && (
            <p className="text-sm text-gray-500 mt-2">
              Expected Resolution: {report.expectedResolution}
            </p>
          )}
        </div>
      )}

      {report.status === 'Resolved' && (
        <div className="mb-4">
          <ProgressBar progress={100} status={report.status} />
          {report.resolvedDate && (
            <p className="text-sm text-gray-500 mt-2">
              Resolved: {report.resolvedDate}
            </p>
          )}
        </div>
      )}

      {report.status === 'Reported' && report.expectedResolution && (
        <p className="text-sm text-gray-500">
          Expected Resolution: {report.expectedResolution}
        </p>
      )}
    </div>
  );
};

export default ReportCard;
