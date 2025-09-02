import React, { useState } from "react";
import GeneralSettings from "./components/GeneralSettings";
import NotificationSettings from "./components/NotificationSettings";
import AccountSettings from "./components/AccountSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTab = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "account":
        return <AccountSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded ${
            activeTab === "general" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded ${
            activeTab === "notifications"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("account")}
          className={`px-4 py-2 rounded ${
            activeTab === "account" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Account
        </button>
      </div>

      {/* Active tab content */}
      <div className="border rounded-lg p-4 bg-white shadow">
        {renderTab()}
      </div>
    </div>
  );
};

export default Settings;
