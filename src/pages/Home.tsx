import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [filter, setFilter] = useState("all");

    const addTask = (title) => {
        const newTask = { id: uuidv4(), title, done: false };
        setTasks([...tasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <TaskForm onAdd={addTask} />
            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                filter={filter}
                setFilter={setFilter}
            />
        </div>
    );
}
