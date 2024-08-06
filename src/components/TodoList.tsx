import React from "react";
import { useTodos } from "../Context/TodoContext";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
interface Tasks {
  id: string;
  Level: string;
  Status: string;
  Descr: string;
  Title: string;
  getID: (id: string) => Promise<void>;
}

const TodoList: React.FC<Tasks> = ({
  id,
  // Level,
  Status,
  Title,
  getID,
}) => {
  const { setActForm, setGetID } = useTodos();

  const handleRemove = () => {
    getID(id);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <article
      onClick={() => {
        setGetID(id);
        setActForm("view");
      }}
      className={`flex items-center justify-between w-full max-w-lg bg-white shadow-md p-4 rounded-lg mb-4 hover:scale-105 list-article ${
        Status == "To Do"
          ? "list-article-red"
          : Status == "Doing"
          ? "list-article-yellow"
          : "list-article-green"
      }`}
    >
      <div className="flex items-center w-3/4">
        <h3 className="text-black-500 text-lg">{Title}</h3>
      </div>

      <div className="flex items-center  w-1/4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          // onClick={(e) => {
          //   e.stopPropagation();
          //   handleRemove();
          // }}
          className="p-2 bg-red-600 text-white rounded"
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
          <DialogHeader>Are you sure you want to remove, {Title}?</DialogHeader>
          {/* <DialogBody>
            The key to more success is to have a lot of pillows. Put it this
            way, it took me twenty five years to get these plants, twenty five
            years of blood sweat and tears, and I&apos;m never giving up,
            I&apos;m just getting started. I&apos;m up to something. Fan luv.
          </DialogBody> */}
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
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
                handleRemove();
              }}
            >
              <span>Delete</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </article>
  );
};

export default TodoList;
