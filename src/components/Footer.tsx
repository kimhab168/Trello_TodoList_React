import { useEffect, useState } from "react";
interface Task {
  id: string;
  Level: string;
  Status: string;
  Descr: string;
  Title: string;
}

const Footer = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
  const taskToDo = tasks.filter((task) => task.Status == "To Do");
  const taskDoing = tasks.filter((task) => task.Status == "Doing");
  const taskDone = tasks.filter((task) => task.Status == "Done");
  return (
    <div className="w-full flex justify-evenly items-center roboto-black">
      <h3 className="title text-1xl">Total:</h3>
      <h3>{tasks.length}</h3>
      <h3 className="title text-1xl">To Do:</h3>
      <h3>{taskToDo.length}</h3>
      <h3 className="title text-1xl">Doing:</h3>
      <h3>{taskDoing.length}</h3>
      <h3 className="title text-1xl">Complete:</h3>
      <h3>{taskDone.length}</h3>
    </div>
  );
};

export default Footer;
