import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", role: "Admin" },
    { id: 2, name: "Bob Smith", role: "Manager" },
    { id: 3, name: "Charlie Brown", role: "Staff" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Add or Update user
  const handleSaveUser = (user) => {
    if (selectedUser) {
      // Update existing
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add new
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = { ...user, id: newId };
      setUsers([...users, newUser]);
    }
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>

      {/* User List */}
      <UserList
        users={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteUser}
      />

      {/* Modal for Add/Edit User */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <UserForm user={selectedUser} onSave={handleSaveUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
