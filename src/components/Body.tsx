import { ChangeEvent, useCallback, useEffect, useState } from "react";
import TodoForm from "./TodoForm ";
import { useTodos } from "../Context/TodoContext";
import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

interface FormType {
  id: string;
  Level: string;
  Status: string;
  Descr: string;
  Title: string;
}

interface Task {
  id: string;
  Level: string;
  Status: string;
  Descr: string;
  Title: string;
}

const Body = () => {
  const getTaskLen = (len: number) => len;
  const { isActForm, setActForm, isGetID } = useTodos();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const deleteTask = async (id: string): Promise<void> => {
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

      // setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete the task:", err);
    }
  };
  const [task, setTask] = useState<Task>({
    id: "",
    Level: "",
    Status: "",
    Descr: "",
    Title: "",
  });

  const viewData = useCallback(async () => {
    if (isGetID) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${isGetID}`, {
          method: "GET",
        });
        const data: Task = await response.json();
        setTask(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    }
  }, [isGetID]);

  useEffect(() => {
    if (isGetID) {
      viewData();
    }
  }, [isGetID, viewData]);

  const isInput = isActForm === "input";
  const isView = isActForm === "view";
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [formValue, setFormValue] = useState<FormType>({
    id: "",
    Level: "Low",
    Status: "To Do",
    Descr: "",
    Title: "",
  });

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const addTask = async (): Promise<void> => {
    if (
      formValue.Level.trim() &&
      formValue.Descr.trim() &&
      formValue.Status.trim() &&
      formValue.Title.trim() !== ""
    ) {
      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now().toString(),
            Title: formValue.Title,
            Level: formValue.Level,
            Status: formValue.Status,
            Descr: formValue.Descr,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const newTask: Task = {
          id: Date.now().toString(), // Generate a unique ID using Date.now()
          Level: formValue.Level,
          Status: formValue.Status,
          Descr: formValue.Descr,
          Title: formValue.Title,
        };

        // setTasks((prevTasks) => [...prevTasks, newTask]);
        setFormValue({
          id: "",
          Title: "",
          Level: "",
          Status: "",
          Descr: "",
        });
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  const checkEdit = (): void => {
    if (task.id) {
      setActForm("input");
      setFormValue({
        id: task.id,
        Title: task.Title,
        Status: task.Status,
        Level: task.Level,
        Descr: task.Descr,
      });
      setIsEdit(true);
    }
  };
  const getIDEdit = async (): Promise<void> => {
    if (
      formValue.Level.trim() &&
      formValue.Descr.trim() &&
      formValue.Status.trim() &&
      formValue.Title.trim() !== ""
    ) {
      try {
        const newTask: Task = {
          id: task.id,
          Title: formValue.Title,
          Level: formValue.Level,
          Status: formValue.Status,
          Descr: formValue.Descr,
        };
        await fetch(`http://localhost:3000/tasks/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newTask,
          }),
        });

        // setTasks((prevTasks) => [...prevTasks, newTask]);
        setFormValue({
          id: "",
          Title: "",
          Level: "",
          Status: "",
          Descr: "",
        });
      } catch (e) {
        console.error("Error updating task:", e);
      }
    }
  };

  return (
    <div className="w-full py-10 bg-yellow-100 h-3/4 roboto-black flex gap-20 items-center justify-center">
      <div className="left w-2/5 h-4/5 bg-red-300 p-5">
        {isInput && (
          <form className="overflow-y-auto h-full w-full">
            <label htmlFor="Levels">Levels : </label>
            <select
              id="Levels"
              name="Level"
              onChange={handleSelect}
              value={formValue.Level}
              className="block w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <label htmlFor="Status">Status : </label>
            <select
              name="Status"
              id="Status"
              onChange={handleSelect}
              value={formValue.Status}
              className="block w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <h3>Title:</h3>
            <input
              placeholder="Title..."
              className="w-full p-2 border rounded mb-2"
              type="text"
              name="Title"
              onChange={handleInput}
              value={formValue.Title}
            />
            <h3>Description:</h3>
            <input
              placeholder="Description..."
              className="w-full p-2 border rounded mb-2"
              type="text"
              name="Descr"
              onChange={handleInput}
              value={formValue.Descr}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <div className="w-full max-w-lg mb-4">
              {isEdit ? (
                <>
                  <button
                    className="w-full p-2 bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    onClick={() => {
                      setIsEdit(false);
                      setActForm("view");
                      setFormValue({
                        id: "",
                        Level: "",
                        Status: "",
                        Descr: "",
                        Title: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full p-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    onClick={getIDEdit}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={addTask}
                  className="w-full p-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        )}
        {isGetID && isView && (
          <>
            <div className="flex flex-col w-full h-3/4 overflow-y-auto gap-10">
              <h3 className="text-4xl">Task ID : {task.id}</h3>
              <h3 className="text-2xl">Title : {task.Title}</h3>
              <h3 className="text-2xl">Level : {task.Level}</h3>
              <h3 className="text-2xl">Status : {task.Status}</h3>
              <h3 className="text-2xl">Description : {task.Descr}</h3>
            </div>
            <div className="w-full h-1/4">
              <button
                className="p-2 bg-blue-600 text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  checkEdit();
                  // handleRemove();
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   handleRemove();
                // }}
                className="p-2 bg-red-600 text-white rounded ml-10"
              >
                Remove
              </button>
              <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
              >
                <DialogHeader>
                  Are you sure you want to remove, {task.Title}?
                </DialogHeader>

                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen();
                    }}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={() => {
                      handleOpen();
                      deleteTask(task.id);
                      window.location.reload();
                    }}
                  >
                    <span>Delete</span>
                  </Button>
                </DialogFooter>
              </Dialog>
              {/*  */}
            </div>
          </>
        )}
      </div>
      <div className="right w-2/5 h-4/5 bg-gray-100 overflow-y-auto p-5">
        <TodoForm getTaskLen={getTaskLen} />
      </div>
    </div>
  );
};

export default Body;
