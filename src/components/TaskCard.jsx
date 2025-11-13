export default function TaskCard({ task, onToggle, onDelete }) {
    return (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow rounded p-3 mb-2">
            <div>
                <p className={`font-medium ${task.done ? "line-through text-gray-400" : ""}`}>
                    {task.title}
                </p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onToggle(task.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                >
                    ✓
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
