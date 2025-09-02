import React from "react";

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
      <label className="block mb-3">
        Change Password:
        <input
          type="password"
          placeholder="New password"
          className="ml-2 border rounded px-2 py-1"
        />
      </label>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Password
      </button>
    </div>
  );
};

export default AccountSettings;
