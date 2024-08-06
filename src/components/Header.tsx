import { ChangeEvent, useState } from "react";
import { FcFilledFilter, FcSearch } from "react-icons/fc";
import { MdAddToPhotos, MdCancel } from "react-icons/md";
import { Input, Button } from "@material-tailwind/react";
import { useTodos } from "../Context/TodoContext";
// type isActionForm = "input" | "view" | "close";
// interface FormType {
//   isActForm: isActionForm;
//   setActForm: (value: isActionForm) => void;
// }
const Header = () => {
  const { isActForm, setActForm, setGetID } = useTodos();
  const isInput = isActForm === "input";
  // const isView = isActForm === "view";
  // const isClose = isActForm === "close";

  const [search, setSearch] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <>
      <div className="w-full flex items-center justify-around py-5 bg-gray-200 m-0 h-20">
        <div className="relative flex w-full max-w-[20rem] items-center">
          <Input
            type="email"
            label="Search..."
            value={search}
            onChange={onChange}
            className="pr-20 border border-sky-500"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={search ? "gray" : "blue-gray"}
            disabled={!search}
            className="!absolute right-0 top-0 rounded"
          >
            <button>
              <FcSearch size={24} />
            </button>
          </Button>
        </div>

        <button>
          <FcFilledFilter size={35} />
        </button>
        {isInput ? (
          <button
            onClick={() => {
              setActForm("close");
              setGetID("");
            }}
          >
            <MdCancel size={35} />
          </button>
        ) : (
          <button
            onClick={() => {
              setActForm("input");
              setGetID("");
            }}
          >
            <MdAddToPhotos size={35} />
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
