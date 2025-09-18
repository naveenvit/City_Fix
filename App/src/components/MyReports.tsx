import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { myReports } from '../data/mockData';
import ReportCard from './ReportCard';

interface MyReportsProps {
  onBack: () => void;
}

const MyReports: React.FC<MyReportsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-center relative p-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="absolute left-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">My Reports</h1>
      </div>

      {/* Reports List */}
      <div className="divide-y divide-gray-100">
        {myReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default MyReports;
