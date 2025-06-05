const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <li
      className={`flex justify-between items-center px-5 py-4 rounded-xl border shadow-sm transition-all duration-300 group ${
        task.completed
          ? "bg-green-50 border-green-300"
          : "bg-white hover:shadow-md"
      }`}
    >
      <div
        className={`flex items-center gap-3 cursor-pointer transition ${
          task.completed ? "text-gray-500 line-through" : "text-gray-800"
        }`}
        onClick={() => onToggle(task.id)}
      >
        <div
          className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition ${
            task.completed
              ? "bg-green-400 border-green-500"
              : "border-gray-400"
          }`}
        >
          {task.completed && (
            <span className="text-white text-xs font-bold">✔</span>
          )}
        </div>
        <span className="text-base">{task.title}</span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        title="Delete task"
        className="text-red-500 hover:text-red-700 text-lg transition transform hover:scale-110"
      >
        ❌
      </button>
    </li>
  );
};

export default TaskItem;