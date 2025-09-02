import React from "react";

const NotificationSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Notification Settings</h2>
      <label className="flex items-center mb-3">
        <input type="checkbox" className="mr-2" /> Email Alerts
      </label>
      <label className="flex items-center mb-3">
        <input type="checkbox" className="mr-2" /> SMS Alerts
      </label>
      <label className="flex items-center mb-3">
        <input type="checkbox" className="mr-2" /> Push Notifications
      </label>
    </div>
  );
};

export default NotificationSettings;
