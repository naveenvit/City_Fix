import React from 'react';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
  showVoting?: boolean;
  onVote?: (issueId: string) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, showVoting = false, onVote }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-sm text-gray-500">{issue.category}</span>
            <h3 className="text-lg font-bold text-gray-900">{issue.title}</h3>
            <span className="text-sm text-gray-500">
              {issue.address} · {issue.votes} votes
            </span>
          </div>
          
          {showVoting && (
            <button
              onClick={() => onVote?.(issue.id)}
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              I face this too 👍
            </button>
          )}
        </div>
        
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
