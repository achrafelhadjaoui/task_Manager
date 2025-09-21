import React, { use, useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { apiEndpoints } from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const AddTaskModal = ({ onClose }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const { triggerReload } = useContext(Context);

  // Handle input change
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apiEndpoints.createTask.url, {
        method: apiEndpoints.createTask.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data), // ✅ send directly
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Task created successfully!");
        triggerReload(); // notify Board to re-fetch
        onClose(); // close modal after success  
      } else {
        toast.error(result.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            rows="3"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;


