import React from "react";

const CheckBox = ({ checked = false, handleToggle }) => {
  return (
    <td className="px-4 py-2 border border-gray-300">
      <input
        id="disabled-first"
        type="checkbox"
        className="w-4 h-4 text-blue-600"
        checked={checked}
        onClick={handleToggle}
      />
    </td>
  );
};

export default CheckBox;
