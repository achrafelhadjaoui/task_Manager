import React from "react";
import { IoClose } from "react-icons/io5";

const ViewTaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        {/* Task details */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {task.title}
        </h2>
        <p className="text-gray-600 mb-4">{task.description}</p>

        {/* Status */}
        <div className="mt-3">
          <span className="font-medium text-gray-700">Status: </span>
          <span
            className={`px-3 py-1 rounded-lg text-sm ${
              task.status === "PENDING"
                ? "bg-indigo-100 text-indigo-700"
                : task.status === "IN_PROGRESS"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
