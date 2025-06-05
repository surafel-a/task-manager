import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";

const initialTasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const addTask = () => {
    if (!newTask.trim()) {
      setMessage("Task title cannot be empty!");
      return;
    }
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
    setMessage("Task added successfully!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setMessage("Task deleted!");
  };

  const toggleTask = (id) => {
    const toggledTask = tasks.find((task) => task.id === id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    if (toggledTask) {
      setMessage(
        `${toggledTask.title} marked as ${
          toggledTask.completed ? "pending" : "completed"
        }!`
      );
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) =>
          filter === "completed" ? task.completed : !task.completed
        );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          📝 Task Manager
        </h1>

        {message && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {["all", "completed", "pending"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                filter === type
                  ? "bg-gray-800 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;