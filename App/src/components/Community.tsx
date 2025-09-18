import React from 'react';
import { Plus, Menu } from 'lucide-react';
import IssueCard from './IssueCard';
import ChatBot from './ChatBot';
import { Issue } from '../types';

interface CommunityProps {
  issues: Issue[];
  onVote: (issueId: string) => void;
  onShowMyReports: () => void;
  onReportIssue: () => void;
}

const Community: React.FC<CommunityProps> = ({ issues, onVote, onShowMyReports, onReportIssue }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onShowMyReports}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Community</h1>
        </div>
        <button 
          onClick={onReportIssue}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Plus size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative mx-4 mb-6">
        <div className="h-56 rounded-lg overflow-hidden bg-gradient-to-t from-black/40 to-transparent">
          <img
            src="https://s3-alpha-sig-oac.figma.com/img/ef00/2a5c/a82bc387e77cfe7f1baa34490ec67765?Expires=1759104000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TEloBqEzQYNIMJ8pXJCxYzisibJIomuwz4IkHaURZT8Wbih5j--EKH66xyL7pTC-I2eJl~B7LkM6CQ82tE2nkSY5FPpYP~6qrzTMfRBWVJKGcpYxS9M8s5u1-wOH2hgbVwljMF8E9zXtoL~4TJ4Ly5c5ZK8Jz9ngzk~u0lRBu4y0W~v7gs77cY~QZgJbw5fL0Paf3mu9Vi~6YkgXGnUWWU0~53DLqP~a0bRTqjCRCGs0IuubrmBKQdNxpFpUQdaQgEhkRMghZjWmhEPmAUtx0YyEnWodqh9Y-wS8LiWBw99Yj7zXAAc7JmQVF87UhWBGOGLQM8vfvT9NmNmsWqpwFg__"
            alt="Issue of the Week"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="mb-1">
            <span className="text-2xl font-bold">Issue of the Week</span>
          </div>
          <span className="text-lg font-medium">Pothole on Elm Street</span>
        </div>
      </div>

      {/* Top Issues Section */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Top Issues</h2>
        <div className="space-y-4">
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              showVoting={true}
              onVote={onVote}
            />
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Community;
