import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
                type="text"
                placeholder="Thêm công việc mới..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 border rounded p-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Thêm
            </button>
        </form>
    );
}
