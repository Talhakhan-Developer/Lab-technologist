import React, { useState } from 'react';

// Import your tab components (we’ll create placeholders below)
import UserDataEntry from './tabs/UserDataEntry';
import PendingReports from './tabs/PendingReports';
import RecentTests from './tabs/RecentTests';
import SettingsTab from './tabs/SettingsTab';
import Dashboard from './tabs/Dashboard';
const LabTabs = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },        // Analytics overview
    { id: 'UserDataEntry', label: 'Patient Registration', icon: '🩺' }, // Medical focus
    { id: 'PendingReports', label: 'Pending Reports', icon: '⏳' },     // Hourglass = waiting
    { id: 'RecentTests', label: 'Recent Activity', icon: '📋' },

  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'UserDataEntry':
        return <UserDataEntry />;
      case 'PendingReports':
        return <PendingReports />;
      case 'RecentTests':
        return <RecentTests />;
      default:
        return <UserDataEntry />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Tab Navigation */}
      {/* Tab Navigation */}
<div className="flex flex-wrap bg-white border-b border-gray-200">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium text-sm transition-colors duration-200 min-w-0
        ${
          activeTab === tab.id
            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
        }`}
    >
      <span>{tab.icon}</span>
      <span className="whitespace-nowrap">{tab.label}</span>
    </button>
  ))}
</div>

      {/* Tab Content Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default LabTabs;