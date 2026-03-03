import React from "react";

const Toast = ({ message, type, onClose }) => {
  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default Toast;