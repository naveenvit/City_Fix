import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Community from './components/Community';
import MyReports from './components/MyReports';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import ReportForm from './components/ReportForm';
import ChatBot from './components/ChatBot';

type ActiveScreen = 'home' | 'report' | 'community' | 'myReports' | 'notifications' | 'profile';

function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [showReportForm, setShowReportForm] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === 'report') {
      setShowReportForm(true);
    } else {
      setActiveScreen(tab as ActiveScreen);
    }
  };

  const handleReportIssue = () => {
    setShowReportForm(true);
  };

  const handleNewReport = (newReport: any) => {
    // Handle new report submission
    console.log('New report:', newReport);
    // You could add this to a state or send to backend
  };

  const showMyReports = () => {
    setActiveScreen('myReports');
  };

  const backToHome = () => {
    setActiveScreen('home');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Home onReportIssue={handleReportIssue} />;
      case 'community':
        return <Community onShowMyReports={showMyReports} />;
      case 'myReports':
        return <MyReports onBack={backToHome} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onReportIssue={handleReportIssue} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {renderScreen()}
      
      {/* Navigation - always visible except on My Reports */}
      {activeScreen !== 'myReports' && (
        <Navigation activeTab={activeScreen} onTabChange={handleTabChange} />
      )}

      {/* Report Form Modal */}
      <ReportForm
        isOpen={showReportForm}
        onClose={() => setShowReportForm(false)}
        onSubmit={handleNewReport}
      />

      {/* Chatbot - available on all screens */}
      <ChatBot />
    </div>
  );
}

export default App;
