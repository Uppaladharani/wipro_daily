import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({ name: "", role: "Staff" });

  // Load data if editing
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass data back to parent
    onSave({ ...formData, id: user ? user.id : Date.now() });

    // Reset form
    setFormData({ name: "", role: "Staff" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <h2 className="text-lg font-semibold mb-4">
        {user ? "Edit User" : "Add New User"}
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          {user ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
