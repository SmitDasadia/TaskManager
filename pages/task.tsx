import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

interface TaskData {
  id: string;
  date: string;
  title: string;
  desc: string;
  status: string;
}

const Task = () => {
  const router = useRouter();
  const { id } = router.query;
  const [taskDetails, setTaskDetails] = useState<TaskData>({
    id: "",
    date: "",
    title: "",
    desc: "",
    status: "",
  });

  useEffect(() => {
    const storedTasks: TaskData[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const foundTask: TaskData | undefined = storedTasks.find(
      (task) => task.id === id
    );
    if (foundTask) {
      setTaskDetails(foundTask);
    }
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedTasks: TaskData[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const updatedTasks: TaskData[] = storedTasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...taskDetails };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    router.push("/"); // Redirect to home page
  };

  const handleDelete = () => {
    const storedTasks: TaskData[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const updatedTasks: TaskData[] = storedTasks.filter(
      (task) => task.id !== id
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    router.push("/"); // Redirect to home page after deletion
  };

  return (
    <section>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">
              ID: (Not Changeable)
            </label>
            <input
              type="text"
              name="id"
              value={taskDetails.id}
              onChange={handleInputChange}
              className="bg-gray-100 rounded p-2"
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Date:</label>
            <input
              className="bg-gray-100 rounded p-2"
              type="date"
              name="date"
              value={taskDetails.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Title:</label>
            <input
              className="bg-gray-100 rounded p-2"
              name="title"
              type="text"
              value={taskDetails.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Desc:</label>
            <textarea
              className="bg-gray-100 rounded p-2"
              name="desc"
              value={taskDetails.desc}
              onChange={handleInputChange}
            />
          </div>

          {/* ... other form fields */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Status:</label>
            <select
              name="status"
              value={taskDetails.status}
              onChange={handleInputChange}
              className="bg-gray-100 rounded p-2"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Process">In Process</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded py-2 px-4 hover:bg-blue-700"
          >
            Update Task
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white font-semibold rounded py-2 px-4 hover:bg-red-700 mt-4 ml-4"
          >
            Delete Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default Task;
