import React from "react";
import RoleBadge from "./RoleBadge";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="mt-6 bg-white shadow rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Role</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
