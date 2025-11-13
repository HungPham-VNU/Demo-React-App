import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete, filter, setFilter }) {
    const filteredTasks =
        filter === "all"
            ? tasks
            : filter === "done"
                ? tasks.filter((t) => t.done)
                : tasks.filter((t) => !t.done);

    return (
        <div className="mt-6">
            <div className="flex justify-between mb-3">
                <h2 className="font-semibold">Danh sách công việc</h2>
                <div className="flex gap-2">
                    {["all", "done", "pending"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded ${filter === f ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
            {filteredTasks.length === 0 && <p>Không có công việc nào.</p>}
        </div>
    );
}
