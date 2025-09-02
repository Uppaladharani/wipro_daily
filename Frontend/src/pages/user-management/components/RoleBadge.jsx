import React from "react";

const roleStyles = {
  Admin: "bg-red-100 text-red-600",
  Manager: "bg-yellow-100 text-yellow-600",
  Staff: "bg-green-100 text-green-600",
};

const RoleBadge = ({ role }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${roleStyles[role] || "bg-gray-100 text-gray-600"}`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
