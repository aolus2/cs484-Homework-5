import { useState, useCallback, memo } from "react";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Generate sample tasks
const generateTasks = (count: number): Task[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: index,
        title: `Task ${index + 1}`,
        completed: false,
    }));
};

// Child component for individual tasks
const TaskItem = ({
    task,
    onToggle,
    onDelete,
}: {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}) => {
    console.log(`Rendering TaskItem ${task.id}`); // Debug render

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px",
                borderBottom: "1px solid #eee",
            }}
        >
            <div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <span
                    style={{
                        marginLeft: "8px",
                        textDecoration: task.completed
                            ? "line-through"
                            : "none",
                    }}
                >
                    {task.title}
                </span>
            </div>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export const MemoizedTaskItem = memo(TaskItem);

export default function Problem3() {
    const [tasks, setTasks] = useState(generateTasks(1000));
    const [newTask, setNewTask] = useState("");

    const handleToggle = (id: number) => {
        setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: tasks.length, title: newTask, completed: false },
    ]);
    setNewTask("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Problem 3: Optimizing Event Handlers with useCallback</h1>
      <p>
        Use useCallback to memoize event handlers and prevent unnecessary
        re-renders.
      </p>
      <div style={{ marginTop: "20px" }}>
            <h3>Instructions:</h3>
            <ol>
                <li>Observe console logs to see TaskItem re-renders.</li>
                <li>Implement useCallback for handleToggle and handleDelete.</li>
            </ol>
        </div>
        <div style={{ marginBottom: "20px" }}>
            <input
                type="text"
                    placeholder="New task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button onClick={handleAddTask}>Add Task</button>
        </div>

        <div
            style={{
                maxHeight: "500px",
                overflow: "auto",
                border: "1px solid #ccc",
            }}
        >
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    </div>
  );
}
