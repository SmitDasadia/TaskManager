import React, { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import TaskCard from "./TaskCard";

interface TaskData {
  id: string;
  date: string;
  title: string;
  desc: string;
  status: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [formData, setFormData] = useState<TaskData>({
    id: "",
    date: "",
    title: "",
    desc: "",
    status: "Not Started",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    setTasks([...tasks, formData]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, formData]));
    setFormData({
      id: "",
      date: "",
      title: "",
      desc: "",
      status: "Not Started",
    });
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const getTotalTasksByStatus = (status: string) => {
    const totalTasks = tasks.filter((task) => task.status === status).length;
    return totalTasks;
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");

    // Update task status based on taskId
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-wrap">
      <div
        className="w-full sm:w-1/3  p-4"
        onDrop={(e) => handleDrop(e, "Not Started")}
        onDragOver={allowDrop}
      >
        <div className="text-md pb-3 flex items-center">
          <span className="font-semibold bg-red-200 mr-2 px-2 rounded-sm">
            Not Started
          </span>
          <span className="font-normal">
            {getTotalTasksByStatus("Not Started")}
          </span>
          <div className="ml-auto">
            <button
              className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 hover:rounded font-bold mr-2 px-1 py-1"
              onClick={openDialog}
            >
              <CgMathPlus className="" />
            </button>
          </div>
        </div>

        {tasks
          .filter((task) => task.status === "Not Started")
          .map((task, index) => (
            <TaskCard key={index} {...task} handleDelete={handleDelete} />
          ))}

        <div className="pt-3">
          <button
            className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 hover:rounded-md font-bold py-2 px-4 rounded w-full"
            onClick={openDialog}
          >
            <CgMathPlus className="" />
          </button>
        </div>
      </div>

      <div
        className="w-full sm:w-1/3  p-4"
        onDrop={(e) => handleDrop(e, "In Process")}
        onDragOver={allowDrop}
      >
        <div className="text-md pb-3 flex items-center">
          <span className="font-semibold bg-yellow-200 mr-2 px-2 rounded-sm">
            In Process
          </span>
          <span className="font-normal">
            {getTotalTasksByStatus("In Process")}
          </span>
          <div className="ml-auto">
            <button
              className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 hover:rounded font-bold mr-2 px-1 py-1"
              onClick={openDialog}
            >
              <CgMathPlus className="" />
            </button>
          </div>
        </div>
        {tasks
          .filter((task) => task.status === "In Process")
          .map((task, index) => (
            <TaskCard key={index} {...task} handleDelete={handleDelete} />
          ))}
        <div className="pt-3">
          <button
            className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 hover:rounded-md font-bold py-2 px-4 rounded w-full"
            onClick={openDialog}
          >
            <CgMathPlus className="" />
          </button>
        </div>
      </div>

      <div
        className="w-full sm:w-1/3  p-4"
        onDrop={(e) => handleDrop(e, "Completed")}
        onDragOver={allowDrop}
      >
        <div className="text-md pb-8 flex items-center">
          <span className="font-semibold bg-green-200 mr-2 px-2 rounded-sm">
            Completed
          </span>
          <span className="font-normal">
            {getTotalTasksByStatus("Completed")}
          </span>
          <div className="ml-auto">
            <button
              className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 hover:rounded font-bold mr-2 px-1 py-1"
              onClick={openDialog}
            >
              <CgMathPlus className="" />
            </button>
          </div>
        </div>
        {tasks
          .filter((task) => task.status === "Completed")
          .map((task, index) => (
            <TaskCard key={index} {...task} handleDelete={handleDelete} />
          ))}
        <div className="pt-3">
          <button
            className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 hover:rounded-md font-bold py-2 px-4 rounded w-full"
            onClick={openDialog}
          >
            <CgMathPlus className="" />
          </button>
        </div>
      </div>

      <div>
        {isDialogOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="p-6 rounded ">
              <form
                className="bg-white p-6 rounded shadow-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  addTask();
                  closeDialog();
                }}
              >
                <label className="block mb-2 text-sm font-bold">ID:</label>
                <input
                  className="w-full border p-2 mb-4"
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                />
                <label className="block mb-2 text-sm font-bold">Date:</label>
                <input
                  className="w-full border p-2 mb-4"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                <label className="block mb-2 text-sm font-bold">Title:</label>
                <input
                  className="w-full border p-2 mb-4"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <label className="block mb-2 text-sm font-bold">
                  Description:
                </label>
                <textarea
                  className="w-full border p-2 mb-4"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                ></textarea>
                <label className="block mb-2 text-sm font-bold">Status:</label>
                <select
                  className="w-full border p-2 mb-4"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Process">In Process</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Add Task
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
