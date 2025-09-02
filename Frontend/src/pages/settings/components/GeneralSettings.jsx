import React from "react";

const GeneralSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">General Settings</h2>
      <label className="block mb-3">
        Company Name:
        <input
          type="text"
          placeholder="Enter company name"
          className="ml-2 border rounded px-2 py-1"
        />
      </label>
      <label className="block mb-3">
        Default Currency:
        <select className="ml-2 border rounded px-2 py-1">
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>
      </label>
    </div>
  );
};

export default GeneralSettings;
