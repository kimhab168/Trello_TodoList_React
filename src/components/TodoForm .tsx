import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import "./TodoList.css";

interface Task {
  id: string;
  Level: string;
  Status: string;
  Descr: string;
  Title: string;
}
interface TodoFormProps {
  getTaskLen: (len: number) => number;
}

const TodoForm: React.FC<TodoFormProps> = ({ getTaskLen }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [Editing, setEditing] = useState<boolean>(false);
  // const buttonAdd = useRef<HTMLButtonElement | null>(null);
  // const inputFocus = useRef<HTMLInputElement | null>(null);

  // Fetch data and set tasks
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  getTaskLen(tasks.length);
  const getIDTask = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete the task:", err);
    }
  };

  // const getIDEdit = (id: string, newText: string, isCheck: boolean): void => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === id ? { ...task, text: newText } : task
  //     )
  //   );
  //   fetch("http://localhost:3000/tasks/" + id, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ text: newText, isCompleted: isCheck }), //
  //   });
  // };

  // document.addEventListener("keydown", (e) => {
  //   if (e.key == "/") {
  //     inputFocus.current?.focus();
  //   }
  // });
  return (
    <div className="flex flex-col items-center p-2" id="onInput">
      <div className="w-full flex flex-col items-center">
        {tasks.length > 0
          ? tasks.map((task) => (
              <TodoList {...task} key={task.id} getID={getIDTask} />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default TodoForm;
