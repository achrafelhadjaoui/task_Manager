import React, { useContext, useEffect, useState } from "react";
import { apiEndpoints } from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const { reloadFlag } = useContext(Context); 

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.getTasks.url, {
        method: apiEndpoints.getTasks.method,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setTasks(result.tasks || []);
        toast.success("Tasks loaded successfully");
      } else {
        toast.error(result.message || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Something went wrong while fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiEndpoints.deleteTask.url}/${id}`, {
        method: apiEndpoints.deleteTask.method,
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Task deleted successfully");
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } else {
        toast.error(result.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };

  // Handle edit
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };  

  // Handle view 
  const handleView = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
  };
  

  useEffect(() => {
    fetchTasks();
  }, [reloadFlag]);

  return (
    <div className=" mt-32 mx-4 bg-white  rounded-lg overflow-hidden relative shadow-md p-6">
      {/* Status bar on the left */}
      <div className="absolute top-0 left-0 h-full w-2 bg-indigo-600 rounded-l-lg"></div>

      {/* Board title */}
      <h1 className="text-lg font-semibold text-gray-800 text-center mb-6">
        Task Board
      </h1>

      {/* Loader */}
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 hover:bg-slate-100 rounded-lg p-4 mb-4 shadow-sm"
          >
            <h2 className="font-semibold text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-600">{task.description}</p>

            {/* Status */}
            <div className="mt-3 flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`status-${task.id}`}
                  checked={task.status === "PENDING"}
                  readOnly
                  className="w-5 h-5 accent-indigo-600 rounded-md appearance-none border-2 border-gray-300 checked:bg-indigo-600 checked:border-indigo-600"
                />
                <span className="text-gray-700">Pending</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`status-${task.id}`}
                  checked={task.status === "IN_PROGRESS"}
                  readOnly
                  className="w-5 h-5 accent-yellow-400 rounded-md appearance-none border-2 border-gray-300 checked:bg-yellow-400 checked:border-yellow-400"
                />
                <span className="text-gray-700">In Progress</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`status-${task.id}`}
                  checked={task.status === "COMPLETED"}
                  readOnly
                  className="w-5 h-5 accent-green-500 rounded-md appearance-none border-2 border-gray-300 checked:bg-green-500 checked:border-green-500"
                />
                <span className="text-gray-700">Completed</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end text-sm font-medium cursor-pointer mt-4 gap-2">
              <span
                className="text-indigo-600 hover:underline"
                onClick={() => handleView(task)}
              >
                View
              </span>
              <span>|</span>
              <span
                className="text-yellow-600 hover:underline"
                onClick={() => handleEdit(task)}
              >
                Edit
              </span>
              <span>|</span>
              <span
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </span>
            </div>
          </div>
        ))
      )}

      {showEditModal && selectedTask && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTask(null);
          }}
        />
      )}

      {showViewModal && selectedTask && (
        <ViewTaskModal
          task={selectedTask}
          onClose={() => {
            setShowViewModal(false);
            setSelectedTask(null);
          }}
        />
      )}

    </div>
  );
};

export default Board;



